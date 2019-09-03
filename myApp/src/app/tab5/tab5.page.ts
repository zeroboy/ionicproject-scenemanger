import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, ToastController} from "@ionic/angular";
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private cameraPreview: CameraPreview,public AlertCtrl:AlertController) { }
  public picture:String;
  public cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,//屏幕宽
    height: window.screen.height,//屏幕高
    camera: 'rear',//front 前置摄像头 rear 后置摄像头
    tapPhoto: true, //
    previewDrag: true,
    toBack: true,
    alpha: 1
  };
  public pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  };


  ngOnInit() {
  }

  startcamera(){
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
        (res) => {
          this.presentAlert(res)
        },
        (err) => {
          this.presentAlert(err)
        }
        );
  }

  takepictures(){
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.presentAlert('-----takepictures-----');
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.presentAlert(err);
      this.picture = 'assets/img/test.jpg';
    });
  }

  takesnapshot(){
    this.cameraPreview.takeSnapshot(this.pictureOpts).then((imageData) => {
      this.presentAlert('-----takesnapshot-----');
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.presentAlert(err);
      this.picture = 'assets/img/test.jpg';
    });
  }

  //切换摄像头
  switchcameras(){
    this.presentAlert('-----switchcameras-----');
    this.cameraPreview.switchCamera();
  }

  setcoloreffect(){
    this.cameraPreview.setColorEffect('negative');
  }

  //停止相机预览实例
  stopcamera(){
    this.cameraPreview.stopCamera();
  }

  //显示相机预览框
  showcamera(){
    this.cameraPreview.show();
  }

  //隐藏相机预览框
  hidecamera(){
    this.cameraPreview.hide();
  }

  async presentAlert(msg) {
    const alert = await this.AlertCtrl.create({
      header: '提示',
      message: msg,
      buttons: ['确认']
    });

    await alert.present();
  }

}
