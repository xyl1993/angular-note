import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  infoStatusObject = {
    showStatus:false,  //是否显示弹窗
    index:1           //近期消息
  }

  userStatus = false;

  newsInfoList=[];

  constructor() { }

  ngOnInit() {
  }

  infoClick(){
    this.userStatus = this.userStatus && false;
    this.infoStatusObject.showStatus = !this.infoStatusObject.showStatus;
  }

  userClick(){
    this.infoStatusObject.showStatus = this.infoStatusObject.showStatus && false;
    this.userStatus = !this.userStatus;
  }

  newsClick(index){
    this.infoStatusObject.index = index;
  }
}
