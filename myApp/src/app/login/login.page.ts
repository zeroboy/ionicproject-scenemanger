import { Component, OnInit } from '@angular/core';
import {NavController, AlertController, ToastController} from "@ionic/angular";

import { TabsPageModule } from "../tabs/tabs.module";
import {toBase64String} from "@angular/compiler/src/output/source_map";

import { HTTP } from "@ionic-native/http/ngx"
import { Userlist} from "../../providers/userlist/userlist";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, public httpCtrl: HTTP, public AlertCtrl: AlertController, public UserlistCtrl: Userlist) { }

  ngOnInit() {

    this.hasToken();
  }

  /**
   * 判断token 自动登录
   */
  hasToken() {
    let usertoken = localStorage.getItem('usertoken');
    if(usertoken) {
      let usertoken_arr = usertoken.split('|');
      let usernames = usertoken_arr[0];
      let createtimes = usertoken_arr[1];
      // @ts-ignore
      if ((Date.now() - createtimes) / 1000 <= 3600) {//令牌是否存活
        this.navCtrl.navigateForward(['/tabs/tab1'], {
          queryParams: {
            username: usernames
          }
        });
      }
    }
  }

  login(a,b) {
    if (a.value.length == 0) {
      alert("请输入账号");
    } else if (b.value.length == 0) {
      alert("请输入密码");
    } else {
      //let userinfo: string = '用户名：' + a.value + '密码：' + b.value;
      //alert(userinfo);

      //valid
     /*this.httpCtrl.get("../../assets/json/user.json",{},{})
         .then((data) => {
             let userlist = JSON.parse(data.data);
             let valids = userlist.filter((item) => {
                return ((item.username == a.value) && (item.password == b.value))
             });
             console.log(valids);

             if(valids.length == 0){
                 this.presentAlert('账号或密码不正确，请重新输入！');
             }else{
                 //登入
                 localStorage.setItem("usertoken",a.value+ '|'+Date.now());

                 //跳转页面
                 this.navCtrl.navigateForward(['/tabs/tab1'],{
                     queryParams:{
                         username :a.value
                     }
                 });
             }
         })
         .catch((err) => {
            console.log(err)
         });*/

        let userlist = this.UserlistCtrl.getuserlit();

        let valids = userlist.filter((item) => {
            return ((item.username == a.value) && (item.password == b.value))
        });
        console.log(valids);

        if(valids.length == 0){
            this.presentAlert('账号或密码不正确，请重新输入！');
        }else{
            //登入
            localStorage.setItem("usertoken",a.value+ '|'+Date.now());

            //跳转页面
            this.navCtrl.navigateForward(['/tabs/tab1'],{
                queryParams:{
                    username :a.value
                }
            });
        }

    }
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
