import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PARSE_APP_ID_PORTAL, URL_CDN_PORTAL } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable()
export class PortalService {

    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) {}

    getCDN(type): Promise<any> {
        return new Promise<any>((resolve) => {
            let apiHeader = new HttpHeaders();
            apiHeader = apiHeader.append('X-Parse-Application-Id', PARSE_APP_ID_PORTAL);
            this.http.get(encodeURI(URL_CDN_PORTAL + '/' + type),
                {headers: apiHeader, withCredentials: false}).toPromise().then(async (response: any) => {
                await this.storage.set(type === 'PortalGeral' ? 'PORTAL_GERAL' : (type === 'PortalMapa'
                    ? 'PORTAL_MAPA' : ''), response.results);
                resolve(response.results);
            }).catch(() => {
                resolve(this.storage.get(type === 'PortalGeral' ? 'PORTAL_GERAL' : (type === 'PortalMapa' ? 'PORTAL_MAPA' : '')));
            });
        });
    }
}
