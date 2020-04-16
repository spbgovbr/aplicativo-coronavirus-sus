import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-teste-passo-3',
  templateUrl: './teste-passo-3.component.html',
  styleUrls: ['./teste-passo-3.component.scss'],
})
export class TestePasso3Component implements OnInit {

  @Input() doencas: Array<any> = [];
  @Input() sintomas: any;
  @Output() selectDoenca: EventEmitter<any> = new EventEmitter();
  @Output() selectSintoma: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private translate: TranslateService,
    private storage: StorageService
  ) { }

  async ngOnInit() {
    this.translate.setDefaultLang(this.storage.get('LANGUAGE'));
  }

  selecionarDoenca(doenca: any) {
    this.selectDoenca.emit(doenca);
  }

  selecionarSintoma(sintoma: any) {
    this.selectSintoma.emit(sintoma);
  }

}
