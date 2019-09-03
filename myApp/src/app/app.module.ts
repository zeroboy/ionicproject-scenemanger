import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { Camera } from '@ionic-native/camera/ngx';

import { SQLite } from "@ionic-native/sqlite/ngx";

import { AppSqllite } from "../providers/app-sqllite/app-sqllite"

import { LoginPage } from "./login/login.page";
import {TabsPageModule} from "./tabs/tabs.module";
import {Tab1PageModule} from "./tab1/tab1.module";
import {Tab2PageModule} from "./tab2/tab2.module";
import {Tab4PageModule} from "./tab4/tab4.module";
import {Tab5PageModule} from "./tab5/tab5.module";
import {CatPageModule} from "./cat/cat.module";
import { Userlist} from "../providers/userlist/userlist";

import { HTTP } from "@ionic-native/http/ngx"
import {NgxDatatableModule} from '@swimlane/ngx-datatable'

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      TabsPageModule,
      Tab1PageModule,
      Tab2PageModule,
      Tab4PageModule,
      Tab5PageModule,
      CatPageModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SQLite,
    AppSqllite,
    LoginPage,
    HTTP,
    Userlist,
    NgxDatatableModule,
      CameraPreview,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
