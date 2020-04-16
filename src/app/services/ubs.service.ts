import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UbsService {

  constructor(
    private http: HttpClient
  ) {}

  get(): Observable<any> {
    return this.http.get('assets/data/Estabelecimentos_COVID19_v1_18032020.json');
  }
}