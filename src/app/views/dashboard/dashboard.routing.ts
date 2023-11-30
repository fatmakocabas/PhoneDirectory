import { Routes } from "@angular/router";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { PersonalsComponent } from "./personal/personals.component";
import { ViewPersonalComponent } from "./personal/view-personal/view-personal/view-personal.component";
import { DepartmentsComponent } from "./department/departments.component";
import { ViewDepartmentComponent } from "./department/view-department/view-department.component";


export const DashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'personals',
    pathMatch: 'full'
  },
  {
    path: "analytics",
    component: AnalyticsComponent,
    data: { title: 'Analytics', breadcrumb: 'Analytics'}
  },
  {
    path: "personals",
    component: PersonalsComponent,
    data: { title: 'REHBER', breadcrumb: 'Personel Listesi'}
  },
  {
    path:'personals/:id',
    component:ViewPersonalComponent,
    data: { title: 'Personel', breadcrumb: 'Personel'}
  },
  {
    path: "departments",
    component: DepartmentsComponent,
    data: { title: 'REHBER', breadcrumb: 'Müdürlük Listesi'}
  },
  {
    path:'departments/:id',
    component:ViewDepartmentComponent,
    data: { title: 'Müdürlük', breadcrumb: 'Müdürlük'}
  }
];
