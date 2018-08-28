import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  formStatus = 1;  //1登录 2注册
  errMessage = "";
  loginDisabled = true;
  formModel = {
    email: '',
    password: ''
  }
  constructor(
    public router: Router,
    public service: LoginService
  ) { }

  ngOnInit() {
    this.formKeyUp();
  }

  submit() {
    //登录
    if (!this.loginDisabled) {
      if (this.formStatus === 1) {
        // this.router.navigateByUrl('/full/cointer');
        this.service
          .dtlogin(this.formModel)
          .subscribe(
            res => {
              let { data, code, message } = res;
              this.errMessage = message;
              if (code === 200) {
                localStorage.setItem("noteToken", data);
                this.router.navigateByUrl('/full/cointer');
              }
            },
            error => console.error(error)
          );
      } else {
        this.service
          .regist(this.formModel)
          .subscribe(
            res => console.log(res),
            error => console.error(error)
          );
      }
    }
  }

  formKeyUp() {
    if (this.formModel.email && this.formModel.password) {
      this.loginDisabled = false;
    } else {
      this.loginDisabled = true;
    }
  }

  checkStatus(item) {
    this.formStatus = item;
  }
}
