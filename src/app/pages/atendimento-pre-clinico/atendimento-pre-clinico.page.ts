import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-atendimento-pre-clinico',
  templateUrl: './atendimento-pre-clinico.page.html',
  styleUrls: ['./atendimento-pre-clinico.page.scss']
})
export class AtendimentoPreClinicoPage implements OnInit {

  language: any;
  passo = 1;
  save: boolean;
  element: any;
  nome = '';
  telefone = '';
  atendimento = {
    cpf: '',
    semCpf: false,
    tipoDocumento: '',
    documento: ''
  };
  showPreClinico: boolean;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private util: UtilService,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.showPreClinico = this.navParams.get('showPreClinico');
    this.language = this.storage.get('LANGUAGE') ? this.storage.get('LANGUAGE') : 'pt-BR';
    this.translate.setDefaultLang(this.language);
    this.element = document.querySelector(this.showPreClinico ? '.modal-atendimento-pre-clinico .modal-wrapper'
        : '.modal-atendimento-pre-clinico-telefone .modal-wrapper');
    console.log(this.element);
  }

  fecharClicked() {
    this.modalCtrl.dismiss((this.save && this.showPreClinico)
        ? this.atendimento : (this.save && !this.showPreClinico) ? {nome: this.nome, telefone: this.telefone} : undefined);
  }

  async voltarClicked() {
    await this.storage.set('ATENDIMENTO_PRE_CLINICO', false);
    await this.modalCtrl.dismiss();
  }

  simClicked() {
    this.passo = 2;
    this.renderer.setStyle(this.element, 'height', '440px');
  }

  async verificarTelefoneClicked() {
    if (this.telefone && this.telefone.length === 15) {
      this.save = true;
      this.passo = 2;
      this.renderer.setStyle(this.element, 'height', '370px');
    } else {
      this.save = false;
      const msgPtBr = 'Número de telefone inválido!';
      const msgEnUs = 'Invalid phone number!';
      const msgEs = 'Número de telefono invalido';
      await this.util.toast(this.language === 'pt-BR' ? msgPtBr : this.language === 'en-US'
        ? msgEnUs : this.language === 'es' ? msgEs : '', 3000);
    }
  }

  async verificarCPFClicked() {
    if (!this.atendimento.cpf || await this.util.validcpf(this.atendimento.cpf)) {
      this.save = true;
      this.passo = 4;
      this.renderer.setStyle(this.element, 'height', '420px');
    } else {
      this.save = false;
      const msgPtBr = 'CPF inválido!';
      const msgEnUs = 'Invalid CPF!';
      const msgEs = 'CPF no válido';
      await this.util.toast(this.language === 'pt-BR' ? msgPtBr : this.language === 'en-US'
        ? msgEnUs : this.language === 'es' ? msgEs : '', 3000);
    }
  }

  salvarDocumentoGenericoClicked() {
    this.passo = 4;
    this.renderer.setStyle(this.element, 'height', '420px');
  }

  naoPossuoCPFClicked() {
    this.save = true;
    this.atendimento.semCpf = true;
    this.atendimento.cpf = '';
    this.passo = 3;
    this.renderer.setStyle(this.element, 'height', '540px');
  }

  possuoCPFClicked() {
    this.save = false;
    this.atendimento.semCpf = false;
    this.atendimento.tipoDocumento = '';
    this.atendimento.documento = '';
    this.passo = 2;
    this.renderer.setStyle(this.element, 'height', '440px');
  }
}
