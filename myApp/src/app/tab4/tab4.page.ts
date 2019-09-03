import { Component } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";

// @ts-ignore
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  currentImage: any;
  constructor(public navCtrl: NavController, private camera: Camera) {}
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      //相片质量0-100
      destinationType: this.camera.DestinationType.DATA_URL,
      //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
      encodingType: this.camera.EncodingType.JPEG,
      //保存的图片格式： JPEG = 0, PNG = 1
      allowEdit: false,
      //在选择之前允许修改截图
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: 0,
      //枪后摄像头类型：Back= 0,Front-facing = 1
      saveToPhotoAlbum: true  //保存进手机相册
    }

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }
}
