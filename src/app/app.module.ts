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
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeoManagerProvider
    // ,GoogleMaps
  ]
})
export class AppModule {}
