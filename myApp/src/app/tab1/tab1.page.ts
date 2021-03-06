import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavController, AlertController, IonInfiniteScroll} from "@ionic/angular";

import { ActivatedRoute } from '@angular/router';

import { HTTP, } from "@ionic-native/http/ngx"

import {NgxDatatableModule} from '@swimlane/ngx-datatable'

import { Observable } from 'rxjs';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: [
        'tab1.page.scss',
        'material.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class Tab1Page {
    // @ts-ignore
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    rows: Observable<any[]>;
    public subscriberObj;
    public pagination: any = {
        "totalResults": 0,
        "currentPage": 1,
        "pageSize": 10
    };
    public cameralist: any = [];
    public username_about:String;

    columns = [
        { prop: 'id', name: 'ID', frozenLeft: true , width:50},
        { prop: 'name', name: '项目名', width:50},
        { prop: 'place_num', name: '场号' ,width:50},
        { prop: 'fodder_num', name: '镜头号' ,width:50},
        { prop: 'lens_type', name: '素材号', width:50 },
        { prop: 'take_message', name: 'take信息', width:80},
        { prop: 'lens_make_message', name: '制作镜头信息', width:120},
    ];
    public loadingIndicator: boolean = true;

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public route:ActivatedRoute,
                public httpCtrl: HTTP,
                public ngxDataTable: NgxDatatableModule
    ) {
        //初始化首页数据流
        this.rows = Observable.create((subscriber) => {
            this.getlist(1,(data) => {
                console.log('start....');
                console.log(data);
                this.cameralist = data;
                subscriber.next(this.cameralist);
                //subscriber.next(data.splice(15, 30));
                //subscriber.complete();
                this.subscriberObj = subscriber;

                //加载条结束显示
                setTimeout(() => {
                    this.loadingIndicator = false;
                },2000)

            });
        });

        // Rx.DOM.ajax({ url: '/products', responseType: 'json'}).subscribe()
        // this.rows = Observable.from(rows);
    }

    ngOnInit(){
        //获取路由参数
        this.route.queryParams.subscribe((data) => {
            console.log(data);
            this.username_about = data.username;
        })

    }

    /*fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `http://scenemanger.zeroboy.cn/api.php/Camera/getlist`);

        req.onload = () => {
            let data = JSON.parse(req.response);
            let all = data['data'];
            console.log(all);
            cb(all);
        };

        req.send();
    }*/

    /**
     * //请求服务器镜头列表接口
     * @param curr 当前页
     * @param cb   数据流回调
     */
    getlist(curr,cb) {
        const options = {
            method: "post",
            data: { curr: curr}
        };
        var that = this;
        //var all =  this.cameralist;
        // @ts-ignore
        this.httpCtrl.sendRequest('http://scenemanger.zeroboy.cn/api.php/Camera/getlist',options)
            .then((data) => {

                let res = JSON.parse(data.data);
                let all = res['data'];
                this.pagination.totalResults += res['data'].length;
                this.pagination.currentPage = parseInt(String(this.pagination.totalResults / this.pagination.pageSize));
                cb(all);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    /**
     * //分页刷新
     * @param event 下拉对象
     */
    loadData(event) {
        setTimeout(() => {
            console.log('Done');
            event.target.complete();

            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (this.pagination.totalResults % this.pagination.pageSize != 0) {
                event.target.disabled = true;
                return;
            }
            let curr = (this.pagination.totalResults == 0)?1:(this.pagination.currentPage+1);
            //let subscriberObj = this.subscriberObj;
            this.getlist(curr ,(data) => {
                console.log('loadData....');
                console.log(data);
                this.cameralist = this.cameralist.concat(data);
                console.log('cameralist');
                console.log(this.cameralist);
                this.subscriberObj.next(this.cameralist);
                console.log(this.subscriberObj);
            });
        }, 500);
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }

    getCellClass({ row, column, value }): any {
        return {
            'ngx-tab-field': true
        };
    }


}
