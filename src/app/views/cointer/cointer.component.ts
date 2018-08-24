import { Component, OnInit } from '@angular/core';
import { ueConfig } from '../../global/ueditor.config.js';

@Component({
  selector: 'app-cointer',
  templateUrl: './cointer.component.html',
  styleUrls: ['./cointer.component.scss']
})
export class CointerComponent implements OnInit {

  public smileStatus = false;
  public content="";
  public config=ueConfig;
  constructor() { }

  ngOnInit() {
  }
  smilClick(){
    this.smileStatus = !this.smileStatus;
  }
}
