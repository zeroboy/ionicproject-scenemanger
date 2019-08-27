import { Component, ViewChild } from '@angular/core';
import {NavController, AlertController, IonInfiniteScroll} from "@ionic/angular";

import { ActivatedRoute } from '@angular/router';

import { HTTP, } from "@ionic-native/http/ngx"

import {NgxDatatableModule} from '@swimlane/ngx-datatable'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // @ts-ignore
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    public username_about:String;
    // @ts-ignore
    public cameralist = [];
    // @ts-ignore
    public columns = [];

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public route:ActivatedRoute,
              public httpCtrl: HTTP,
              public ngxDataTable: NgxDatatableModule
              ) {
      //this.datas = [{"id":"4","name":"封神榜","place_num":"160011","lens_type":"36","fodder_num":"A058C049","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."},{"id":"5","name":"封神榜","place_num":"160011","lens_type":"36","fodder_num":"A058C049","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."},{"id":"6","name":"封神榜","place_num":"160011","lens_type":"36","fodder_num":"A058C049","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."},{"id":"7","name":"封神榜","place_num":"160011","lens_type":"36","fodder_num":"A058C049","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."},{"id":"8","name":"封神榜","place_num":"160011","lens_type":"36","fodder_num":"A058C049","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."},{"id":"9","name":"封神榜","place_num":"160011","lens_type":"43","fodder_num":"123456","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."},{"id":"10","name":"封神榜","place_num":"160011","lens_type":"36","fodder_num":"A058C049","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."},{"id":"11","name":"封神榜","place_num":"160011","lens_type":"36","fodder_num":"A058C049","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."},{"id":"12","name":"封神榜","place_num":"160011","lens_type":"36","fodder_num":"A058C049","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."},{"id":"13","name":"封神榜","place_num":"160011","lens_type":"36","fodder_num":"A058C049","take_message":"无","add_time":"2019-08-24 21:10:48","lens_make_message":"下方岩壁延伸，中..."}];
      this.fetch((data) => {
          this.cameralist = data;
      });
  }


  ngOnInit() {
    //获取路由参数
    this.route.queryParams.subscribe((data) => {
      console.log(data);
      this.username_about = data.username;
    })

   //
      this.columns = [
          { prop: 'id', name: 'ID', frozenLeft: true },
          { prop: 'name', name: '项目名'},
          { prop: 'place_num', name: '场号' },
          { prop: 'fodder_num', name: '镜头号' },
          { prop: 'lens_type', name: '素材号' },
          { prop: 'take_message', name: 'take信息' },
          { prop: 'lens_make_message', name: '制作镜头信息' },
      ];

      //this.getlist(1);

  }
    ionViewWillEnter() {

    }

  //请求服务器镜头列表接口
  getlist(curr) {
      const options = {
          method: "post",
          data: { curr: curr}
      };
      var that = this;
      var all =  this.cameralist;
      // @ts-ignore
      this.httpCtrl.sendRequest('http://scenemanger.zeroboy.cn/api.php/Camera/getlist',options)
          .then((data) => {

              let res = JSON.parse(data.data);
              for (var i=0;i<res['data'].length;i++){
                  all.push(res['data'][i]);
              }
          });

      that.cameralist = all;
      console.log(222222);
      console.log(that.cameralist);
  }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `http://scenemanger.zeroboy.cn/api.php/Camera/getlist`);

        req.onload = () => {
            let data = JSON.parse(req.response);
            let all = data['data'];
            console.log(all);
            cb(all);
        };

        req.send();
    }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      var nowlwn = this.cameralist.length;
      var curr = parseInt(String(nowlwn / 10));

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (nowlwn % 10 != 0) {
        event.target.disabled = true;
      }else{
          this.getlist(curr);
      }
    }, 2000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


}
