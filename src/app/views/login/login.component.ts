import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { WindowRef } from '../../global/windowRef.service';
import { apiConfig } from '../../global/apiConfig';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService, WindowRef]
})
export class LoginComponent implements OnInit {
  submitStatus = false;
  formStatus = 1;  //1登录 2注册
  errMessage = "";
  loginDisabled = true;
  formModel = {
    email: '',
    password: ''
  }
  nativeWindow: any;
  constructor(
    public router: Router,
    public service: LoginService,
    private windowRef: WindowRef,
  ) {
    this.nativeWindow = windowRef.getNativeWindow();
  }

  ngOnInit() {
    this.formKeyUp(this);
  }
  entryClick(e) {
    console.log(e);
  }

  checkEmail(value) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if (reg.test(value)) {
      return true
    }else{
      return false
    }
    
  }
  submit() {
    if (!this.submitStatus) {
      if (this.checkEmail(this.formModel.email)) {
        this.submitStatus = true;
        //登录
        if (!this.loginDisabled) {
          if (this.formStatus === 1) {
            this.service
              .dtlogin(this.formModel)
              .subscribe(
                res => {
                  let { data, token, code, message } = res;
                  this.errMessage = message;
                  this.errMessage = message;
                  if (code === 200) {
                    localStorage.setItem("noteToken", token);
                    localStorage.setItem("noteUser", JSON.stringify(data));
                    this.router.navigateByUrl('/full/cointer');
                  }
                }
              );
          } else {
            this.service
              .regist(this.formModel)
              .subscribe(
                res => {
                  let { data, token, code, message } = res;
                  this.errMessage = message;
                  if (code === 200) {
                    localStorage.setItem("noteToken", token);
                    localStorage.setItem("noteUser", JSON.stringify(data));
                    this.router.navigateByUrl('/full/cointer');
                  }
                }
              );
          }
        }
        setTimeout(() => {
          this.submitStatus = false;
        }, 2000);
      } else {
        this.errMessage = '请输入正确的邮箱'
      }
    }
  }

  formKeyUp(event) {
    if (event && event.keyCode === 13) {
      this.submit();
    } else {
      if (this.formModel.email && this.formModel.password) {
        this.loginDisabled = false;
      } else {
        this.loginDisabled = true;
      }
    }
  }

  checkStatus(item) {
    this.formStatus = item;
  }

  /**
   * 第三方登录
   * @param type 
   */
  oAuthLogin(type) {
    if (type === 'github') {
      // this.nativeWindow.localtion.href = 
      let win = this.nativeWindow;
      win.location.href = `${apiConfig.server_ip}/oAuth/github`;
    }
  }
}
