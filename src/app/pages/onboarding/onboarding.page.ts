import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { OnboardsService } from '../../services/onboards.service';
import { IdiomaService } from '../../services/idioma.service';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.page.html',
    styleUrls: ['./onboarding.page.scss']
})
export class OnboardingPage implements OnInit {

    onboards: Array<any> = [];
    @ViewChild('slides', { static: false }) slides: IonSlides;
    isBeginning = true;
    isEnd = false;

    constructor(
        private router: Router,
        private onboardsService: OnboardsService,
        private idiomaService: IdiomaService,
        private storage: StorageService,
        private translate: TranslateService
    ) { }

    async ngOnInit() {
        this.translate.setDefaultLang(this.storage.get('LANGUAGE'));
        await this.storage.set('ONBOARDING', false);
        this.onboards = [];
        const idioma = await this.idiomaService.getCDN(this.storage.get('LANGUAGE'));
        this.onboards = await this.onboardsService.getCDN(idioma.objectId);
        if (this.onboards.length === 0 ) {
            this.enter();
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
    }

    next() {
        this.slides.isEnd().then((end: boolean) => {
            if (!end) {
                this.slides.slideNext();
                return;
            }
            this.enter();
        });
    }

    async enter() {
        await this.router.navigate([!this.storage.get('TERM') ? 'termo' : 'app/inicio'], {
            replaceUrl: true
        });
    }

}
