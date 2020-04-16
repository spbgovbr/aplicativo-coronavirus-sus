import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { CasoIsolamentoPage } from './caso-isolamento.page';
import { CasoIsolamentoCuidadorPageModule } from '../caso-isolamento-cuidador/caso-isolamento-cuidador.module';
import { CasoIsolamentoInfectadoPageModule } from '../caso-isolamento-infectado/caso-isolamento-infectado.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CasoIsolamentoCuidadorPageModule,
    CasoIsolamentoInfectadoPageModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [CasoIsolamentoPage],
  exports: [CasoIsolamentoPage],
  entryComponents: [CasoIsolamentoPage]
})
export class CasoIsolamentoPageModule {}
