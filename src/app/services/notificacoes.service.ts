import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';
import { PARSE_APP_ID, PARSE_REST_KEY, URL_CDN_NOTIFICACOES, URL_PUSH } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';

@Injectable()
export class NotificacoesService {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private util: UtilService,
    private platform: Platform
  ) {}

  getCDN(language): Promise<any> {
    return new Promise<any>((resolve) => {
      let apiHeader = new HttpHeaders();
      apiHeader = apiHeader.append('X-Parse-Application-Id', PARSE_APP_ID);
      apiHeader = apiHeader.append('X-Parse-REST-API-Key', PARSE_REST_KEY);
      this.http.get(URL_CDN_NOTIFICACOES, {headers: apiHeader, withCredentials: false}).toPromise().then((response: any) => {
        response.results.forEach((d) => {
          d.lida = false;
        });
        response.results = response.results.filter((n) => {
          return moment(n.createdAt, 'YYYY-MM-DD').diff(moment(this.storage.get('START_APP')), 'd') >= 0;
        });
        resolve(response.results);
      }).catch(async () => {
        const msgPtBr = 'Ocorreu um erro ao buscar as notificações';
        const msgEnUs = 'There was an error fetching notifications';
        const msgEs = 'Se produjo un error al recuperar las notificaciones';
        await this.util.toast(language === 'pt-BR' ? msgPtBr : language === 'en-US' ? msgEnUs : language === 'es' ? msgEs : '', 3000);
        resolve([]);
      });
    });
  }

  register(token, language): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const body = {
        token,
        platform: this.platform.is('android') ? 'android' : this.platform.is('ios')
          ? 'ios' : ''
      };
      this.http.post(URL_PUSH + '/token', body).toPromise().then((response: any) => {
        console.log('response do registrer na API do Luk', response);
        resolve();
      }).catch(async () => {
        const msgPtBr = 'Ocorreu um erro ao registrar';
        const msgEnUs = 'An error occurred while registering';
        const msgEs = 'Se produjo un error al registrarse';
        await this.util.toast(language === 'pt-BR' ? msgPtBr : language === 'en-US' ? msgEnUs : language === 'es' ? msgEs : '', 3000);
        reject();
      });
    });
  }
}
