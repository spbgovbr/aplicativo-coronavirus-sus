import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitterService } from '../../services/event-emitter.service';
import { Router } from '@angular/router';
import { DicasService } from '../../services/dicas.service';
import { ModalController, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ObrigadoPorContribuirPage } from '../obrigado-por-contribuir/obrigado-por-contribuir.page';
import { IdiomaService } from '../../services/idioma.service';
import { DicaDetalhePage } from '../dica-detalhe/dica-detalhe.page';
import { PermissaoLocalizacaoPage } from '../permissao-localizacao/permissao-localizacao.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UtilService } from '../../services/util.service';
import { SaudeService } from '../../services/saude.service';
import { VERSION_ANDROID, VERSION_IOS, VERSION_PWA } from '../../../environments/environment';
import { StoriesService } from '../../services/stories.service';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage implements OnInit {

  language: string;
  changeHeader: boolean;
  dicas: any;
  stories: Array<any> = [];
  qtdStoriesNaoLidos = 0;
  version: any;

  storie = '';

  constructor(
    private storage: StorageService,
    private translate: TranslateService,
    private router: Router,
    private idiomaService: IdiomaService,
    private dicasService: DicasService,
    private storiesService: StoriesService,
    public modalController: ModalController,
    private statusBar: StatusBar,
    public plt: Platform,
    private geolocation: Geolocation,
    private util: UtilService,
    private saudeService: SaudeService,
  ) {
    EventEmitterService.get(EventEmitterService.EVENTOS.UPDATE_LANGUAGE_TAB).subscribe(async (value) => {
      await this.idiomaSelected(value);
    });
  }

  ionViewWillEnter() {
    if (this.plt.is('ios')) {
      this.statusBar.styleLightContent();
    }
  }

  ionViewWillLeave() {
    if (this.plt.is('ios')) {
      this.statusBar.styleDefault();
    }
  }

  async ngOnInit() {
    console.log('passou no init');
    setTimeout(async () => {
      this.version = (this.plt.is('cordova') && this.plt.is('android')) ? VERSION_ANDROID
        : (this.plt.is('cordova') && this.plt.is('ios')) ? VERSION_IOS
          : (!this.plt.is('cordova') && this.plt.is('pwa')) ? VERSION_PWA : VERSION_PWA;
      this.language = this.storage.get('LANGUAGE') ? this.storage.get('LANGUAGE') : 'pt-BR';
      this.translate.setDefaultLang( this.language );
      this.getDicas();
      this.getStories();
      setInterval(() => {
        this.checkStoriesNaoLidos();
      }, 2000);
    }, 2000);
  }

  async estouBemClicked() {
    const permissaoGps = await this.storage.get('PERMISSAO_GPS');
    if (!permissaoGps) {
      const modalPermissaoGps = await this.modalController.create({
        component: PermissaoLocalizacaoPage,
        cssClass: 'modal-permissao-localizacao'
      });
      await modalPermissaoGps.present();
      await this.storage.set('PERMISSAO_GPS', true);
      await modalPermissaoGps.onDidDismiss();
    }
    await this.util.onLoading('');
    this.geolocation.getCurrentPosition( { timeout: 10000 } ).then( async ( pos ) => {
      this.saudeService.salvar({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        estou_bem: true,
        sintomas: [],
      }).then(async (pontoSalvo) => {
        console.log(pontoSalvo);
        await this.util.endLoading();
        const modal = await this.modalController.create({
          component: ObrigadoPorContribuirPage,
        });
        await modal.present();
      });
    }).catch( async ( e ) => {
      await this.util.endLoading();
      const msgPtBr = 'Erro ao buscar a localização';
      const msgEnUs = 'Error fetching location';
      const msgEs = 'Error al buscar la ubicación';
      if (e.code && (e.code === 1 || e.code === 2 || e.code === 3)) {
        await this.util.toast(this.language === 'pt-BR' ? msgPtBr : this.language === 'en-US'
          ? msgEnUs : this.language === 'es' ? msgEs : '', 3000);
      } else {
        await this.util.toast('Ocorreu um erro inesperado!');
      }
    });
  }

  async getStories() {
    this.stories = [];
    const idioma = await this.idiomaService.getCDN(this.storage.get('LANGUAGE'));
    this.stories = await this.storiesService.getCDN(idioma.objectId);
    this.checkStoriesNaoLidos();
  }

  checkStoriesNaoLidos() {
    this.qtdStoriesNaoLidos = 0;
    const storiesVisualizados: Array<any> = this.storage.get('STORIES_VIEW') ? this.storage.get('STORIES_VIEW') : [];
    const storiesNaoLido: Array<any> = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.stories.length; i ++) {
      const hasInStorage = !!storiesVisualizados.filter((sv) => {
        return this.stories[i].objectId === sv;
      }).length;
      if (!hasInStorage) {
        this.stories[i].lido = false;
        storiesNaoLido.push(this.stories[i]);
        this.qtdStoriesNaoLidos = this.qtdStoriesNaoLidos + 1;
      } else {
        this.stories[i].lido = true;
      }
    }
    storiesNaoLido.sort(this.util.orderByCreatedDecrescente);
    if (storiesNaoLido[storiesNaoLido.length - 1]) {
      this.storie = storiesNaoLido[storiesNaoLido.length - 1].imagem.url;
    } else if (this.stories.length > 0) {
      this.storie = this.stories[this.stories.length - 1].imagem.url;
    }
  }

  async getDicas() {
    this.dicas = [];
    const idioma = await this.idiomaService.getCDN(this.storage.get('LANGUAGE'));
    this.dicas = await this.dicasService.getCDN(idioma.objectId);
    this.dicas = this.dicas.slice(0, 4);
  }

  onScroll(event: any) {
    if (event.detail.scrollTop < 160) {
      this.changeHeader = false;
      return;
    }
    if (event.detail.scrollTop > 160) {
      this.changeHeader = true;
    }
  }

  verMaisDicas() {
    this.router.navigateByUrl('/app/dicas');
  }

  verNoticias() {
    this.router.navigateByUrl('/app/noticias');
  }

  malClicked() {
    this.router.navigateByUrl('/teste');
  }

  async storiesClicked() {
    await this.router.navigateByUrl('/stories', {state: {stories: this.stories}});
  }

  async idiomaSelected(value) {
    this.language = value;
    this.translate.setDefaultLang( this.language );
    await this.storage.set( 'LANGUAGE', this.language );
    await this.getDicas();
    await this.getStories();
    EventEmitterService.get(EventEmitterService.EVENTOS.UPDATE_LANGUAGE).emit(value);
  }

  async openMapaPage() {
    await this.router.navigateByUrl('/mapa');
  }

  async openDetalheDica(dica) {
    const modal = await this.modalController.create({
      component: DicaDetalhePage,
      componentProps: {
        dica
      }
    });
    return await modal.present();
  }

}
