import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-permissao-localizacao',
  templateUrl: './permissao-localizacao.page.html',
  styleUrls: ['./permissao-localizacao.page.scss']
})
export class PermissaoLocalizacaoPage implements OnInit {

  language: any;
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.language = this.storage.get( 'LANGUAGE' ) ? this.storage.get( 'LANGUAGE' ) : 'pt-BR';
    this.translate.setDefaultLang( this.language );
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }

  habilitarLocalizacao() {
    this.voltarClicked();
  }
}
