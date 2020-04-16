import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioPage } from './inicio.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IdiomasComponentModule } from '../../components/idiomas/idiomas.module';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { ObrigadoPorContribuirPageModule } from '../obrigado-por-contribuir/obrigado-por-contribuir.module';
import { DicaDetalhePageModule } from '../dica-detalhe/dica-detalhe.module';
import { PermissaoLocalizacaoPageModule } from '../permissao-localizacao/permissao-localizacao.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    IdiomasComponentModule,
    ObrigadoPorContribuirPageModule,
    DicaDetalhePageModule,
    PermissaoLocalizacaoPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: InicioPage
      }
    ]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [InicioPage],
})
export class InicioPageModule {}
