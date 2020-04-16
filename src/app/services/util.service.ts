import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController, ModalController } from '@ionic/angular';
import { TermosDeUsoPage } from '../pages/termos-de-uso/termos-de-uso.page';

declare var navigator: any;
declare var Connection: any;

@Injectable()
export class UtilService {

  private loading: any;
  public cordova = false;
  public widthPlatform: any;
  public heightPlatform: any;
  private maxWidth = 640;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalController: ModalController
  ) {
    this.cordova = platform.is( 'cordova' );
    this.platform.ready().then(() => {
      this.widthPlatform = platform.width() <= this.maxWidth ? platform.width() : this.maxWidth;
      this.heightPlatform = platform.height();
    });
  }

  isOnline(): boolean {
    if (this.cordova && navigator.connection) {
      return navigator.connection.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline() {
    if (this.cordova && navigator.connection) {
      const networkState = navigator.connection.type;
      return networkState === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }

  async onLoading(message: string = '') {
    this.loading = await this.loadingCtrl.create({
      message
    });
    return await this.loading.present();
  }

  async endLoading() {
    await this.loading.dismiss().catch((error) => {
      this.loading.dismissAll();
    });
  }

  async alert(title, message, buttons) {
    const alert = await this.alertCtrl.create( {
      message,
      buttons
    });
    await alert.present();
  }

  async toast(message: string, duration = 6000) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration,
      color: 'dark'
    });
    await toast.present();
  }

  async toastError(message: string, duration = 6000) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration,
      color: 'danger'
    });
    await toast.present();
  }

  orderByCreatedDecrescente(a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  }

  orderByDistancia(a, b) {
    if (a.distancia < b.distancia) {
      return -1;
    }
    if (a.distancia > b.distancia) {
      return 1;
    }
    return 0;
  }

  orderCrescente(a, b) {
    if (a.ordem < b.ordem) {
      return -1;
    }
    if (a.ordem > b.ordem) {
      return 1;
    }
    return 0;
  }

  orderByNome(a, b) {
    if (a.nome < b.nome) {
      return -1;
    }
    if (a.nome > b.nome) {
      return 1;
    }
    return 0;
  }

  async openTerm() {
    const modal = await this.modalController.create({
      component: TermosDeUsoPage
    });
    return await modal.present();
  }

  async validcpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    let result = true;
    [9, 10].forEach((j) => {
      let soma = 0, r;
      cpf.split(/(?=)/).splice(0, j).forEach((e, i) => {
        soma += Number(e) * ((j + 2) - (i + 1));
      });
      r = soma % 11;
      r = (r < 2) ? 0 : 11 - r;
      if (r !== Number(cpf.substring(j, j + 1))) {
        result = false;
      }
    });
    return result;
  }

  getDistancia(latitudeOrigem, longitudeOrigem, latitude, longitude) {
    if (latitudeOrigem != null && longitudeOrigem != null && latitude != null && longitude) {
      return this.getDistanceFromLatLonInKm(latitudeOrigem, longitudeOrigem, latitude, longitude).toFixed(0);
    }
    return '';
  }

  private getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}
