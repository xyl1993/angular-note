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
  submitStatus = false;
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
    this.formKeyUp(this);
  }
  entryClick(e) {
    console.log(e);
  }
  submit() {
    if (!this.submitStatus) {
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
      setTimeout(()=>{
        this.submitStatus = false;
      },2000);
    }
  }

  formKeyUp(event) {
    if(event && event.keyCode === 13){
      this.submit();
    }else{
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
}
