import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
// import { AuthService } from "../../providers/auth-service/auth-service";
// import {
//   FileTransfer,
//   FileUploadOptions,
//   FileTransferObject
// } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";

@IonicPage()
@Component({
  selector: "page-camera",
  templateUrl: "camera.html"
})
export class CameraPage {
  private Attachments: any[] = [];
  public photos: any;
  public base64Image: string;
  public fileImage: string;
  public responseData: any;
  userData = { user_id: "", token: "", imageB64: "" };

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public file: File,
    private alertCtrl: AlertController,
    public navParams: NavParams
  ) // ,public authService: AuthService
  {}

  ngOnInit() {
    this.photos = [];
  }

  public deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: "Estas seguro? No hay vuelta atras!",
      message: "",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Si",
          handler: () => {
            console.log("Agree clicked");
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }

  async captureImage() {
    const options: CameraOptions = {
      /** here is the picture quality
       * in range 0-100 default value 50.
       * Optional field
       */
      quality: 100,

      /** here is the format of an output file.
       * destination type default is FILE_URI.
       * DATA_URL: 0 (number) - base64-encoded string,
       * FILE_URI: 1 (number)- Return image file URI,
       * NATIVE_URI: 2 (number)- Return image native URI
       */
      destinationType: this.camera.DestinationType.DATA_URL,

      /** here is the returned image file format
       * default format is JPEG
       * JPEG:0 (number),
       * PNG:1 (number),
       */

      encodingType: this.camera.EncodingType.JPEG,

      /** Only works when Picture Source Type is PHOTOLIBRARY or  SAVEDPHOTOALBUM.
       * PICTURE: 0 allow selection of still pictures only. (DEFAULT)
       * VIDEO: 1 allow selection of video only.
       */

      mediaType: this.camera.MediaType.PICTURE,
      // targetWidth: 1000,
      // targetHeight: 1000,

      /** here set the source of the picture
       * Default is CAMERA.
       * PHOTOLIBRARY : 0,
       * CAMERA : 1,
       * SAVEDPHOTOALBUM : 2
       */

      sourceType: this.camera.PictureSourceType.CAMERA
    }

    return await this.camera
      .getPicture(options)
      .then(imageData => {
        //here converting a normal image data to base64 image data.
        this.base64Image = "data:image/jpeg;base64," + imageData;

        /** here passing three arguments to method
         * Base64 Data
         * Folder Name
         * File Name
         */

        // this.writeFile(base64ImageData, 'My Picture', 'sample.jpeg');
        this.photos.push(this.base64Image);
        this.photos.reverse();
      })
      .catch(error => {
        console.error("Error Occured: " + error);
      });
  }

  // public onImageClick() {
  //   let input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*"); //you can change also file type as **'file/*'**
  //   input.setAttribute("multiple", ""); // If you dont want multiple select file pls remove this line

  //   input.addEventListener("change", (event: any) => {
  //     let fileList: File[] = event.target.files;
  //     console.log("File List Object Value", fileList);

  //     for (let fileIdx = 0; fileIdx < fileList.length; fileIdx++) {
  //       let file = fileList[fileIdx];
  //       this.attachmentBase64(file, fileIdx);
  //     }
  //     console.log("Attachments", this.Attachments);
  //   });

  //   input.click();
  // }

  // private attachmentBase64(file: File, fileIndex: number) {
  //   let self = this;
  //   var reader = new FileReader();

  //   reader.readAsDataURL(file);
  //   reader.onerror = function(error) {};
  //   reader.onloadend = function() {
  //     //Read complete
  //     if (reader.readyState == 2) {
  //       self.Attachments[fileIndex].Base64 = reader.result;
  //     }
  //   };
  // }

  // private addImage() {
  //   for (let file of this.Attachments) {
  //     this.writeFile(file.Base64, "My Picture", "FileName.png");
  //   }
  // }

  // // here is the method is used to write a file in storage
  // public writeFile(base64Data: any, folderName: string, fileName: any) {
  //   let contentType = this.getContentType(base64Data);
  //   let DataBlob = this.base64toBlob(content, contentType);

  //   // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
  //   let filePath = this.file.externalRootDirectory + folderName;

  //   this.file
  //     .writeFile(filePath, fileName, DataBlob, contentType)
  //     .then(success => {
  //       console.log("File Writed Successfully", success);
  //     })
  //     .catch(err => {
  //       console.log("Error Occured While Writing File", err);
  //     });
  // }

  // //here is the method is used to get content type of an bas64 data
  // public getContentType(base64Data: any) {
  //   let block = base64Data.split(";");
  //   let contentType = block[0].split(":")[1];
  //   return contentType;
  // }

  // //here is the method is used to convert base64 data to blob data
  // public base64toBlob(b64Data, contentType) {
  //   contentType = contentType || "";
  //   const sliceSize = 512;
  //   let byteCharacters = atob(b64Data);
  //   let byteArrays = [];
  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     let slice = byteCharacters.slice(offset, offset + sliceSize);
  //     let byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     var byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }
  //   let blob = new Blob(byteArrays, { type: contentType });
  //   return blob;
  // }

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
