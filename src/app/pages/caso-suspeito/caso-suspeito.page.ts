import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { AtendimentoPreClinicoPage } from '../atendimento-pre-clinico/atendimento-pre-clinico.page';
import { AtendimentoPreClinicoService } from '../../services/atendimento-pre-clinico.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-caso-suspeito',
  templateUrl: './caso-suspeito.page.html',
  styleUrls: ['./caso-suspeito.page.scss']
})
export class CasoSuspeitoPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private platform: Platform,
    private translate: TranslateService,
    private storage: StorageService,
    private navParams: NavParams,
    private atendimentoPreClinicoService: AtendimentoPreClinicoService,
    private analyticsService: AnalyticsService
  ) {}

  async ngOnInit() {
    // this.analyticsService.track('Caso provável');
    this.translate.setDefaultLang(this.storage.get('LANGUAGE'));
  }

  async openAtendimentoPreClinico() {
    const modal = await this.modalCtrl.create({
        component: AtendimentoPreClinicoPage,
        cssClass: 'modal-atendimento-pre-clinico-telefone'
      });
    await modal.present();
    const atendimento = await modal.onDidDismiss();
    if (atendimento.data) {
      await this.atendimentoPreClinicoService.salvar(atendimento.data, false);
      await this.storage.set('ATENDIMENTO_PRE_CLINICO', false);
    }
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }

  encontre() {
    this.router.navigateByUrl('/mapa');
    this.voltarClicked();
  }

  verDicas() {
    this.router.navigateByUrl('/app/dicas');
    this.voltarClicked();
  }
}
