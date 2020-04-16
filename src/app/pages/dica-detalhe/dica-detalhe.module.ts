import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DicaDetalhePage } from './dica-detalhe.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [DicaDetalhePage],
  exports: [DicaDetalhePage],
  entryComponents: [DicaDetalhePage]
})
export class DicaDetalhePageModule {}
