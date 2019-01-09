import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GeoManagerProvider } from '../providers/geo-manager/geo-manager';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../pages/map/map';
// import { GoogleMaps } from '@ionic-native/google-maps';
import { LoginPage } from '../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { RegisterPage } from '../pages/register/register';
import {Device} from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { GoogleMaps } from '@ionic-native/google-maps';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const pages = [
  MyApp,
  HomePage,
  ListPage,
  LoginPage,
  ForgotPage,
  RegisterPage,
  MapPage
]
@NgModule({
  declarations: pages,
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
    // IonicPageModule.forChild(ForgotPage)
  ],
  bootstrap: [IonicApp],
  entryComponents: pages,
  providers: [
    Device,
    Network,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeoManagerProvider
  ]
})
export class AppModule {}
