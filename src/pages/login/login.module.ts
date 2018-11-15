import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { LoginPage } from './login';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @NgModule({
   declarations: [LoginPage],
   imports: [
     IonicPageModule.forChild(LoginPage)
   ],
   entryComponents: [LoginPage]
 })
 export class LoginModule {}
