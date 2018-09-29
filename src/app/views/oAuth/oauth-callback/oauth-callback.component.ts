import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OauthCallbackService } from './oauth-callback.service';
import { statusValid } from '../../../utils/status-valid';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss'],
  providers: [OauthCallbackService, MessageService]
})
export class OauthCallbackComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    public service: OauthCallbackService,
    private messageService: MessageService,
    public router: Router,
  ) { }
  code: string;
  state: string;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.code = params['code'];
      this.state = params['state'];
    });
    this.github_callback_action();
  }

  github_callback_action() {
    this.service
      .github_callback(`login/github_callback?code=${this.code}&state=${this.state}`)
      .subscribe(
        res => {
          let { data, openId, token, code } = res;
          if (statusValid(this, code, data)) {
            if (openId) {
              //返回openid说明没有绑定邮箱，跳转到绑定邮箱页面
              this.router.navigate(['/page/bindEmail',openId]);
            } else {
              localStorage.setItem("noteToken", token);
              localStorage.setItem("noteUser", JSON.stringify(data));
              this.router.navigateByUrl('/full/cointer');
            }
          }
        }
      );
  }
}
