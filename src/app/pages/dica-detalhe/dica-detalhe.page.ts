import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-dica-detalhe',
  templateUrl: './dica-detalhe.page.html',
  styleUrls: ['./dica-detalhe.page.scss'],
})
export class DicaDetalhePage implements OnInit {

  dica: any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.dica = this.navParams.get('dica');
  }

  voltarClicked() {
    this.modalCtrl.dismiss();
  }

}
