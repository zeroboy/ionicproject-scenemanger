import { Component } from '@angular/core';
import {NavController, AlertController, ToastController} from "@ionic/angular";

import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { AppSqllite } from "../../providers/app-sqllite/app-sqllite"

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public database:SQLiteObject;
  public user;
  public userList;
  public dataObj;
  public str;
  public email;
  public dbName;

  constructor(
      public navCtrl: NavController,
      public alertCtrl: AlertController,
      public toastCtrl: ToastController,
      public sqliteService: AppSqllite
  ){
    this.dbName = "user.db";
    this.userList = [];
    this.dataObj = {};
    this.str = '';
    this.user = {};
  };

  ngOnInit() {
        var sqlStatments= `CREATE TABLE IF NOT EXISTS \`users\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`email\` varchar(32) NOT NULL,
      \`username\` varchar(16) NOT NULL,
      \`password\` varchar(30) DEFAULT NULL,
      \`age\` int(11) DEFAULT NULL,
      PRIMARY KEY (\`id\`)
    ) `;

    this.sqliteService.initDatabase(this.dbName, sqlStatments)
  }

  /**
   * 查询
   */
  queryUser() {
    var sqlStatments = 'select * from users';
    this.userList.length = 0;
    this.sqliteService.queryItem(sqlStatments, []).then((res) => {
      this.userList = res;
    })
  }

  /**
   * 删除
   * @param obj
   */
  deleteUser(obj) {
    var sqlStatments = 'delete from users where email=?';
    this.sqliteService.deleteItem(sqlStatments, obj.id);
    this.queryUser()
  }

  /**
   * 添加
   */
  async showAddPrompt() {
    const prompt = await this.alertCtrl.create({
      header: '添加项目',
      inputs:[
        {
          name: 'email',
          type: 'text',
          placeholder: '请输入邮箱'
        },
        {
          name: 'username',
          type: 'text',
          placeholder: '请输入用户名'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: '请输入密码'
        },
        {
          name: 'age',
          type: 'text',
          placeholder: '请输入年龄'
        },
      ],
      buttons:[
        {
          text: '取消',
          role: '取消',
          handler: () => {
            console.log('选择取消');
          }
        },
        {
          text: '确定',
          handler: (data) => {
            console.log(data);
            var str = '';
            if((data['username'].trim() == '') || (data['password'].trim() == '')|| (data['age'].trim() == '')){
              console.log('填写信息不完整');
              return false;
            }else{
              var sqlStatements = 'INSERT INTO users VALUES(NULL,?,?,?,?)';
              this.sqliteService.insertIntoItem(sqlStatements,[
                  data['email'],
                  data['username'],
                  data['password'],
                  data['age']
              ])
            }
          }
        }
      ],
    });
    prompt.present();
  }

  updateUser(obj) {

  }
}
