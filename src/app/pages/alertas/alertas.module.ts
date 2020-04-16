import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertasPage } from './alertas.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { AlertaDetalhePageModule } from '../alerta-detalhe/alerta-detalhe.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AlertaDetalhePageModule,
    RouterModule.forChild([{ path: '', component: AlertasPage }]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [AlertasPage]
})
export class AlertasPageModule {}
