import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { MainLayoutComponent } from './shared/components/layouts/main-layout/main-layout.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'main/index',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   redirectTo: 'others/pricing',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./views/main-view/main-view.module').then(m => m.MainViewModule),
        data: { title: 'REHBER'}
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'REHBER'}
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'REHBER', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
        data: { title: 'REHBER', breadcrumb: 'OTHERS'}
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule),
        data: { title: 'REHBER', breadcrumb: 'FORMS'}
      },
      
      {
        path: 'search',
        loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
      },
      
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

