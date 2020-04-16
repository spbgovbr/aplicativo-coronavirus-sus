import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasoGravePage } from './caso-grave.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { AtendimentoPreClinicoPageModule } from '../atendimento-pre-clinico/atendimento-pre-clinico.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    AtendimentoPreClinicoPageModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [CasoGravePage],
  exports: [CasoGravePage],
  entryComponents: [CasoGravePage]
})
export class CasoGravePageModule {}
