import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Parse from 'parse';
import { StorageService } from './storage.service';
import { PARSE_APP_ID, PARSE_MASTER_KEY, PARSE_SERVER_URL } from '../../environments/environment';

@Injectable()
export class AtendimentoPreClinicoService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {
    Parse.initialize(PARSE_APP_ID, PARSE_MASTER_KEY);
    Parse.serverURL = PARSE_SERVER_URL;
  }

  salvar(atendimento, showPreclinico): Promise<any> {
    return new Promise(async (resolve) => {
      const PreClinico = Parse.Object.extend(showPreclinico ? 'preClinico' : 'atendimento');
      const preClinico = new PreClinico();
      if (showPreclinico) {
        preClinico.set('cpf', atendimento.cpf);
        preClinico.set('semCpf', atendimento.semCpf);
        preClinico.set('tipoDocumento', atendimento.tipoDocumento);
        preClinico.set('documento', atendimento.documento);
      } else {
        preClinico.set('nome', atendimento.nome);
        preClinico.set('telefone', atendimento.telefone);
      }

      preClinico.save().then(
        (object) => {
          resolve(object);
        },
        async () => {
          if (showPreclinico) {
            const registrosAtendimentos: Array<any> = await this.storage.get( 'ATENDIMENTO_PRE_CLINICO' )
                ? await this.storage.get( 'ATENDIMENTO_PRE_CLINICO' ) : [];
            const registroNovo = {
              cpf: atendimento.cpf,
              semCpf: atendimento.semCpf,
              tipoDocumento: atendimento.tipoDocumento,
              documento: atendimento.documento,
            };
            registrosAtendimentos.push(registroNovo);
            await this.storage.set( 'ATENDIMENTO_PRE_CLINICO', registrosAtendimentos);
            resolve(registroNovo);
          } else {
            const registrosAtendimentos: Array<any> = await this.storage.get( 'ATENDIMENTO' )
                ? await this.storage.get( 'ATENDIMENTO' ) : [];
            const registroNovo = {
              nome: atendimento.nome,
              telefone: atendimento.telefone
            };
            registrosAtendimentos.push(registroNovo);
            await this.storage.set( 'ATENDIMENTO', registrosAtendimentos);
            resolve(registroNovo);
          }
        });
    });
  }
}
