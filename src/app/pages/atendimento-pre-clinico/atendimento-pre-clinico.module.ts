import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoPreClinicoPage } from './atendimento-pre-clinico.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BrMaskerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [AtendimentoPreClinicoPage],
  entryComponents: [AtendimentoPreClinicoPage]
})
export class AtendimentoPreClinicoPageModule {}
