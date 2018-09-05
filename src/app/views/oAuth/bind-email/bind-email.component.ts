import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BindEmailService } from './bind-email.service';

@Component({
  selector: 'app-bind-email',
  templateUrl: './bind-email.component.html',
  styleUrls: [ '../../login/login.component.scss','./bind-email.component.scss'],
  providers: [BindEmailService]
})
export class BindEmailComponent implements OnInit {

  submitStatus: boolean = false;
  errMessage: string;
  email: string;
  disabledStatus: boolean = true;
  openId:string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BindEmailService,
    private router:Router
  ) { }

  ngOnInit() {
    this.openId = this.activatedRoute.snapshot.params['openId'];
  }
  formKeyUp(event) {
    if (event && event.keyCode === 13) {
      this.submit();
    } else {
      if (this.email) {
        this.disabledStatus = false;
      } else {
        this.disabledStatus = true;
      }
    }
  }
  submit() {
    if (!this.submitStatus) {
      this.submitStatus = true;
      //登录
      if (!this.disabledStatus) {
        let pdata = {
          email:this.email,
          openId:this.openId
        }
        this.service
          .bindEmail(pdata)
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
      setTimeout(() => {
        this.submitStatus = false;
      }, 2000);
    }
  }
}
