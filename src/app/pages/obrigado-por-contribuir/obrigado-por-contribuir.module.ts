import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObrigadoPorContribuirPage } from './obrigado-por-contribuir.page';
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
  declarations: [ObrigadoPorContribuirPage],
  exports: [ObrigadoPorContribuirPage],
  entryComponents: [ObrigadoPorContribuirPage]
})
export class ObrigadoPorContribuirPageModule {}
