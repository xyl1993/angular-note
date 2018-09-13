# AngularApp

此项目为笔记客户端，服务端地址：https://github.com/xyl1993/angular-note-server
项目地址：http://47.98.243.170:3001

>1、npm install -g @angular/cli

>2、npm install

>3、npm start

常用命令：
  angular-cli提供的常用命令

  >ng generate class my-new-class // 新建 class 
  
  >ng generate component my-new-component // 新建组件

  >ng generate directive my-new-directive // 新建指令 

  >ng generate enum my-new-enum // 新建枚举 

  >ng generate module my-new-module // 新建模块 

  >ng generate pipe my-new-pipe // 新建管道 

  >ng generate service my-new-service // 新建服务


  简写方式:

  >ng g cl my-new-class // 新建 class 

  >ng g c my-new-component // 新建组件 

  >ng g d my-new-directive // 新建指令 

  >ng g e my-new-enum // 新建枚举 

  >ng g m my-new-module // 新建模块 

  >ng g p my-new-pipe // 新建管道 

  >ng g s my-new-service // 新建服务

第一个富文本选择了某大神封装的ueditor插件
#ngx-neditor https://github.com/notadd/ngx-neditor
后来改为 quill-editor 

#项目打包 

ng build --prod --build-optimizer --aot

>将打包后dist/angular-app/下的文件复制到server端的public中
