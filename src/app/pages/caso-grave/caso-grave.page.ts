import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { AtendimentoPreClinicoPage } from '../atendimento-pre-clinico/atendimento-pre-clinico.page';
import { AtendimentoPreClinicoService } from '../../services/atendimento-pre-clinico.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-caso-grave',
  templateUrl: './caso-grave.page.html',
  styleUrls: ['./caso-grave.page.scss']
})
export class CasoGravePage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private storage: StorageService,
    private platform: Platform,
    private atendimentoPreClinicoService: AtendimentoPreClinicoService,
    private analyticsService: AnalyticsService
  ) {}

  async ngOnInit() {
    // this.analyticsService.track('Caso Urgência');
    this.translate.setDefaultLang(this.storage.get('LANGUAGE'));
  }

  async openAtendimentoPreClinico() {
    await this.storage.set('ATENDIMENTO_PRE_CLINICO', true);
    setTimeout(async () => {
      const modal = await this.modalCtrl.create({
        component: AtendimentoPreClinicoPage,
        cssClass: 'modal-atendimento-pre-clinico',
        componentProps: {
          showPreClinico: true
        }
      });
      await modal.present();
      const atendimento = await modal.onDidDismiss();
      if (atendimento.data) {
        await this.atendimentoPreClinicoService.salvar(atendimento.data, true);
        await this.storage.set('ATENDIMENTO_PRE_CLINICO', false);
      }
    }, 5000);
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
