import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { DicasService } from '../../services/dicas.service';
import { IdiomaService } from '../../services/idioma.service';
import { DicaDetalhePage } from '../dica-detalhe/dica-detalhe.page';
import { ModalController, Platform } from '@ionic/angular';
import { TwitterService } from '../../services/twitter.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  estadoVazio = false;
  changeHeader = false;
  language: any;
  fakenews: any;
  noticias = [];
  page = null;

  constructor(
    private storage: StorageService,
    private translate: TranslateService,
    private twitterService: TwitterService,
    private idiomaService: IdiomaService,
    private dicasService: DicasService,
    private modalController: ModalController,
    private iab: InAppBrowser,
    private platform: Platform,
    private analyticsService: AnalyticsService
  ) { }

  async ngOnInit() {
    // this.analyticsService.track('Notícias');
    this.language = this.storage.get('LANGUAGE') ? this.storage.get('LANGUAGE') : 'pt-BR';
    this.translate.setDefaultLang( this.language );
    const idioma = await this.idiomaService.getCDN(this.language);
    const dicas: Array<any> = await this.dicasService.getCDN(idioma.objectId);
    this.fakenews = dicas.filter((d) => {
      return d.titulo === 'Fake News';
    })[0];
    this.loadTwitter();
  }

  async loadTwitter() {
    this.noticias = await this.twitterService.getTwittes(this.page);
  }

  async loadData(event) {

    setTimeout(async () => {
      const itemLast = this.noticias[this.noticias.length - 1].id;
      const list = await this.twitterService.getTwittes(itemLast);
      if (list.length) {
        list.forEach((item) => {
          this.noticias.push(item);
        });
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    }, 500);
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

  recarregar() {
    console.log('recarregar()');
  }

  async openTweet(url) {
    const target = '_blank';
    this.iab.create(url, target, 'location=yes,clearsessioncache=yes,clearcache=yes,toolbar=yes');
  }

  async openDetalheFakeNew() {
    const modal = await this.modalController.create({
      component: DicaDetalhePage,
      componentProps: {
        dica: this.fakenews
      }
    });
    return await modal.present();
  }

}
