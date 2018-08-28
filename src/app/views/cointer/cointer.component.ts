import { Component, OnInit } from '@angular/core';
import { ueConfig } from '../../global/ueditor.config';
import { CointerService } from './cointer.service';
import { MessageService } from 'primeng/api';
import { statusValid } from '../../utils/status-valid';
@Component({
  selector: 'app-cointer',
  templateUrl: './cointer.component.html',
  styleUrls: ['./cointer.component.scss'],
  providers: [MessageService, CointerService]
})
export class CointerComponent implements OnInit {

  public smileStatus = false;
  public content = "";
  public config = ueConfig;
  public editStatus = true;
  public formModel = {
    title: '测试',
    content: '',
    tag: [],
    file: ''
  }
  constructor(
    public service: CointerService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }
  smilClick() {
    this.smileStatus = !this.smileStatus;
  }
  editBtnClick() {

    if (this.editStatus) {
      //编辑状态下保存文章
      let pdata = JSON.stringify(this.formModel);
      this.service.addNote(pdata).subscribe(
        res => {
          let { data, code, message } = res;
          if (statusValid(this, code, message)) {
            console.log(123);
          }
        }
      );
    } else {
      this.editStatus = true;
    }
  }
}
