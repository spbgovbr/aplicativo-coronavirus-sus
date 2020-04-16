import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-teste-passo-1',
  templateUrl: './teste-passo-1.component.html',
  styleUrls: ['./teste-passo-1.component.scss'],
})
export class TestePasso1Component {

  @Output() selectSintomas: EventEmitter<any> = new EventEmitter();
  @Output() selectDuracao: EventEmitter<any> = new EventEmitter();
  @Input() sintomas: Array<any> = [];
  @Input() duracoes: Array<any> = [];
  @Input() duracaoSelecionada: any;

  constructor() { }

  selecionarSintoma( sintoma: any) {
    this.selectSintomas.emit(sintoma);
  }

  selecionarDuracao( duracao: any) {
    this.selectDuracao.emit(duracao);
  }
}
