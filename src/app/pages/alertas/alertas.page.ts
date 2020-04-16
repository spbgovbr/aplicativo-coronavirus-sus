import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificacoesService } from '../../services/notificacoes.service';
import { AlertaDetalhePage } from '../alerta-detalhe/alerta-detalhe.page';
import { ModalController, Platform } from '@ionic/angular';
import { EventEmitterService } from '../../services/event-emitter.service';
import { UtilService } from '../../services/util.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
})
export class AlertasPage implements OnInit {

  estadoVazio = false;
  changeHeader = false;
  notificacao = true;
  language: any;
  alertas: any = [];
  alertasLidos: any = [];

  constructor(
    private storage: StorageService,
    private translate: TranslateService,
    private notificacoesService: NotificacoesService,
    private modalController: ModalController,
    private util: UtilService,
    private platform: Platform,
    private analyticsService: AnalyticsService
  ) { }

  async ngOnInit() {
    // this.analyticsService.track('Alertas');
  }

  async ionViewDidEnter() {
    this.estadoVazio = false;
    this.alertas = [];
    this.language = this.storage.get('LANGUAGE') ? this.storage.get('LANGUAGE') : 'pt-BR';
    this.alertasLidos = this.storage.get('ALERTAS_LIDOS') ? this.storage.get('ALERTAS_LIDOS') : [];
    this.translate.setDefaultLang( this.language );
    this.alertas = await this.notificacoesService.getCDN(this.language);
    this.alertas.forEach((a) => {
      a.lida = !!this.alertasLidos.filter((al) => {
        return al.objectId === a.objectId;
      }).length;
    });
    const orderAlertas = (a, b) => {
      if (a.createdAt < b.createdAt) {
        if (!a.lida && b.lida) {
          return -1;
        } else if (a.lida && !b.lida) {
          return 1;
        } else {
          return 1;
        }
      }
      if (a.createdAt > b.createdAt) {
        if (!a.lida && b.lida) {
          return 1;
        } else if (a.lida && !b.lida) {
          return -1;
        } else {
          return -1;
        }
      }
      return 0;
    };
    this.alertas.sort(orderAlertas);
    this.estadoVazio = this.alertas.length === 0;
  }

  async changePermissionPush() {
    const msgPtBr = 'Permissão de noticações ' + (!this.notificacao ? 'desativada.' : 'ativada.');
    const msgEnUs = 'Notification permission ' + (!this.notificacao ? 'disabled.' : 'activated.');
    const msgEs = 'Permiso de notificación ' + (!this.notificacao ? 'deshabilitado.' : 'activado.');
    const permission = this.notificacao ? 'acess' : 'denied';
    EventEmitterService.get(EventEmitterService.EVENTOS.UPDATE_PERMISSION_PUSH).emit(permission === 'acess'
      ? true : permission === 'denied' ? false : false);
    await this.util.toast(this.language === 'pt-BR' ? msgPtBr : this.language === 'en-US'
      ? msgEnUs : this.language === 'es' ? msgEs : '', 3000);
  }

  async openDetalhe(alerta) {
    const modal = await this.modalController.create({
      component: AlertaDetalhePage,
      componentProps: {
        alerta
      }
    });
    await modal.present();
    await modal.onDidDismiss();
    this.ionViewDidEnter();
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

}
