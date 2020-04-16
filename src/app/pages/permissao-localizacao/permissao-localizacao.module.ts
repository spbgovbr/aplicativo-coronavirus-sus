import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissaoLocalizacaoPage } from './permissao-localizacao.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [PermissaoLocalizacaoPage],
  exports: [PermissaoLocalizacaoPage],
  entryComponents: [PermissaoLocalizacaoPage]
})
export class PermissaoLocalizacaoPageModule {}
