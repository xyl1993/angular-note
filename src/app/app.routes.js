import { FullLayoutComponent } from './containers/full-layout/full-layout.component';
import { NewsComponent } from './views/news/news.component';
export const appRoutes = [
  { path: '', redirectTo : 'full',pathMatch:'full' }, //路径为空
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
