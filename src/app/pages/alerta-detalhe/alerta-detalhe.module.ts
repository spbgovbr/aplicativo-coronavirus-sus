import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaDetalhePage } from './alerta-detalhe.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [AlertaDetalhePage],
  entryComponents: [AlertaDetalhePage]
})
export class AlertaDetalhePageModule {}
