import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-obrigado-por-contribuir',
  templateUrl: './obrigado-por-contribuir.page.html',
  styleUrls: ['./obrigado-por-contribuir.page.scss']
})
export class ObrigadoPorContribuirPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private callNumber: CallNumber
  ) {}

  ngOnInit() {}

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

  async ligar(){
    this.callNumber.callNumber('136', true);
  }
}
