import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-permissao-notificacao',
  templateUrl: './permissao-notificacao.page.html',
  styleUrls: ['./permissao-notificacao.page.scss']
})
export class PermissaoNotificacaoPage implements OnInit {

  tituloPtBr = 'Permissão de Notificações';
  subtituloPtBr = 'Para receber notificações em seu dispositivo é necessário a permissão.';
  textoBotaoPtBr = 'Habilitar notificações';
  tituloEnUs = 'Permission of Notifications';
  subtituloEnUs = 'To receive notifications on your device, permission is required.';
  textoBotaoEnUs = 'Enable notifications';
  tituloEs = 'Permiso de Notificaciones';
  subtituloEs = 'Para recibir notificaciones en su dispositivo, se requiere permiso.';
  textoBotaoEs = 'Habilitar notificaciones';
  titulo: string;
  subtitulo: string;
  textoBotao: string;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private storage: StorageService
  ) {}

  ngOnInit() {
    const idioma = this.storage.get('LANGUAGE');
    console.log(idioma);
    this.titulo = idioma === 'pt-BR' ? this.tituloPtBr : idioma === 'en-US' ? this.tituloEnUs : idioma === 'es' ? this.tituloEs : '';
    this.subtitulo = idioma === 'pt-BR' ? this.subtituloPtBr : idioma === 'en-US'
      ? this.subtituloEnUs : idioma === 'es' ? this.subtituloEs : '';
    this.textoBotao = idioma === 'pt-BR' ? this.textoBotaoPtBr : idioma === 'en-US'
      ? this.textoBotaoEnUs : idioma === 'es' ? this.textoBotaoEs : '';
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }

  habilitarPermissao() {
    this.voltarClicked();
  }
}
