import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public infoStatusObject = {
    showStatus:false
  }

  constructor() { }

  ngOnInit() {
  }

  infoClick(){
    this.infoStatusObject.showStatus = !this.infoStatusObject.showStatus;
  }
}
