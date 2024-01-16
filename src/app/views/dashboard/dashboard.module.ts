import { SharedMaterialModule } from "app/shared/shared-material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { SharedPipesModule } from "app/shared/pipes/shared-pipes.module";
import { DashboardRoutes } from "./dashboard.routing";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { PersonalsComponent } from "./personal/personals.component";
import { ViewPersonalComponent } from './personal/view-personal/view-personal/view-personal.component';
import { UsersComponent } from "./user/users.component";
import { ViewUserComponent } from './user/view-user/view-user/view-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentsComponent } from "./department/departments.component";
import { ViewDepartmentComponent } from "./department/view-department/view-department.component";
import { AddressesComponent } from "./address/addresses.component";
import { ViewAddressComponent } from "./address/view-address/view-address.component";
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    NgChartsModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    SharedPipesModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [AnalyticsComponent,PersonalsComponent, ViewPersonalComponent,UsersComponent, ViewUserComponent,DepartmentsComponent,ViewDepartmentComponent,AddressesComponent,ViewAddressComponent],
  exports: []
})
export class DashboardModule {}
