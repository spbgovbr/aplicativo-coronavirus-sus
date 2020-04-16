import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Parse from 'parse';
import { StorageService } from './storage.service';
import { PARSE_APP_ID, PARSE_MASTER_KEY, PARSE_SERVER_URL } from '../../environments/environment';

@Injectable()
export class SaudeService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {
    Parse.initialize(PARSE_APP_ID, PARSE_MASTER_KEY);
    Parse.serverURL = PARSE_SERVER_URL;
  }

  salvar(ponto): Promise<any> {
    return new Promise(async (resolve) => {
      const Saude = Parse.Object.extend('saude');
      const saude = new Saude();
      const date = new Date();
      const point = new Parse.GeoPoint({latitude: ponto.latitude, longitude: ponto.longitude});
      saude.set('localizacao', point);
      saude.set('data', date);
      saude.set('sintomas', ponto.sintomas);
      saude.set('estou_bem', ponto.estou_bem);
      saude.set('device', ponto.device);
      saude.set('cpfUsuarioLogado', ponto.cpfUsuarioLogado);
      saude.set('paises', ponto.paises);
      saude.set('foraPais', ponto.foraPais);
      saude.set('contatoConfirmado', ponto.contatoConfirmado);
      saude.set('contatoSuspeito', ponto.contatoSuspeito);
      saude.set('duracao', ponto.duracao);
      saude.set('idade', ponto.idade);
      saude.set('sexo', ponto.sexo);
      saude.set('comorbidades', ponto.comorbidades);
      saude.set('sinais', ponto.sinais);

      saude.save().then(
        (object) => {
          console.log('passou aqui')
          resolve(object);
        },
        async (error) => {
          console.log(error);
          const registrosSaude: Array<any> = await this.storage.get( 'SAUDE' ) ? await this.storage.get( 'SAUDE' ) : [];
          const registroNovo = {
            localizacao: point,
            data: date,
            sintomas: ponto.sintomas,
            estou_bem: ponto.estou_bem,
            device: ponto.device,
            cpfUsuarioLogado: ponto.cpfUsuarioLogado,
            paises: ponto.paises,
            foraPais: ponto.foraPais,
            contatoConfirmado: ponto.contatoConfirmado,
            contatoSuspeito: ponto.contatoSuspeito,
            duracao: ponto.duracao,
            idade: ponto.idade,
            sexo: ponto.sexo,
            comorbidades: ponto.comorbidades,
            sinais: ponto.sinais,
          };
          registrosSaude.push(registroNovo);
          await this.storage.set( 'SAUDE', registrosSaude);
          resolve(registroNovo);
        });
    });
  }
}
