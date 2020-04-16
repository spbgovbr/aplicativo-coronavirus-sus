import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissaoNotificacaoPage } from './permissao-notificacao.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [PermissaoNotificacaoPage],
  entryComponents: [PermissaoNotificacaoPage]
})
export class PermissaoNotificacaoPageModule {}
