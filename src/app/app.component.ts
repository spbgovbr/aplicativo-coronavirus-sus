import { Component } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { StorageService } from './services/storage.service';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { SENDER_ID } from '../environments/environment';
import { NotificacoesService } from './services/notificacoes.service';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';
import * as moment from 'moment';
import { EventEmitterService } from './services/event-emitter.service';
import { PermissaoNotificacaoPage } from './pages/permissao-notificacao/permissao-notificacao.page';
import { IdiomaService } from './services/idioma.service';
import { OnboardsService } from './services/onboards.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private globalization: Globalization,
    private storage: StorageService,
    private push: Push,
    private alertCtrl: AlertController,
    private notificacoesService: NotificacoesService,
    private router: Router,
    private idiomaService: IdiomaService,
    private onboardsService: OnboardsService,
    private util: UtilService,
    private modalController: ModalController
  ) {

    this.initializeApp();
    EventEmitterService.get(EventEmitterService.EVENTOS.UPDATE_PERMISSION_PUSH).subscribe(async (permission) => {
      if (this.platform.is('cordova')) {
        this.initializePush(this.storage.get('LANGUAGE'), permission);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.storageService.mapAll();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      if (!this.storage.get('PERMISSAO_GPS')) {
        await this.storage.set('PERMISSAO_GPS', false);
        await this.storage.set('START_APP', moment());
      }
      let idioma = '';
      if (!this.platform.is('cordova')) {
        idioma = this.getIdioma(navigator.language);
      } else {
        const language = await this.globalization.getPreferredLanguage();
        idioma = this.getIdioma(language.value);
      }
      const currentLanguage = this.storage.get('LANGUAGE');
      if (!currentLanguage) {
        await this.storage.set('LANGUAGE', idioma);
        EventEmitterService.get(EventEmitterService.EVENTOS.UPDATE_LANGUAGE_TAB).emit(idioma);
      }
      // this.verifyTerm();
      if (this.platform.is('cordova')) {
        this.initializeAnalytics();
        if (!this.storage.get('PUSH_INIT')) {
          await this.initializePush(idioma, true);
        }
      }
      const showOnboard = this.storage.get('ONBOARDING') !== undefined ? this.storage.get('ONBOARDING') : true;
      if (showOnboard) {
        await this.router.navigateByUrl('onboarding');
      } else {
        if (!this.storage.get('TERM')) {
          await this.router.navigateByUrl( 'termo' );
        } else {
          await this.router.navigateByUrl('app/inicio');
        }
      }
    });
  }

  async initializePush(idioma, permission) {
    const options: PushOptions = {
      android: {
        senderID: SENDER_ID,
        sound: 'true'
      },
      ios: {
        alert: 'true',
        badge: 'true',
        sound: 'true'
      }
    };

    if (!this.storage.get('PUSH_INIT')) {
      const modal = await this.modalController.create({
        component: PermissaoNotificacaoPage,
        cssClass: 'modal-permissao-notificacao'
      });
      await modal.present();
    }
    const pushObject: PushObject = this.push.init(options);
    if (permission) {
      await this.push.hasPermission();

      pushObject.on('registration').subscribe(async (data: any) => {
        console.log(data.registrationId);
        await this.notificacoesService.register(data.registrationId, idioma);
        await this.storage.set('PUSH_INIT', true);
      });

      pushObject.on('notification').subscribe(async (data: any) => {
        if (data.additionalData.foreground) {
          const msgPtBr = 'Novo alerta recebido. Confira!';
          const msgEnUs = 'New alert received. Check out!';
          const msgEs = 'Nueva alerta recibida. ¡Compruébalo!';
          await this.util.toast(idioma === 'pt-BR' ? msgPtBr : idioma === 'en-US' ? msgEnUs : idioma === 'es' ? msgEs : '', 3000);
        } else {
          await this.router.navigateByUrl('app/alertas');
        }
      });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    } else {
      await pushObject.unregister();
    }
  }

  initializeAnalytics() {
    // const script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-161681403-1';
    // document.getElementsByTagName('head')[0].append(script);
    //
    // const scriptGtag = document.createElement('script');
    // scriptGtag.innerHTML = 'window.dataLayer = window.dataLayer || []; ' +
    //     'function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date());';
    // document.getElementsByTagName('head')[0].append(scriptGtag);
    // return;
  }


  async verifyTerm() {
    if (!this.storage.get('TERM')) {
      await this.util.openTerm();
    }
  }
  getIdioma( language: string) {
    return language.indexOf('pt') >= 0 ? 'pt-BR' : language.indexOf('en') >= 0 ? 'en-US' : language.indexOf('es') >= 0 ? 'es' : 'pt-BR';
  }
}
