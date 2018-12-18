import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgotPage } from '../forgot/forgot';
import { OauthService, UserModel } from '../../providers/oauth/oauth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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
  public logged: boolean = false;
  private user: UserModel = null

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private _oauthService: OauthService,
    private fb: Facebook
  ) {
    this.login = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      pass: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logForm(e) {
    //TODO: LLamada rest para el login
    let user = new UserModel();
    user.username = this.login['name'];
    user.password = this.login['pass'];
    this._oauthService.login(user).subscribe(
      (val: boolean) => {
        if (val) {
          this.user = this._oauthService.getUserData();
          console.log(this.user);
          const toast = this.toastCtrl.create({
            message: 'Usuario' + this.user.username + ' email ' + this.user.email,
            duration: 7000,
            position: 'bottom',
            cssClass: 'errorToast',
            showCloseButton: true,
            dismissOnPageChange: true,
            closeButtonText: 'Close'
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
        } else {
          const toast = this.toastCtrl.create({
            message: 'Usuario o contraseña erroneos',
            duration: 7000,
            position: 'bottom',
            cssClass: 'errorToast',
            showCloseButton: true,
            dismissOnPageChange: true,
            closeButtonText: 'Close'
          });
          toast.present();
        }
      }
    );
  }

  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  forgot() {
    this.navCtrl.push(ForgotPage);
  }

  google() {
    console.log(123);
  }

  facebook() {
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
      .then((res: FacebookLoginResponse) => {

        // The connection was successful
        if (res.status == "connected") {

          // Get user ID and Token
          var fb_id = res.authResponse.userID;
          var fb_token = res.authResponse.accessToken;

          // Get user infos from the API
          this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

            // Get the connected user details
            var gender = user.gender;
            var birthday = user.birthday;
            var name = user.name;
            var email = user.email;

            console.log("=== USER INFOS ===");
            console.log("Gender : " + gender);
            console.log("Birthday : " + birthday);
            console.log("Name : " + name);
            console.log("Email : " + email);

            // => Open user session and redirect to the next page

          });

        }
        // An error occurred while loging-in
        else {

          console.log("An error occurred...");

        }

      })
      .catch((e) => {
        console.log('Error logging into Facebook', e);
      });
  }
}
