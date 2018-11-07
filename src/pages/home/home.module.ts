import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, IonicPageModule } from 'ionic-angular';
import { ErrorHandler, NgModule } from '@angular/core';
import { HomePage } from './home';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @NgModule({
   declarations: [HomePage],
   imports: [
     IonicPageModule.forChild(HomePage)
   ],
   entryComponents: [HomePage]
 })
 export class HomeModule {}
