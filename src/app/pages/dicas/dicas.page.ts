import { Component, OnInit } from '@angular/core';
import { DicasService } from '../../services/dicas.service';
import { IdiomaService } from '../../services/idioma.service';
import { StorageService } from '../../services/storage.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { DicaDetalhePage } from '../dica-detalhe/dica-detalhe.page';
import { ModalController, Platform } from '@ionic/angular';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-dicas',
  templateUrl: './dicas.page.html',
  styleUrls: ['./dicas.page.scss'],
})
export class DicasPage implements OnInit {

  language: any;
  changeHeader: boolean;
  dicas: any;
  pesquisarString: string;
  filtrado: boolean;
  dicasFiltrada: any;
  estadoVazio = false;

  constructor(
    private dicasService: DicasService,
    private idiomaService: IdiomaService,
    private storage: StorageService,
    private modalController: ModalController,
    private platform: Platform,
    private analyticsService: AnalyticsService
  ) {
    EventEmitterService.get(EventEmitterService.EVENTOS.UPDATE_LANGUAGE_TAB).subscribe(async (value) => {
      await this.idiomaSelected(value);
    });
  }

  async ngOnInit() {
    // this.analyticsService.track('Dicas');
  }

  async ionViewDidEnter() {
    this.dicas = [];
    this.pesquisarString = '';
    const idioma = await this.idiomaService.getCDN(this.storage.get('LANGUAGE'));
    this.dicas = await this.dicasService.getCDN(idioma.objectId);
  }

  onScroll(event: any) {
    if (event.detail.scrollTop < 20) {
      this.changeHeader = false;
      return;
    }
    if (event.detail.scrollTop > 20) {
      this.changeHeader = true;
    }
  }

  async idiomaSelected(value) {
    this.language = value;
    await this.storage.set( 'LANGUAGE', this.language );
    await this.ionViewDidEnter();
    EventEmitterService.get(EventEmitterService.EVENTOS.UPDATE_LANGUAGE).emit(value);
  }

  async openDetalheDica(dica) {
    const modal = await this.modalController.create({
      component: DicaDetalhePage,
      componentProps: {
        dica
      }
    });
    return await modal.present();
  }

  pesquisar() {
    if (this.pesquisarString.length >= 3 && this.pesquisarString !== '') {
      this.filtrado = true;
      this.dicasFiltrada = this.dicas.filter((d) => {
        return d.titulo.toLocaleLowerCase().indexOf(this.pesquisarString.toLowerCase()) >= 0;
      });
    } else {
      this.dicasFiltrada = [];
      this.filtrado = false;
    }
  }

}
