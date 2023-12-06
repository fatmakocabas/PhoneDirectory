/* 
  Only Required if you want to use Angular Landing
  (https://themeforest.net/item/angular-landing-material-design-angular-app-landing-page/21198258)
*/
import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Personal } from "../models/personal.model";
import { Department } from "../models/department.model";
import { DepartmentSection } from "../models/departmentSection.model";
import { DepartmentRequest } from "../models/DepartmentRequest";
const API_URL = "api/department";
@Injectable()
export class DepartmentService {
  constructor(public http: HttpClient) {}

  allDepartments(): Observable<Department[]> {
    var url = API_URL + "/getAllDepartments";
    return this.http.get<Department[]>(url);
  }
  allSections(): Observable<DepartmentSection[]> {
    var url = API_URL + "/getAllSections";
    return this.http.get<DepartmentSection[]>(url);
  }

  getDepartment(departmentId: string | null): Observable<Department> {
    var url = API_URL + "/departments/";
    return this.http.get<Department>(url + departmentId);
  }

  updateDepartment(
    departmentId: string,
    departmentRequest: DepartmentRequest
  ): Observable<Department> {
    var url = API_URL + "/departments/";
    return this.http.put<Department>(url + departmentId, departmentRequest);
  }
  addDepartment(departmentRequest: DepartmentRequest): Observable<Department> {
    var url = API_URL + "/departments/";
    return this.http.post<Department>(url + "add", departmentRequest);
  }
  deleteDepartment(departmentId:string): Observable<Department>{
    return this.http.delete<Department>(API_URL+'/departments/'+departmentId);
  }
}
