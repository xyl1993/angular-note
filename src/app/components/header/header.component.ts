import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('infoState', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {

  infoStatusObject = {
    showStatus: false,  //是否显示弹窗
    index: 1           //近期消息
  }

  userStatus = false;

  newsInfoList = [];

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  infoClick() {
    this.userStatus = this.userStatus && false;
    this.infoStatusObject.showStatus = !this.infoStatusObject.showStatus;
  }

  userClick() {
    this.infoStatusObject.showStatus = this.infoStatusObject.showStatus && false;
    this.userStatus = !this.userStatus;
  }

  newsClick(index) {
    this.infoStatusObject.index = index;
  }

  loginOut(){
    this.router.navigateByUrl('/page/login');
  }
}
