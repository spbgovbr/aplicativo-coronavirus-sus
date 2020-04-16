import { EventEmitter } from '@angular/core';

export class EventEmitterService {

    static EVENTOS = {
        UPDATE_LANGUAGE: 'UPDATE_LANGUAGE',
        UPDATE_LANGUAGE_TAB: 'UPDATE_LANGUAGE_TAB',
        UPDATE_PERMISSION_PUSH: 'UPDATE_PERMISSION_PUSH'
    };

    private static emitters: { [nomeEvento: string]: EventEmitter<any> } = {};

    static get(nomeEvento: string): EventEmitter<any> {
        if (!this.emitters[nomeEvento]) {
            this.emitters[nomeEvento] = new EventEmitter<any>();
        }
        return this.emitters[nomeEvento];
    }
}
