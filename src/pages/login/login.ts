import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgotPage } from '../forgot/forgot';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public login: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public toastCtrl: ToastController) {
    this.login = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      pass: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  logForm(){
    //TODO: LLamada rest para el login
    if(true){
      const toast = this.toastCtrl.create({
        message: 'Usuario o contraseña erroneos',
        duration: 7000,
        position: 'bottom',
        cssClass: 'errorToast',
        showCloseButton:true,
        dismissOnPageChange:true,
        closeButtonText:'Close'
      });
      toast.present();
    }else{
      this.navCtrl.setRoot(HomePage);
    }
    console.log(this.login.value);
  }

  register(){
    this.navCtrl.setRoot(RegisterPage);
  }

  forgot(){
    this.navCtrl.push(ForgotPage);
  }

  google(){
    console.log(123);
  }

  facebook(){
    console.log(123);
  }
}
