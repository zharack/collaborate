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
import { LoginPage } from '../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { RegisterPage } from '../pages/register/register';


const pages = [
  MyApp,
  HomePage,
  ListPage,
  LoginPage,
  ForgotPage,
  RegisterPage
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
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeoManagerProvider
  ]
})
export class AppModule {}
