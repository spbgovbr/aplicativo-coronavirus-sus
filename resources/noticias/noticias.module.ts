import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NoticiasPage } from '../../src/app/pages/noticias/noticias.page';
import { HttpLoaderFactory } from '../../src/app/app.module';
import { DicaDetalhePageModule } from '../../src/app/pages/dica-detalhe/dica-detalhe.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DicaDetalhePageModule,
    RouterModule.forChild([{ path: '', component: NoticiasPage }]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [NoticiasPage]
})
export class NoticiasPageModule {}
