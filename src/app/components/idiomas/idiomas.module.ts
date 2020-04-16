import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IdiomasComponent } from './idiomas.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [IdiomasComponent],
  exports: [IdiomasComponent]
})
export class IdiomasComponentModule {}