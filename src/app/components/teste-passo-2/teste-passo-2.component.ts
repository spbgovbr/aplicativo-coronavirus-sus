import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-teste-passo-2',
  templateUrl: './teste-passo-2.component.html',
  styleUrls: ['./teste-passo-2.component.scss'],
})
export class TestePasso2Component implements OnInit {

  @Input() idades: Array<any> = [];
  @Input() idadeSelecionada: any;
  @Input() sexoSelecionado: any;
  @Output() selectIdade: EventEmitter<any> = new EventEmitter();
  @Output() selectSexo: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private translate: TranslateService,
    private storage: StorageService
  ) { }

  async ngOnInit() {
    this.translate.setDefaultLang(this.storage.get('LANGUAGE'));
  }

  selecionarIdade(idade: any) {
    this.selectIdade.emit(idade);
  }

  selecionarSexo(sexo: any) {
    this.selectSexo.emit(sexo);
  }
}
