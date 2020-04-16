import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-alerta-detalhe',
  templateUrl: './alerta-detalhe.page.html',
  styleUrls: ['./alerta-detalhe.page.scss'],
})
export class AlertaDetalhePage implements OnInit {

  alerta: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private storage: StorageService
  ) { }

  async ngOnInit() {
    this.alerta = this.navParams.get('alerta');
    const alertasLidos: Array<any> = await this.storage.get('ALERTAS_LIDOS') ? this.storage.get('ALERTAS_LIDOS') : [];
    const hasInLidas = !!alertasLidos.filter((al) => {
      return al.objectId === this.alerta.objectId;
    }).length;
    if (!hasInLidas) {
      alertasLidos.push(this.alerta);
      await this.storage.set('ALERTAS_LIDOS', alertasLidos);
    }
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }

}
