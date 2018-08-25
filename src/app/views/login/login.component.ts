import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formStatus = 1;  //1登录 2注册

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
      let data = this.formModel;
      if (this.formStatus === 1) {
        // this.router.navigateByUrl('/full/cointer');
        this.service
          .dtlogin(data)
          .subscribe(
            data => {
              localStorage.setItem('token',data.token)
            },
            error => console.error(error)
          );
      } else {
        this.service
          .regist(data)
          .subscribe(
            data => console.log(data),
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
