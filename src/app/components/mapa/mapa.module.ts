import { NgModule } from '@angular/core';
import { MapaComponent } from './mapa';
import { IonicModule } from '@ionic/angular';
import { PermissaoLocalizacaoPageModule } from '../../pages/permissao-localizacao/permissao-localizacao.module';

@NgModule({
	declarations: [MapaComponent],
	imports: [
		IonicModule,
		PermissaoLocalizacaoPageModule
	],
	exports: [MapaComponent]
})
export class MapaComponentModule {}
