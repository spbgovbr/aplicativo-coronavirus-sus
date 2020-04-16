import { Component } from '@angular/core';
import { PortalService } from '../../services/portal.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.page.html',
  styleUrls: ['./situacao.page.scss'],
})
export class SituacaoPage {

  changeHeader = false;
  idioma: any;
  pesquisarString = '';
  portalGeral: any;
  portalMapa: any;
  portalMapaFiltrado: any;
  filtrado: boolean;
  horaAtualizacao: any;
  dataAtualizacao: any;

  constructor(
      private portalService: PortalService,
      private translate: TranslateService,
      private storage: StorageService,
      private iab: InAppBrowser
  ) {}

  async ionViewDidEnter() {
    this.portalGeral = undefined;
    this.portalMapa = undefined;
    this.horaAtualizacao = undefined;
    this.dataAtualizacao = undefined;
    this.idioma = this.storage.get('LANGUAGE');
    moment.locale(this.idioma);
    this.translate.setDefaultLang(this.idioma);
    const pG = await this.portalService.getCDN('PortalGeral');
    this.portalMapa = await this.portalService.getCDN('PortalMapa');
    this.portalMapaFiltrado = this.portalMapa;
    this.portalGeral = pG[0];
    const arraySplitData = this.portalGeral.dt_atualizacao.split(' ');
    this.horaAtualizacao = arraySplitData[0];
    this.dataAtualizacao = moment(arraySplitData[1], 'DD/MM/YYYY').format('LL');
  }

  onScroll(event: any) {
    if (event.detail.scrollTop < 20) {
      this.changeHeader = false;
      return;
    }
    if (event.detail.scrollTop > 20) {
      this.changeHeader = true;
    }
  }

  acessoPainel() {
    const target = '_blank';
    this.iab.create('https://covid.saude.gov.br/', target, 'location=yes,clearsessioncache=yes,clearcache=yes,toolbar=yes');
  }

  pesquisar() {
    if (this.pesquisarString.length >= 1 && this.pesquisarString !== '') {
      this.filtrado = true;
      this.portalMapaFiltrado = this.portalMapa.filter((pM) => {
        return pM.nome.toLocaleLowerCase().indexOf(this.pesquisarString.toLocaleLowerCase()) >= 0;
      });
    } else {
      this.portalMapaFiltrado = this.portalMapa;
      this.filtrado = false;
    }
  }
}
