import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { UtilService } from './services/util.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DicasService } from './services/dicas.service';
import { UbsService } from './services/ubs.service';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IdiomaService } from './services/idioma.service';
import { SintomasService } from './services/sintomas.service';
import { DuracoesService } from './services/duracoes.service';
import { IdadesService } from './services/idades.service';
import { DoencasService } from './services/doencas.service';
import { SinaisService } from './services/sinais.service';
import { Network } from '@ionic-native/network/ngx';
import { TwitterService } from './services/twitter.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Push } from '@ionic-native/push/ngx';
import { NotificacoesService } from './services/notificacoes.service';
import { TermosDeUsoPageModule } from './pages/termos-de-uso/termos-de-uso.module';
import { TermService } from './services/term.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SaudeService } from './services/saude.service';
import { PermissaoNotificacaoPageModule } from './pages/permissao-notificacao/permissao-notificacao.module';
import { AtendimentoPreClinicoService } from './services/atendimento-pre-clinico.service';
import { AnalyticsService } from './services/analytics.service';
import { OnboardsService } from './services/onboards.service';
import { StoriesService } from './services/stories.service';
import { PortalService } from './services/portal.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonIcon: 'arrow-back-outline',
      backButtonText: '',
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    TermosDeUsoPageModule,
    PermissaoNotificacaoPageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    Globalization,
    StorageService,
    UtilService,
    UbsService,
    DicasService,
    SintomasService,
    DuracoesService,
    IdadesService,
    DoencasService,
    AnalyticsService,
    SinaisService,
    IdiomaService,
    NotificacoesService,
    TwitterService,
    OnboardsService,
    StoriesService,
    PortalService,
    AtendimentoPreClinicoService,
    LaunchNavigator,
    TermService,
    Network,
    SaudeService,
    Push,
    Geolocation,
    SplashScreen,
    InAppBrowser,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
