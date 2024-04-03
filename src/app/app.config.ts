import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'simple-icm',
          appId: '1:1083558388069:web:464008579512072004018c',
          storageBucket: 'simple-icm.appspot.com',
          apiKey: 'AIzaSyB1wnTcMjSrLQ2veN3wk3MWQV9CjJ-GPXc',
          authDomain: 'simple-icm.firebaseapp.com',
          messagingSenderId: '1083558388069',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
