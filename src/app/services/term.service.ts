import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable()
export class TermService {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) {}

  getTerm(language): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.get('assets/data/term-' + language + '.json').toPromise().then((response: any) => {
        resolve(response.texto);
      });
    });
  }
}
