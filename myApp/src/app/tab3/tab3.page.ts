import { Component } from '@angular/core';
import {test} from '@angular-devkit/core/src/virtual-fs/host';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  public  item = 'http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg' ;
  public  videosrc:String = '';

  test() {
    console.log('---test------');
    const constraints = {
      audio: true,
      video: {
        width: 400,
        height: 600
      }
    };
    console.log('---constraints------');
    console.log(constraints);
    //navigator 对象可以获取 设备的硬件
    console.log(navigator);
    console.log(typeof navigator);
    console.log('---mediaDevices-typeof------');
    console.log(typeof navigator.mediaDevices);
    console.log('---mediaDevices------');
    console.log(navigator.mediaDevices);
    /*const promise = navigator.mediaDevices.getUserMedia(constraints);
    console.log('---promise------');
    console.log(promise);
    promise.then((MediaStream)  => {
      console.log('-------into-------');
      /!* 使用这个MediaStream *!/
      console.log(typeof (MediaStream));
      console.log(MediaStream); // 对象
      console.log(MediaStream); // 对象
      let srcs =  window.URL.createObjectURL(MediaStream);
      // const video = document.querySelector('video');
      // video.src =
      this.videosrc = srcs;
    }) .catch( (err)  => {
      /!* 处理error *!/
      console.log(err); // 拒签
      console.log(err.message); // 拒签
    });*/


  }
}
