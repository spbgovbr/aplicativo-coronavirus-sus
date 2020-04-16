import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-caso-isolamento-infectado',
  templateUrl: './caso-isolamento-infectado.page.html',
  styleUrls: ['./caso-isolamento-infectado.page.scss']
})
export class CasoIsolamentoInfectadoPage implements OnInit {

  constructor(
    private router: Router,
    private translate: TranslateService,
    private storage: StorageService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.translate.setDefaultLang(this.storage.get('LANGUAGE'));
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }
}
