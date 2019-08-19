import { Component } from '@angular/core';
import {NavController, AlertController, ToastController  } from "@ionic/angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";


export class AppSqllite {
    database:SQLiteObject;
    constructor(
        public navCtrl: NavController,
        public sqlite: SQLite,
        public alertController: AlertController,
        public toastController: ToastController
    ){};

    /**
     * alert
     * @param title
     * @param msg
     */
    async showAlert(title, msg) {
        const alert = await this.alertController.create({
            header: title,
            message: msg,
            buttons: ['ok']
        });
        await alert.present();
    };

    async showToast(msg, duration) {
        const toast = await this.toastController.create({
            message: msg,
            duration: duration,
            position:'middle'
        });
        toast.present();
    };


    /**
     * 创建数据库
     * @param dbName  库名 - databasename.db
     * @param sqlStatements 创建新表的语句
     */
    initDatabase(dbName, sqlStatements){
         this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            db.executeSql(sqlStatements,[])
                .then(() => {
                    var msg = '创建数据库成功';
                    this.showAlert('提示',msg);
                    this.database=db;
                })
                .catch((err) => {
                    this.showAlert('错误',err.message);
                })
        })
         /*console.log('111');

        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then((db: SQLiteObject) => {

                db.executeSql('create table danceMoves(name VARCHAR(32))', [])
                    .then(() => {
                        var msg = '创建数据库成功';
                        this.showAlert('提示',msg);
                    })
                    .catch(e => {
                        this.showAlert('错误',e.message);
                    });
            })
            .catch(e => {
                this.showAlert('错误',e.message);
            });*/
    };

    /**
     * 新增数据
     * @param sqlStatements insert 语句模板
     * @param val   字段值
     */
    insertIntoItem(sqlStatements, val) {
        this.database.executeSql(sqlStatements, val)
            .then((res) => {
                var str = JSON.stringify(res);
                var msg = '新增数据成功:'+str;
                this.showAlert('提示', msg)
            })
    }

    /**
     * 修改数据
     * @param sqlStatements 语句模板
     * @param val 字段值
     */
    updateItem(sqlStatements, val){
        this.database.executeSql(sqlStatements, val)
            .then((res) => {
                var str = JSON.stringify(res);
                var msg = '修改成功:'+str;
                this.showAlert('提示', msg)
            })
            .catch((err) => {
                this.showAlert('错误', err.message)
            })
    }

    /**
     * 查询数据
     * @param sqlStatements
     * @param val
     */
    queryItem(sqlStatements,val) {
        return new Promise ((resolve , reject) => {
            this.database.executeSql(sqlStatements, val)
                .then(
                    (res) => {
                        var arrList=[];
                        var len=res.rows.length;
                        this.showToast('查询成功', 3000);
                        if(len>0){
                            for(var i=0;i<len;i++){
                                var item = res.rows.item(i);
                                arrList.push(item);
                            }
                            resolve(arrList);
                        }else{
                            var msg="无相应数据";
                            this.showAlert('提示',msg);
                        }
                    })

                .catch(err =>{
                    this.showAlert('错误',err.message);
                    reject(err);
                });
        })
    };

    /**
     * 删除数据
     * @param sqlStatements
     * @param val
     */
    deleteItem(sqlStatements, val){
        this.database.executeSql(sqlStatements,val)
            .then((res) => {
                var str = JSON.stringify(res);
                var msg = "删除成功"+str;
                this.showAlert('提示',msg)
            })
            .catch((err) => {
                this.showAlert('错误',err.message);
            })
    }


}