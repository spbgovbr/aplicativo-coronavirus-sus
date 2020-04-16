import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-idiomas',
    templateUrl: './idiomas.component.html',
    styleUrls: ['./idiomas.component.scss'],
})
export class IdiomasComponent implements OnInit {

  @Input() language: string;
  @Output() idiomaSelected: EventEmitter<any> = new EventEmitter();

  aberto: boolean;
  selecionado: any;

  idiomas = [
    {
      abreviacao: 'BRA',
      nome: 'Português',
      icone: '/assets/images/idiomas/pt-br.svg',
      slug: 'pt-BR'
    },
    {
      abreviacao: 'EUA',
      nome: 'English',
      icone: '/assets/images/idiomas/en-us.png',
      slug: 'en-US'
    },
    {
      abreviacao: 'ES',
      nome: 'Espanol',
      icone: '/assets/images/idiomas/es.png',
      slug: 'es'
    }];

  constructor() {}

  ngOnInit() {
    this.selecionado = this.idiomas.filter((i) => {
      return i.slug === this.language;
    })[0];
  }

  toggleClicked() {
    this.aberto = !this.aberto;
  }

  alterarIdiomaClicked(idioma: any) {
    this.selecionado = idioma;
    this.toggleClicked();
    this.idiomaSelected.emit(this.selecionado.slug);
  }
}
