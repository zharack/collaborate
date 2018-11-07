import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, IonicPageModule } from 'ionic-angular';
import { ForgotPage } from './forgot';
import { ErrorHandler, NgModule } from '@angular/core';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @NgModule({
   declarations: [ForgotPage],
   imports: [
     IonicPageModule.forChild(ForgotPage)
   ],
   entryComponents: [ForgotPage]
 })
 export class ForgotModule {}
