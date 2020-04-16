import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { CasoIsolamentoCuidadorPage } from './caso-isolamento-cuidador.page';

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
  declarations: [CasoIsolamentoCuidadorPage],
  exports: [CasoIsolamentoCuidadorPage],
  entryComponents: [CasoIsolamentoCuidadorPage]
})
export class CasoIsolamentoCuidadorPageModule {}
