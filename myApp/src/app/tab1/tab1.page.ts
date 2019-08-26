import { Component, ViewChild } from '@angular/core';
import {NavController, AlertController, IonInfiniteScroll} from "@ionic/angular";

import { ActivatedRoute } from '@angular/router';

import { HTTP } from "@ionic-native/http/ngx"


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // @ts-ignore
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public username_about:String;
  public datas;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public route:ActivatedRoute,
              public httpCtrl: HTTP
              ) {}

  ngOnInit() {
    //获取路由参数
    this.route.queryParams.subscribe((data) => {
      console.log(data);
      this.username_about = data.username;
    })

    //请求服务器镜头列表接口
    var that = this;
    this.httpCtrl.get('http://scenemanger.zeroboy.cn/api.php/Camera/getlist',{},{})
        .then((data) => {

          let res = JSON.parse(data.data);
          that.datas = res['data'];
          console.log(111111);
          console.log(that.datas);
        })

  }

  // loadData(event) {
  //   setTimeout(() => {
  //     console.log('Done');
  //     event.target.complete();
  //
  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     if (this.datas.length == 1000) {
  //       event.target.disabled = true;
  //     }
  //   }, 500);
  // }
  //
  // toggleInfiniteScroll() {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  // }


}
