import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MapaPage } from './mapa.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { PermissaoLocalizacaoPageModule } from '../permissao-localizacao/permissao-localizacao.module';
import { MapaComponentModule } from '../../components/mapa/mapa.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PermissaoLocalizacaoPageModule,
    MapaComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: MapaPage
      }
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [MapaPage]
})
export class MapaPageModule {}
