import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-caso-isolamento-cuidador',
  templateUrl: './caso-isolamento-cuidador.page.html',
  styleUrls: ['./caso-isolamento-cuidador.page.scss']
})
export class CasoIsolamentoCuidadorPage implements OnInit {

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
