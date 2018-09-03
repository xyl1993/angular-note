import { Component, OnInit } from '@angular/core';
import { ueConfig } from '../../global/ueditor.config';
import { Router } from '@angular/router';
import { CointerService } from './cointer.service';
import { MessageService } from 'primeng/api';
import { statusValid } from '../../utils/status-valid';
import { window } from 'rxjs/operators';
import {WindowRef} from '../../global/windowRef.service';


@Component({
  selector: 'app-cointer',
  templateUrl: './cointer.component.html',
  styleUrls: ['./cointer.component.scss'],
  providers: [MessageService, CointerService,WindowRef]
})
export class CointerComponent implements OnInit {

  private primitiveNoteInfo = {
    _id: '',
    title: '',
    content: '',
    tag: [],
    create_time: '',
    preview_content: '',
    file: ''
  };
  public seleventIndex = 1; //默认加载最近日记
  public keyword = '';
  public selNoteInfo = {
    index: 0
  };  //文章列表选择索引值
  public smileStatus = false;   //左边部分是否缩小状态
  public ueConfig = ueConfig;  //editor配置
  public editStatus = false;    //文章是新建还是修改
  public noteList = [];     //标题列表list
  nativeWindow: any;
  constructor(
    private router: Router,
    private service: CointerService,
    private messageService: MessageService,
    private windowRef: WindowRef
  ) { 
    this.nativeWindow = windowRef.getNativeWindow();
  }

  ngOnInit() {
    this.selNoteList(-1);
  }
  smilClick() {
    this.smileStatus = !this.smileStatus;
  }
  /**
   * 加载笔记列表
   */
  selNoteList(seleventIndex?) {
    if (seleventIndex !== this.seleventIndex) {
      this.seleventIndex = seleventIndex === -1 ? 1 : seleventIndex;
      let pdata = {
        status: this.seleventIndex === 4 ? 0 : this.seleventIndex,
        keyword: this.keyword
      };
      this.service.selNoteList(pdata).subscribe(
        res => {
          let { data, code, message } = res;
          if (statusValid(this, code, message)) {
            this.noteList = data;
            if (data.length > 0) {
              //如果是首次加载 获取对应的详情
              this.selNoteInfo.index = 0;
              this.selNoteDetail(data[0]._id);
            }
          }
        }
      );
    }
  }
  /**
   * 笔记列表点击事件
   * @param item 
   * @param index 
   */
  selNoteItem(item, index) {
    this.selNoteInfo.index = index;
    this.editStatus = false;
    //查询详情
    this.selNoteDetail(item._id);
  }
  /**
   * 
   * @param _id 查看详情
   */
  selNoteDetail(_id) {
    this.service.selNoteDetail({ _id: _id }).subscribe(
      res => {
        let { data, code, message } = res;
        if (statusValid(this, code, message)) {
          console.log(data);
          this.primitiveNoteInfo = data;
        }
      }
    );
  }
  /**
   * 点击编辑按钮
   */
  editBtnClick(status) {
    if (status === 2) {
      //点击编辑
      //编辑状态下保存文章
      let pdata = Object.assign(this.primitiveNoteInfo, {});
      pdata.preview_content = this.primitiveNoteInfo.content ?
        this.primitiveNoteInfo.content.replace(/<[^>]*>/g, "").substring(0, 31) : '';
      this.service.editNote(pdata).subscribe(
        res => {
          let { data, code, message } = res;
          if (statusValid(this, code, message)) {
            this.noteList[this.selNoteInfo.index] = pdata;
            this.messageService.add({ severity: 'success', summary: '提示', detail: '保存成功' });
            this.editStatus = false;
          }
        }
      );
    } else {
      this.editStatus = true;
    }
  }

  /**
   * 创建笔记
   */
  createNewNote() {
    let note = {
      title: '新笔记'
    }
    //向后台请求插入记录
    this.service.addNote(note).subscribe(
      res => {
        let { data, code, message } = res;
        if (statusValid(this, code, message)) {
          let shiftData = Object.assign({}, data);
          this.noteList.unshift(shiftData);
          this.selNoteInfo.index = 0;
          this.primitiveNoteInfo = data;
        }
      }
    );
  }
  /**
   * 打开文章
   */
  sharNewWindows(){
    this.nativeWindow.open('http://localhost:3001/article?_id=kLqwRldy');
  }
}
