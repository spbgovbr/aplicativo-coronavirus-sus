import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-caso-improvavel',
  templateUrl: './caso-improvavel.page.html',
  styleUrls: ['./caso-improvavel.page.scss']
})
export class CasoImprovavelPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private storage: StorageService,
    private callNumber: CallNumber,
    private platform: Platform,
    private analyticsService: AnalyticsService
  ) {}

  async ngOnInit() {
    // this.analyticsService.track('Caso improvável');
    this.translate.setDefaultLang(this.storage.get('LANGUAGE'));
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }

  verDicas() {
    this.router.navigateByUrl('/app/dicas');
    this.voltarClicked();
  }

  verNoticias() {
    this.router.navigateByUrl('/app/noticias');
    this.voltarClicked();
  }

  async ligar() {
    this.callNumber.callNumber('136', true);
  }
}
