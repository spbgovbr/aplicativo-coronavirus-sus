import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { SintomasService } from '../../services/sintomas.service';
import { IdiomaService } from '../../services/idioma.service';
import { StorageService } from '../../services/storage.service';
import { DuracoesService } from '../../services/duracoes.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from '../../services/util.service';
import { CasoGravePage } from '../caso-grave/caso-grave.page';
import { IdadesService } from '../../services/idades.service';
import { CasoSuspeitoPage } from '../caso-suspeito/caso-suspeito.page';
import { CasoIsolamentoPage } from '../caso-isolamento/caso-isolamento.page';
import { CasoImprovavelPage } from '../caso-improvavel/caso-improvavel.page';
import { DoencasService } from '../../services/doencas.service';
import { SinaisService } from '../../services/sinais.service';
import { SaudeService } from '../../services/saude.service';
import { PermissaoLocalizacaoPage } from '../permissao-localizacao/permissao-localizacao.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ObrigadoPorContribuirPage } from '../obrigado-por-contribuir/obrigado-por-contribuir.page';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private sintomasService: SintomasService,
    private idiomaService: IdiomaService,
    private storage: StorageService,
    private duracoesService: DuracoesService,
    private translate: TranslateService,
    private util: UtilService,
    private modalController: ModalController,
    private idadesService: IdadesService,
    private doencasService: DoencasService,
    private sinaisService: SinaisService,
    private saudeService: SaudeService,
    private geolocation: Geolocation,
    private platform: Platform,
    private analyticsService: AnalyticsService
  ) { }

  idioma: any;
  sintomas: Array<any> = [];
  sinais: Array<any> = [];
  idades: Array<any> = [];
  doencas: Array<any> = [];
  sintomasSelecionados: Array<any> = [];
  sinaisSelecionados: Array<any> = [];
  duracaoSelecionada: any;
  idadeSelecionada: any;
  doencasSelecionadas: Array<any> = [];
  sexoSelecionado: any;
  loading: boolean;
  duracoes: Array<any> = [];
  step = 1;

  static verificaIsNenhumSintoma(sintoma) {
    return sintoma.nome === 'Nenhum desses sintomas' || sintoma.nome === 'Ninguno de estos síntomas'
      || sintoma.nome === 'None of these symptoms';
  }

  static verificaIsNaoPossuo(doenca) {
    return doenca.nome === 'Não possuo' || doenca.nome === 'No tengo'
      || doenca.nome === 'I do not have';
  }

  async ngOnInit() {
    // await this.openCasoSuspeito();
    // await this.openCasoGrave();
    // this.analyticsService.track('Estou mal');
    this.loading = true;
    this.idioma = await this.idiomaService.getCDN(this.storage.get('LANGUAGE'));
    this.translate.setDefaultLang(this.storage.get('LANGUAGE'));
    this.sintomas = await this.sintomasService.getCDN(this.idioma.objectId);
    this.duracoes = await this.duracoesService.getCDN(this.idioma.objectId);
    this.loading = false;
  }

  voltarClicked() {
    this.navCtrl.back();
  }

  selecionarSintoma( sintoma: any) {
    if (TestePage.verificaIsNenhumSintoma(sintoma) && !sintoma.selecionado) {
      sintoma.selecionado = !sintoma.selecionado;
      this.sintomasSelecionados = [];
      this.sintomasSelecionados.push({
        objectId: sintoma.objectId,
        nome: sintoma.nome
      });
      this.sintomas.forEach((s) => {
        if (s.objectId !== sintoma.objectId) {
          s.selecionado = false;
        }
      });
    } else {
      const hasNenhum = !!this.sintomasSelecionados.filter(( s) => {
        return TestePage.verificaIsNenhumSintoma(s);
      }).length;
      if (hasNenhum) {
        this.sintomasSelecionados = [];
      }
      this.sintomas.forEach((s) => {
        if (TestePage.verificaIsNenhumSintoma(s)) {
          s.selecionado = false;
        }
      });
      sintoma.selecionado = !sintoma.selecionado;
      const hasInSelecionados = !!this.sintomasSelecionados.filter((s) => {
        return s.objectId === sintoma.objectId;
      }).length;
      if (hasInSelecionados) {
        let index = 0;
        this.sintomasSelecionados.forEach(( item: any, i) => {
          if (item.objectId === sintoma.objectId) {
            index = i;
          }
        });
        this.sintomasSelecionados.splice(index, 1);
      } else {
        this.sintomasSelecionados.push({
          objectId: sintoma.objectId,
          nome: sintoma.nome
        });
      }
    }
  }

  selecionarDoenca( doenca: any) {
    if (TestePage.verificaIsNaoPossuo(doenca) && !doenca.selecionado) {
      doenca.selecionado = !doenca.selecionado;
      this.doencasSelecionadas = [];
      this.doencasSelecionadas.push({
        objectId: doenca.objectId,
        nome: doenca.nome
      });
      this.doencas.forEach((s) => {
        if (s.objectId !== doenca.objectId) {
          s.selecionado = false;
        }
      });
    } else {
      const hasNenhum = !!this.doencasSelecionadas.filter(( s) => {
        return TestePage.verificaIsNaoPossuo(s);
      }).length;
      if (hasNenhum) {
        this.doencasSelecionadas = [];
      }
      this.doencas.forEach((s) => {
        if (TestePage.verificaIsNaoPossuo(s)) {
          s.selecionado = false;
        }
      });
      doenca.selecionado = !doenca.selecionado;
      const hasInSelecionados = !!this.doencasSelecionadas.filter((s) => {
        return s.objectId === doenca.objectId;
      }).length;
      if (hasInSelecionados) {
        let index = 0;
        this.sintomasSelecionados.forEach(( item: any, i) => {
          if (item.objectId === doenca.objectId) {
            index = i;
          }
        });
        this.doencasSelecionadas.splice(index, 1);
      } else {
        this.doencasSelecionadas.push({
          objectId: doenca.objectId,
          nome: doenca.nome
        });
      }
    }
  }

  selecionarSinal( sinal: any) {
    if (TestePage.verificaIsNenhumSintoma(sinal) && !sinal.selecionado) {
      sinal.selecionado = !sinal.selecionado;
      this.sinaisSelecionados = [];
      this.sinaisSelecionados.push({
        objectId: sinal.objectId,
        nome: sinal.nome
      });
      this.sinais.forEach((s) => {
        if (s.objectId !== sinal.objectId) {
          s.selecionado = false;
        }
      });
    } else {
      const hasNenhum = !!this.sinaisSelecionados.filter(( s) => {
        return TestePage.verificaIsNenhumSintoma(s);
      }).length;
      if (hasNenhum) {
        this.sinaisSelecionados = [];
      }
      this.sinais.forEach((s) => {
        if (TestePage.verificaIsNenhumSintoma(s)) {
          s.selecionado = false;
        }
      });
      sinal.selecionado = !sinal.selecionado;
      const hasInSelecionados = !!this.sinaisSelecionados.filter((s) => {
        return s.objectId === sinal.objectId;
      }).length;
      if (hasInSelecionados) {
        let index = 0;
        this.sinaisSelecionados.forEach(( item: any, i) => {
          if (item.objectId === sinal.objectId) {
            index = i;
          }
        });
        this.sinaisSelecionados.splice(index, 1);
      } else {
        this.sinaisSelecionados.push({
          objectId: sinal.objectId,
          nome: sinal.nome
        });
      }
    }
  }

  selecionarDuracao( duracao: any) {
    if (this.duracaoSelecionada && this.duracaoSelecionada.objectId === duracao.objectId) {
      this.duracaoSelecionada = undefined;
    } else {
      this.duracaoSelecionada = duracao;
    }
  }

  selecionarIdade( idade: any) {
    if (this.idadeSelecionada && this.idadeSelecionada.objectId === idade.objectId) {
      this.idadeSelecionada = undefined;
    } else {
      this.idadeSelecionada = idade;
    }
  }

  selecionarSexo( sexo: any) {
    if (this.sexoSelecionado && this.sexoSelecionado === sexo) {
      this.idadeSelecionada = undefined;
    } else {
      this.sexoSelecionado = sexo;
    }
  }

  async confirmarClicked() {
    const lang = this.storage.get('LANGUAGE');
    if (this.verificaPerguntasObrigatorias()) {
      switch (this.step) {
        case 1: {
          if (TestePage.verificaIsNenhumSintoma(this.sintomasSelecionados[0]) && this.sintomasSelecionados.length === 1) {
            const permissaoGps = await this.storage.get('PERMISSAO_GPS');
            if (!permissaoGps) {
              const modalPermissaoGps = await this.modalController.create({
                component: PermissaoLocalizacaoPage,
                cssClass: 'modal-permissao-localizacao'
              });
              await modalPermissaoGps.present();
              await this.storage.set('PERMISSAO_GPS', true);
              await modalPermissaoGps.onDidDismiss();
            }
            await this.util.onLoading('');
            this.geolocation.getCurrentPosition( { timeout: 10000 } ).then( async ( pos ) => {
              this.saudeService.salvar({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                estou_bem: true,
                sintomas: [],
              }).then(async (pontoSalvo) => {
                await this.util.endLoading();
                const modal = await this.modalController.create({
                  component: ObrigadoPorContribuirPage,
                });
                await modal.present();
                this.voltarClicked();
              });
            }).catch( async ( e ) => {
              await this.util.endLoading();
              const msgPtBr = 'Erro ao buscar a localização';
              const msgEnUs = 'Error fetching location';
              const msgEs = 'Error al buscar la ubicación';
              if (e.code && (e.code === 1 || e.code === 2 || e.code === 3)) {
                await this.util.toast(this.idioma === 'pt-BR' ? msgPtBr : this.idioma === 'en-US'
                  ? msgEnUs : this.idioma === 'es' ? msgEs : '', 3000);
              } else {
                await this.util.toast('Ocorreu um erro inesperado!');
              }
            });
          } else {
            this.step = this.step + 1;
            await this.getIdades();
          }
          break;
        }
        case 2: {
          this.step = this.step + 1;
          await this.getDoencasSinais();
          break;
        }
        case 3: {
          const permissaoGps = this.storage.get('PERMISSAO_GPS');
          if (!permissaoGps) {
            const modalPermissaoGps = await this.modalController.create({
              component: PermissaoLocalizacaoPage,
              cssClass: 'modal-permissao-localizacao'
            });
            await modalPermissaoGps.present();
            await this.storage.set('PERMISSAO_GPS', true);
            await modalPermissaoGps.onDidDismiss();
          }
          await this.util.onLoading('');
          this.geolocation.getCurrentPosition( { timeout: 10000 } ).then( async ( pos ) => {
            this.saudeService.salvar({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              estou_bem: false,
              sintomas: this.sintomasSelecionados,
              duracao: this.duracaoSelecionada,
              idade: this.idadeSelecionada,
              sexo: this.sexoSelecionado,
              comorbidades: this.doencasSelecionadas,
              sinais: this.sinaisSelecionados
            }).then(async () => {
              await this.util.endLoading();
              if (this.verificaFebre() && this.verificaDificuldadeRespirar()) {
                  await this.openCasoGrave();
              } else if (this.verificaFebre() && this.verificaDorGargantaOuTosse()) {
                if (this.verificaMaior60Anos()) {
                  if (!TestePage.verificaIsNaoPossuo(this.doencasSelecionadas[0]) && this.doencasSelecionadas.length >= 1) {
                    await this.openCasoSuspeito();
                  } else {
                    await this.openCasoImprovavel();
                  }
                } else if (!TestePage.verificaIsNenhumSintoma(this.sinaisSelecionados[0]) && this.sinaisSelecionados.length >= 1) {
                  await this.openCasoGrave();
                } else {
                  await this.openCasoIsolamento();
                }
              } else {
                await this.openCasoImprovavel();
              }
              // if (this.verificaDificuldadeRespirar()) {
              //   await this.util.endLoading();
              //   await this.openCasoGrave();
              // } else {
              //   if (!this.verificaFebre() || (this.verificaFebre() && this.sintomasSelecionados.length === 1)
              //     || TestePage.verificaIsNenhumSintoma(this.sintomasSelecionados[0])) {
              //     if (!this.verificaMaior60Anos() && TestePage.verificaIsNaoPossuo(this.doencasSelecionadas[0])) {
              //       await this.util.endLoading();
              //       await this.openCasoImprovavel();
              //     } else if (this.verificaMaior60Anos()
              //       || (this.doencasSelecionadas.length > 0 && !TestePage.verificaIsNaoPossuo(this.doencasSelecionadas[0]))) {
              //       await this.util.endLoading();
              //       await this.openCasoIsolamento();
              //     }
              //   } else if (this.verificaFebre() && this.sintomasSelecionados.length > 1) {
              //     if (this.verificaDorGargantaOuTosse() && (!TestePage.verificaIsNenhumSintoma(this.sinaisSelecionados[0])
              //       && this.sinaisSelecionados.length > 1)) {
              //       await this.openCasoGrave();
              //     } else if (this.verificaMaior60Anos() || (this.doencasSelecionadas.length > 0
              //       && !TestePage.verificaIsNaoPossuo(this.doencasSelecionadas[0]))) {
              //       await this.util.endLoading();
              //       await this.openCasoGrave();
              //     } else if (!this.verificaMaior60Anos() || (this.doencasSelecionadas.length === 1)
              //       && TestePage.verificaIsNaoPossuo(this.doencasSelecionadas[0])) {
              //       await this.util.endLoading();
              //       await this.openCasoSuspeito(this.verificaMaior60Anos()
              //         || (!TestePage.verificaIsNenhumSintoma(this.sinaisSelecionados[0]) && this.sinaisSelecionados.length > 0));
              //     }
              //   }
              // }
            });
          }).catch( async ( e ) => {
            await this.util.endLoading();
            const msgPtBr = 'Erro ao buscar a localização';
            const msgEnUs = 'Error fetching location';
            const msgEs = 'Error al buscar la ubicación';
            if (e.code && (e.code === 1 || e.code === 2 || e.code === 3)) {
              await this.util.toast(lang === 'pt-BR' ? msgPtBr : lang === 'en-US'
                ? msgEnUs : lang === 'es' ? msgEs : '', 3000);
            } else {
              await this.util.toast('Ocorreu um erro inesperado!');
            }
          });
          break;
        }
      }
    } else {
      if (lang === 'es') {
        await this.util.toast('Todas las preguntas deben ser completadas', 3000);
      } else if (lang === 'en-US') {
        await this.util.toast('All questions must be completed', 3000);
      } else {
        await this.util.toast('Todas as perguntas devem ser preenchidas', 3000);
      }
    }
  }

  async getDoencasSinais() {
    this.loading = true;
    this.doencas = await this.doencasService.getCDN(this.idioma.objectId);
    this.sinais = await this.sinaisService.getCDN(this.idioma.objectId);
    this.loading = false;
  }

  async getIdades() {
    this.loading = true;
    this.idades = await this.idadesService.getCDN(this.idioma.objectId);
    this.loading = false;
  }

  private async openCasoGrave() {
    const modal = await this.modalController.create({
      component: CasoGravePage,
    });
    await modal.present();
    this.voltarClicked();
  }

  private async openCasoImprovavel() {
    const modal = await this.modalController.create({
      component: CasoImprovavelPage,
    });
    await modal.present();
    this.voltarClicked();
  }

  private async openCasoIsolamento() {
    const modal = await this.modalController.create({
      component: CasoIsolamentoPage,
    });
    await modal.present();
    this.voltarClicked();
  }

  private async openCasoSuspeito() {
    const modal = await this.modalController.create({
      component: CasoSuspeitoPage
    });
    await modal.present();
    this.voltarClicked();
  }

  private verificaMaior60Anos() {
    return this.idadeSelecionada.nome === 'Mais de 60 anos ' || this.idadeSelecionada.nome === 'Over 60 years'
      || this.idadeSelecionada.nome === 'Más de 60 años';
  }

  private  verificaDorGargantaOuTosse() {
    return !!this.sintomasSelecionados.filter((s) => {
      return (s.nome === 'Dor de Garganta' || s.nome === 'Dolor de garganta' || s.nome === 'Sore throat') ||
        (s.nome === 'Tosse' || s.nome === 'Tos' || s.nome === 'Cough');
    }).length;
  }

  private verificaFebre() {
    return !!this.sintomasSelecionados.filter((s) => {
      return s.nome === 'Febre' || s.nome === 'Fever' || s.nome === 'Fiebre';
    }).length;
  }

  private verificaDificuldadeRespirar() {
    return !!this.sintomasSelecionados.filter((s) => {
      return s.nome === 'Dificuldade de Respirar' || s.nome === 'Difficulty Breathing' || s.nome === 'Dificultad para respirar';
    }).length;
  }

  private verificaPerguntasObrigatorias() {
    switch (this.step) {
      case 1: return this.sintomasSelecionados.length > 0 && this.duracaoSelecionada !== undefined;
      case 2: return this.idadeSelecionada !== undefined && this.sexoSelecionado !== undefined;
      case 3: return this.doencasSelecionadas.length > 0 && this.sinaisSelecionados.length > 0;
    }
  }
}
