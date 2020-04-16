import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { UbsService } from '../../services/ubs.service';
import * as moment from 'moment';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { PermissaoLocalizacaoPage } from '../permissao-localizacao/permissao-localizacao.page';
import { MapUtil } from '../../services/map-util';
import * as L from 'leaflet';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: L.Map;
  featureGroup: L.FeatureGroup;
  latitude: any;
  longitude: any;
  pontos: any = [];
  markerSelected: any;
  cardMapa = false;
  language: string;
  verHorarios = false;
  horaAtualizada: any;
  diaAtualizado: any;
  options: LaunchNavigatorOptions = {
    appSelection: {
      dialogHeaderText: 'Selecione um aplicativo', cancelButtonText: 'Cancelar', rememberChoice: {
        enabled: false
      }
    }
  };
  diasSemana = [{ numero: 1, dia: 'Domingo' }, { numero: 2, dia: 'Segunda-feira' }, { numero: 3, dia: 'Terça-feira' }, {
    numero: 4,
    dia: 'Quarta-feira'
  }, { numero: 5, dia: 'Quinta-feira' }, { numero: 6, dia: 'Sexta-feira' }, { numero: 7, dia: 'Sábado' }];

  estadoVazio = false;

  constructor(
    private platform: Platform,
    private util: UtilService,
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private storage: StorageService,
    private translate: TranslateService,
    private ubsService: UbsService,
    private navCtrl: NavController,
    private launchNavigator: LaunchNavigator,
    private analyticsService: AnalyticsService
  ) {}

  async ngOnInit() {
    // this.analyticsService.track('Unidades de Saúde');
    this.estadoVazio = false;
    this.getHoraAtualizada();
    this.language = this.storage.get( 'LANGUAGE' ) ? this.storage.get( 'LANGUAGE' ) : 'pt-BR';
    this.translate.setDefaultLang( this.language );
  }

  async onLoadMap(map) {
    this.map = map;
    this.featureGroup = new L.FeatureGroup();
    this.map.addLayer(this.featureGroup);
    await this.carregarLocalizacao();
    if (this.latitude && this.longitude && !this.estadoVazio) {
      await this.carregarDados();
      this.map.panTo([this.latitude, this.longitude]);
      await this.util.endLoading();
    }
  }

  async carregarDados() {
    this.featureGroup.clearLayers();
    this.pontos = await this.buscarUbs( this.latitude, this.longitude );
    this.criarMarkers();
    const marker: any = L.marker([this.latitude, this.longitude], {icon: MapUtil.iconMyPosition});
    this.featureGroup.addLayer(marker);
  }

  async carregarLocalizacao() {
    return new Promise(async (resolve) => {
      const permissaoGps = this.storage.get('PERMISSAO_GPS');
      if (!permissaoGps) {
        const modal = await this.modalCtrl.create({
          component: PermissaoLocalizacaoPage,
          cssClass: 'modal-permissao-localizacao'
        });
        await modal.present();
        await this.storage.set('PERMISSAO_GPS', true);
        await modal.onDidDismiss();
      }
      await this.util.onLoading('');
      await this.geolocation.getCurrentPosition({ timeout: 10000 }).then((geo) => {
        this.latitude = geo.coords.latitude;
        this.longitude = geo.coords.longitude;
      }).catch(async (e) => {
        await this.util.endLoading();
        if (e.code && (e.code === 1 || e.code === 2 || e.code === 3)) {
          this.estadoVazio = true;
        } else {
          await this.util.toast('Ocorreu um erro inesperado!');
        }
      });
      resolve();
    });
  }

  async buscarUbs( latitude, longitude ) {
    const ubs = await this.ubsService.get().toPromise();
    let ubsProximas: Array<any> = ubs.filter( ( u ) => {
      u.distancia = Number( this.util.getDistancia( latitude, longitude, u.latitude, u.longitude ) );
      return u.distancia <= 1000 && u.latitude && u.longitude;
    } );
    ubsProximas.sort( this.util.orderByDistancia );
    ubsProximas = ubsProximas.slice( 0, 99 );
    ubsProximas.forEach( ( u ) => {
      const isHospital = u.codigotipo === '05' || u.codigotipo === '07' || u.codigotipo === '20'
        || u.codigotipo === '21' || u.codigotipo === '73';
      u.status = (this.diaAtualizado >= (isHospital ? 1 : 2) && this.diaAtualizado <= (isHospital ? 7 : 6))
      && this.horaAtualizada >= u.hinicioat && this.horaAtualizada <= u.hfimat ? 'Aberto' : 'Fechado';
      u.disponibilidade = [];
      if ( u.hdsinicio && u.hdsfim ) {
        for ( let i = (isHospital ? 1 : 2); i <= (isHospital ? 7 : 6); i++ ) {
          const dia = this.diasSemana.filter( ( d ) => {
            return d.numero === i;
          } )[ 0 ].dia;
          u.disponibilidade.push( { dia, horario: u.hinicioat + ' - ' + u.hfimat } );
        }
      }
    } );
    return ubsProximas;
  }

  async criarMarkers() {
    const self = this;

    this.pontos.forEach((ponto) => {
      const marker: any = L.marker([ponto.latitude, ponto.longitude],
        {icon: ponto.status === 'Aberto' ? MapUtil.iconPinOpen : MapUtil.iconPinClose});
      marker.on({
        click: () => {
          self.markerSelected = ponto;
          self.cardMapa = true;
        }
      });

      this.featureGroup.addLayer(marker);
    });
  }

  getHoraAtualizada() {
    this.horaAtualizada = moment().format( 'HH:mm' );
    // this.horaAtualizada = '14:00';
    this.diaAtualizado = Number( moment().locale( 'pt-br' ).format( 'd' ) ) + 1;
    console.log(this.horaAtualizada);
    setTimeout( () => {
      this.getHoraAtualizada();
    }, 2000000 );
  }

  voltarClicked() {
    this.navCtrl.back();
  }

  async habilitarLocalizacao() {
    this.estadoVazio = false;
    await this.ngOnInit();
  }

  navigate() {
    if (this.platform.is( 'cordova')) {
      this.launchNavigator.navigate( [this.markerSelected.latitude, this.markerSelected.longitude], this.options );
    } else {
      window.open('https://www.google.com.br/maps/dir/' + this.latitude
        + ',' + this.longitude + '/' + this.markerSelected.latitude + ','
        + this.markerSelected.longitude, '_blank');
    }
  }
}
