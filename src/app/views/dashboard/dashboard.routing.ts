import { Routes } from "@angular/router";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { PersonalsComponent } from "./personal/personals.component";
import { ViewPersonalComponent } from "./personal/view-personal/view-personal/view-personal.component";
import { UsersComponent } from "./user/users.component";
import { ViewUserComponent } from "./user/view-user/view-user/view-user.component";
import { DepartmentsComponent } from "./department/departments.component";
import { ViewDepartmentComponent } from "./department/view-department/view-department.component";
import { AddressesComponent } from "./address/addresses.component";
import { ViewAddressComponent } from "./address/view-address/view-address.component";


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
    path: "users",
    component: UsersComponent,
    data: { title: 'REHBER', breadcrumb: 'Kullanıcı Listesi'}
  },
  {
    path:'users/:id',
    component:ViewUserComponent,
    data: { title: 'User', breadcrumb: 'Kullanıcı'}
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
  },
  {
    path: "addresses",
    component: AddressesComponent,
    data: { title: 'REHBER', breadcrumb: 'Adres Listesi'}
  },
  {
    path:'addresses/:id',
    component:ViewAddressComponent,
    data: { title: 'Kat', breadcrumb: 'Kat'}
  }
];
