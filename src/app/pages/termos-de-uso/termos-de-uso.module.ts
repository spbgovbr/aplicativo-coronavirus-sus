import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermosDeUsoPage } from './termos-de-uso.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: TermosDeUsoPage }]),
  ],
  declarations: [TermosDeUsoPage]
})
export class TermosDeUsoPageModule {}
