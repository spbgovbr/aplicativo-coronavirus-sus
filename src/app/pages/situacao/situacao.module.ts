import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SituacaoPage } from './situacao.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { DicaDetalhePageModule } from '../dica-detalhe/dica-detalhe.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DicaDetalhePageModule,
    RouterModule.forChild([{ path: '', component: SituacaoPage }]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [SituacaoPage]
})
export class SituacaoPageModule {}
