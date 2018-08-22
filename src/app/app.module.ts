import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from './containers/full-layout/full-layout.component';
import { SimpleLayoutComponent } from './containers/simple-layout/simple-layout.component';
import { NewsComponent } from './views/news/news.component';
import { HeaderComponent } from './components/header/header.component';

const appRoutes = [
  { path: '', redirectTo: 'full', pathMatch: 'full' }, //路径为空
  {
    path: 'full',
    component: FullLayoutComponent,
    children: [
      {
        path: 'news',
        component: NewsComponent,
        name: '消息中心'
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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
