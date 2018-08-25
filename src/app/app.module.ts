import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNeditorModule } from '@notadd/ngx-neditor';
import { HttpModule } from '@angular/http';
import { ApiService } from './utils/api';
import { LoginService } from './views/login/login.service';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from './containers/full-layout/full-layout.component';
import { SimpleLayoutComponent } from './containers/simple-layout/simple-layout.component';
import { NewsComponent } from './views/news/news.component';
import { HeaderComponent } from './components/header/header.component';
import { CointerComponent } from './views/cointer/cointer.component';
import { LoginComponent } from './views/login/login.component';

const appRoutes = [
  { path: '', redirectTo: 'full/cointer', pathMatch: 'full' }, //路径为空
  {
    path: 'full',
    component: FullLayoutComponent,
    children: [
      {
        path: 'news',
        component: NewsComponent,
        name: '消息中心'
      },
      {
        path: 'cointer',
        component: CointerComponent,
        name: '主页'
      }
    ]
  },
  {
    path: 'page',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        name: '登录'
      }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NewsComponent,
    CointerComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgxNeditorModule
  ],
  exports: [],
  providers: [
    ApiService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
