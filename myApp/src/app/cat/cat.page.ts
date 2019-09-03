import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.page.html',
  styleUrls: ['./cat.page.scss'],
})
export class CatPage implements OnInit {

  constructor(private cameraPreview: CameraPreview) { }
  public previewsrc:string;
  public zoom:number;

  ngOnInit() {
  }

  startCameraAbove(){
    this.cameraPreview.startCamera({x: 50, y: 50, width: 300, height: 300, toBack: false, previewDrag: true, tapPhoto: true});
  }


  startCameraBelow(){
    this.cameraPreview.startCamera({x: 50, y: 50, width: 300, height:300, camera: "front", tapPhoto: true, previewDrag: false, toBack: true});
  }

  stopCamera(){
    this.cameraPreview.stopCamera();
  }

  takePicture(){
    // @ts-ignore
    this.cameraPreview.takePicture((imgData) => {
      this.previewsrc = 'data:image/jpeg;base64,' + imgData;
    });
  }

  switchCamera(){
    this.cameraPreview.switchCamera();
  }

  shows(){
    this.cameraPreview.show();
  }

  hides(){
    this.cameraPreview.hide();
  }

  changeColorEffect(obj){
    var effect = obj.value;
    this.cameraPreview.setColorEffect(effect);
  }

  changeFlashMode(obj){
    var mode = obj.value;
    this.cameraPreview.setFlashMode(mode);
  }

  changeZoom(obj){
    this.zoom = parseInt(obj.value);
    this.cameraPreview.setZoom(this.zoom);
  }


}
