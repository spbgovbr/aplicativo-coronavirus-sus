import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { StoriesService } from '../../services/stories.service';
import { StorageService } from '../../services/storage.service';
import { IdiomaService } from '../../services/idioma.service';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.page.html',
    styleUrls: ['./stories.page.scss']
})
export class StoriesPage {

    @ViewChild('slides', { static: false }) slides: IonSlides;
    isBeginning = true;
    isEnd = false;
    stories: Array<any> = [];
    storiesVisualizados: Array<any> = [];
    timer: any;
    count = 10000;
    txtVerMais: string;

    constructor(
        private router: Router,
        private storage: StorageService,
        private idiomaService: IdiomaService,
        private storiesService: StoriesService
    ) {
        this.txtVerMais = this.storage.get('LANGUAGE') === 'pt-BR' ? 'Ver mais'
            : (this.storage.get('LANGUAGE') === 'en-US' ? 'View more' : (this.storage.get('LANGUAGE') === 'es' ? 'Ver más' : ''));
        this.stories = this.router.getCurrentNavigation().extras.state
            ? this.router.getCurrentNavigation().extras.state.stories : undefined;
        if (!this.stories) {
            this.stories = [];
            this.idiomaService.getCDN(this.storage.get('LANGUAGE')).then((idioma) => {
                this.storiesService.getCDN(idioma.objectId).then((stories) => {
                    this.stories = stories;
                });
            });
            this.storiesVisualizados = [];
        } else {
            let indexPrimeiroStoreNaoLido = 0;
            for (let i = 0; i < this.stories.length; i ++) {
                if (this.stories[i].lido === false) {
                    indexPrimeiroStoreNaoLido = i;
                    break;
                }
            }
            setTimeout(async () => {
                await this.slides.slideTo(indexPrimeiroStoreNaoLido, 0);
                await this.salvarStorieComoLido(indexPrimeiroStoreNaoLido);
            }, 100);
        }

        this.contadores();
    }

    contadores() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.next();
        }, this.count);
    }

    ionViewWillLeave() {
        clearInterval(this.timer);
    }

    async salvarStorieComoLido(index) {
        this.storiesVisualizados = this.storage.get('STORIES_VIEW') ? this.storage.get('STORIES_VIEW') : [];
        const hasInStoriesVisualizados = !!this.storiesVisualizados.filter((sv) => {
            return sv === this.stories[index].objectId;
        }).length;
        if (!hasInStoriesVisualizados) {
            this.storiesVisualizados.push(this.stories[index].objectId);
            await this.storage.set('STORIES_VIEW', this.storiesVisualizados);
        }
    }

    slideDidChange() {
        this.slides.isBeginning().then((beginning: boolean) => {
            if (!beginning) {
                this.isBeginning = false;
                return;
            }
            this.isBeginning = !this.isBeginning;
        });

        this.slides.isEnd().then((end: boolean) => {
            if (!end) {
                this.isEnd = false;
                return;
            }
            this.isEnd = true;
        });
    }

    prev() {
        this.slides.slidePrev();
        this.contadores();
    }

    next() {
        this.slides.isEnd().then(async (end: boolean) => {
            if (!end) {
                await this.slides.slideNext();
                await this.salvarStorieComoLido(await this.slides.getActiveIndex());
                this.contadores();
                return;
            }
            this.enter();
        });
    }

    enter() {
        this.router.navigate(['/app/inicio'], {
            replaceUrl: true
        });
    }

}
