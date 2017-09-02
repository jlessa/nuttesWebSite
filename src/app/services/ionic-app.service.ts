import { configIonicApp } from './../app.firebase';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class IonicAppService {

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(configIonicApp);
        }
    }
}

