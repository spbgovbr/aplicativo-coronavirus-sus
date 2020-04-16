import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { PARSE_APP_ID, PARSE_REST_KEY, URL_CDN } from '../../environments/environment';

@Injectable()
export class IdiomaService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  getCDN(nome): Promise<any> {
    return new Promise<any>((resolve) => {
      let apiHeader = new HttpHeaders();
      apiHeader = apiHeader.append('X-Parse-Application-Id', PARSE_APP_ID);
      apiHeader = apiHeader.append('X-Parse-REST-API-Key', PARSE_REST_KEY);
      this.http.get(encodeURI(URL_CDN + '/idioma?where=' + JSON.stringify({nome})),
        {headers: apiHeader, withCredentials: false}).toPromise().then((response: any) => {
        resolve(response.results[0]);
      }).catch(() => {
        resolve(this.storage.get('LANGUAGE'));
      });
    });
  }
}
