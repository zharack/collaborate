import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { RegisterPage } from './register';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @NgModule({
   declarations: [RegisterPage],
   imports: [
     IonicPageModule.forChild(RegisterPage)
   ],
   entryComponents: [RegisterPage]
 })
 export class RegisterModule {}
