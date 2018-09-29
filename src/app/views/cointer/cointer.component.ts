import { Component, OnInit } from '@angular/core';
import { ueConfig } from '../../global/ueditor.config';
import { Router } from '@angular/router';
import { CointerService } from './cointer.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { statusValid } from '../../utils/status-valid';
import { WindowRef } from '../../global/windowRef.service';
import { apiConfig } from '../../global/apiConfig';

@Component({
  selector: 'app-cointer',
  templateUrl: './cointer.component.html',
  styleUrls: ['./cointer.component.scss'],
  providers: [MessageService, CointerService, WindowRef, ConfirmationService]
})
export class CointerComponent implements OnInit {

  public statusPop = {
    noteLoading: true
  }

  public primitiveNoteInfo = {
    _id: '',
    title: '',
    content: '',
    tag: [],
    createdAt: '',
    previewContent: '',
    nikeName: '',
    updatedAt: '',
    file: ''
  };
  public seleventIndex = 1; //默认加载最近日记
  public keyword = '';
  public selNoteInfo = {
    index: 0
  };  //文章列表选择索引值
  public smileStatus = false;   //左边部分是否缩小状态
  public infoStatus = false;     //是否显示信息框
  public ueConfig = ueConfig;  //editor配置
  public editStatus = false;    //文章是新建还是修改
  public noteList = [];     //标题列表list
  public menuTitle = '近期笔记';   //标题
  public sortInfo = {
    shown: false,
    type: 1,
    status: 'desc',
    list: [
      {
        active: true,
        type: 1,    //按照创建日期排序
        name: '创建日期',
        status: 'desc'       //倒叙
      },
      {
        active: false,
        type: 2,    //按照修改日期排序
        name: '修改日期',
        status: 'desc'       //倒叙
      },
      {
        active: false,
        type: 3,    //按照标题排序
        name: '标题',
        status: 'desc'       //倒叙
      }
    ]
  }
  public nativeWindow: any;
  public editor;
  constructor(
    private router: Router,
    private service: CointerService,
    private messageService: MessageService,
    private windowRef: WindowRef,
    private confirmationService: ConfirmationService
  ) {
    this.nativeWindow = windowRef.getNativeWindow();
    console.log(this.nativeWindow);
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
  selNoteList(seleventIndex, sortStatys?) {
    if (sortStatys || seleventIndex !== this.seleventIndex) {
      this.seleventIndex = seleventIndex === -1 ? 1 : seleventIndex;
      this.menuTitle = {
        1: '近期笔记',
        2: '我的分享',
        4: '回收站'
      }[this.seleventIndex];
      let pdata = {
        status: this.seleventIndex === 4 ? 0 : this.seleventIndex,
        keyword: this.keyword,
        sortStatus: this.sortInfo.status,
        sortType: this.sortInfo.type
      };
      this.service.selNoteList(pdata).subscribe(
        res => {
          let { data, code } = res;
          console.log(res);
          if (statusValid(this, code, data)) {
            this.noteList = data;
            if (data.length > 0) {
              //如果是首次加载 获取对应的详情
              this.selNoteInfo.index = 0;
              this.selNoteDetail(data[0]._id);
            } else {
              this.primitiveNoteInfo = {
                _id: '',
                title: '',
                nikeName: '',
                content: '',
                tag: [],
                createdAt: '',
                previewContent: '',
                file: '',
                updatedAt: '',
              }
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
    this.statusPop.noteLoading = true;
    this.service.selNoteDetail({ _id: _id }).subscribe(
      res => {
        let { data, code } = res;
        if (statusValid(this, code, data)) {
          this.primitiveNoteInfo = data;
          this.statusPop.noteLoading = false;
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
      pdata.previewContent = this.primitiveNoteInfo.content ?
        this.primitiveNoteInfo.content.replace(/<[^>]*>/g, "").substring(0, 60) : '';
      // pdata.content = this.htmlEncodeByRegExp(pdata.content);   //保存转码
      this.service.editNote(pdata).subscribe(
        res => {
          let { data, code } = res;
          if (statusValid(this, code, data)) {
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
        let { data, code } = res;
        if (statusValid(this, code, data)) {
          let shiftData = Object.assign({}, data);
          this.noteList.unshift(shiftData);
          this.selNoteInfo.index = 0;
          this.primitiveNoteInfo = data;
          this.editStatus = true;
        }
      }
    );
  }
  /**
   * 打开文章
   */
  sharNewWindows() {
    if (this.primitiveNoteInfo._id) {
      this.nativeWindow.open(`${apiConfig.server_ip}/article?_id=${this.primitiveNoteInfo._id}`);
    }
  }
  updateData() {
    //删除成功后移除数组里面的数据
    this.noteList.splice(this.selNoteInfo.index, 1);
    let activeData = {
      _id: ''
    };
    if (this.noteList[this.selNoteInfo.index]) {
      activeData = this.noteList[this.selNoteInfo.index];
    } else if (this.noteList[this.selNoteInfo.index - 1]) {
      this.selNoteInfo.index = this.selNoteInfo.index - 1;
      activeData = this.noteList[this.selNoteInfo.index];
    }
    if (activeData._id) {
      this.selNoteDetail(activeData._id);
    }
  }
  /**
   * 删除文章
   */
  logicDelete() {
    if (this.primitiveNoteInfo._id) {
      this.confirmationService.confirm({
        message: '确认删除吗?',
        accept: () => {
          let pdata = {
            _id: this.primitiveNoteInfo._id
          }
          if (this.seleventIndex === 1) {
            //逻辑删除
            this.service.logicDelete(pdata).subscribe(
              res => {
                let { data, code } = res;
                if (statusValid(this, code, data)) {
                  this.updateData();
                }
              }
            )
          } else if (this.seleventIndex === 4) {
            //物理删除
            this.service.physicsDelete(pdata).subscribe(
              res => {
                let { data, code } = res;
                if (statusValid(this, code, data)) {
                  this.updateData();
                }
              }
            )
          }
        }
      });
    }
  }
  showInfo() {
    console.log(1);
    if (this.primitiveNoteInfo._id) {
      this.infoStatus = !this.infoStatus;
    } else {
      this.infoStatus = false;
    }
  }
  /**
   * 恢复文章
   */
  recovery() {
    let pdata = {
      _id: this.primitiveNoteInfo._id
    }
    this.service.recovery(pdata).subscribe(
      res => {
        let { data, code } = res;
        if (statusValid(this, code, data)) {
          this.updateData();
        }
      }
    )
  }
  showSortInfo() {
    this.sortInfo.shown = !this.sortInfo.shown;
  }
  inSort(selItem) {
    this.sortInfo.list.forEach((item, i) => {
      if (item.type === selItem.type) {
        console.log(1);
        if (item.active === selItem.active) {
          //如果已经点击再点击更改排序状态
          item.status === 'desc' ? item.status = 'asc' : item.status = 'desc';
        }
        this.sortInfo.status = item.status;
        this.sortInfo.type = item.type;
        //请求
        this.selNoteList(this.seleventIndex, true);
        item.active = true;
      } else {
        item.active = false;
      }
    });
  }
  EditorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }
  imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {
      const file = Imageinput.files[0];
      const data: FormData = new FormData();
      data.append('file', file, file.name);
      this.service.upload(data).subscribe(
        res => {
          let { data, code } = res;
          if (statusValid(this, code, data)) {
            const range = this.editor.getSelection(true);
            const index = range.index + range.length;
            this.editor.insertEmbed(range.index, 'image', data.url);
          }
        }
      )
    });
    Imageinput.click();
  }
  /*用正则表达式实现html转码*/
  htmlEncodeByRegExp(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n"/g, "");
    s = s.replace(/\r"/g, "");
    return s;
  }
  /*用正则表达式实现html解码*/
  htmlDecodeByRegExp(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    return s;
  }

}
