import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestePage } from './teste.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { TestePasso1Component } from '../../components/teste-passo-1/teste-passo-1.component';
import { TestePasso2Component } from '../../components/teste-passo-2/teste-passo-2.component';
import { TestePasso3Component } from '../../components/teste-passo-3/teste-passo-3.component';
import { RouterModule } from '@angular/router';
import { CasoGravePageModule } from '../caso-grave/caso-grave.module';
import { CasoSuspeitoPageModule } from '../caso-suspeito/caso-suspeito.module';
import { CasoIsolamentoPageModule } from '../caso-isolamento/caso-isolamento.module';
import { CasoImprovavelPageModule } from '../caso-improvavel/caso-improvavel.module';
import { PermissaoLocalizacaoPageModule } from '../permissao-localizacao/permissao-localizacao.module';
import { ObrigadoPorContribuirPageModule } from '../obrigado-por-contribuir/obrigado-por-contribuir.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CasoGravePageModule,
    CasoIsolamentoPageModule,
    CasoImprovavelPageModule,
    CasoSuspeitoPageModule,
    PermissaoLocalizacaoPageModule,
    ObrigadoPorContribuirPageModule,
    RouterModule.forChild([{ path: '', component: TestePage }]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [TestePage, TestePasso1Component, TestePasso2Component, TestePasso3Component]
})
export class TestePageModule {}
