import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
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
