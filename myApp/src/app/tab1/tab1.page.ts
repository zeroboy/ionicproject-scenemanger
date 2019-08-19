import { Component } from '@angular/core';
import {NavController, AlertController} from "@ionic/angular";

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public username_about:String;
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public route:ActivatedRoute
              ) {}

  ngOnInit() {
    //获取路由参数
    this.route.queryParams.subscribe((data) => {
      console.log(data);
      this.username_about = data.username;
    })

  }


}
