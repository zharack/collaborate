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
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';

// CAMARA
import { Camera } from '@ionic-native/camera';
import { CameraPage } from '../pages/camera/camera';

const pages = [
  MyApp,
  HomePage,
  ListPage,
  LoginPage,
  ForgotPage,
  RegisterPage,
  MapPage,
  CameraPage
]
@NgModule({
  declarations: pages,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeoManagerProvider
    // ,GoogleMaps
  ]
})
export class AppModule {}
