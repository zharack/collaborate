import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
// import { AuthService } from "../../providers/auth-service/auth-service";
// import {
//   FileTransfer,
//   FileUploadOptions,
//   FileTransferObject
// } from "@ionic-native/file-transfer";
// import { File } from "@ionic-native/file";

@IonicPage()
@Component({
  selector: "page-camera",
  templateUrl: "camera.html"
})
export class CameraPage {

  public photos : any;
  public base64Image : string;
  public fileImage: string;
  public responseData: any;
  userData = { user_id: "", token: "", imageB64: "" };

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private alertCtrl : AlertController,
    public navParams: NavParams
    // ,public authService: AuthService
  ) {}

  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Estas seguro? No hay vuelta atras!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
  }

  takePhoto() {
    console.log("coming here");
    const options: CameraOptions = {
      quality: 100, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      // targetWidth: 1000,
      // targetHeight: 1000,
    };
    this.camera
      .getPicture(options).then(imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      })
      .catch(error => {
        console.error(error);
      });
  }

  // sendData(imageData) {
  //   this.userData.imageB64 = imageData;
  //   this.userData.user_id = "1";
  //   this.userData.token = "222";
  //   console.log(this.userData);
  //   this.authService.postData(this.userData, "userImage").then(
  //     result => {
  //       this.responseData = result;
  //     },
  //     err => {
  //       // Error log
  //     }
  //   );
  // }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CameraPage");
  }
}
