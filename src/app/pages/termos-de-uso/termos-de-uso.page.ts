import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { TermService } from 'src/app/services/term.service';

@Component({
  selector: 'app-termos-de-uso',
  templateUrl: './termos-de-uso.page.html',
  styleUrls: ['./termos-de-uso.page.scss']
})
export class TermosDeUsoPage implements OnInit {

  language: any;
  term = '';
  tituloPrimario: string;
  tituloSecundario: string;
  textoBotao: string;

  tituloPrimarioPtBr = 'Termos';
  tituloSecundarioPtBr = 'de uso';
  textoBotaoPtBr = 'ACEITAR TERMOS DE USO';

  tituloPrimarioEnUs = 'Terms';
  tituloSecundarioEnUs = 'of use';
  textoBotaoEnUs = 'ACCEPT TERMS OF USE';

  tituloPrimarioEs = 'Términos';
  tituloSecundarioEs = 'de uso';
  textoBotaoEs = 'ACEPTA TÉRMINOS DE USO';

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private termService: TermService
  ) {}

  async ngOnInit() {
    await this.storage.set('TERM', 1);
    this.language  = this.storage.get('LANGUAGE');
    this.tituloPrimario = this.language === 'pt-BR' ? this.tituloPrimarioPtBr : this.language === 'en-US'
      ? this.tituloPrimarioEnUs : this.language === 'es' ? this.tituloPrimarioEs : '';
    this.tituloSecundario = this.language === 'pt-BR' ? this.tituloSecundarioPtBr : this.language === 'en-US'
      ? this.tituloSecundarioEnUs : this.language === 'es' ? this.tituloSecundarioEs : '';
    this.textoBotao = this.language === 'pt-BR' ? this.textoBotaoPtBr : this.language === 'en-US'
      ? this.textoBotaoEnUs : this.language === 'es' ? this.textoBotaoEs : '';
    await this.loadTerm();
  }

  async loadTerm() {
    this.term = await this.termService.getTerm(this.language);
  }

  async confirmar() {
    await this.router.navigateByUrl('app/inicio');
  }
}
