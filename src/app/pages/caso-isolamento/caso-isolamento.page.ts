import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { CasoIsolamentoInfectadoPage } from '../caso-isolamento-infectado/caso-isolamento-infectado.page';
import { CasoIsolamentoCuidadorPage } from '../caso-isolamento-cuidador/caso-isolamento-cuidador.page';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-caso-isolamento',
  templateUrl: './caso-isolamento.page.html',
  styleUrls: ['./caso-isolamento.page.scss']
})
export class CasoIsolamentoPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private platform: Platform,
    private analyticsService: AnalyticsService
  ) {}

  async ngOnInit() {
    // this.analyticsService.track('Caso Isolamento');
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }

  async card1() {
    const modal = await this.modalCtrl.create({
      component: CasoIsolamentoInfectadoPage
    });
    return await modal.present();
  }

  async card2() {
    const modal = await this.modalCtrl.create({
      component: CasoIsolamentoCuidadorPage
    });
    return await modal.present();
  }
}
