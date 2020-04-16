import { Injectable } from '@angular/core';

// declare var gtag;

@Injectable()
export class AnalyticsService {

    constructor() {}

    track(page) {
        // gtag('config', 'UA-161681403-1', {
        //     page_title: page,
        //     page_location: page,
        //     page_path: page
        // });
    }
}
