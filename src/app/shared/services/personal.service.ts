/* 
  Only Required if you want to use Angular Landing
  (https://themeforest.net/item/angular-landing-material-design-angular-app-landing-page/21198258)
*/
import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Personal } from "../models/personal.model";
import { PersonalRequest } from "../models/PersonalRequest";
const API_URL = "api/personel";

@Injectable()
export class PersonalService {
  constructor(public http: HttpClient) {}

  private baseApiUrl = '/';

  allPersonels(): Observable<Personal[]> {
    var url = API_URL + "/getAllPersonels";
    return this.http.get<Personal[]>(url);
  }

  getPersonal(personalId: string | null): Observable<Personal> {
    var url = API_URL + "/personals/";
    return this.http.get<Personal>(url + personalId);
  }

  getImagePath(relativePath: string) {
   // var url = API_URL + "/personals/";
    debugger
    return this.baseApiUrl + `${relativePath}`;
  }

  updatePersonal(
    personalId: string,
    personalRequest: PersonalRequest
  ): Observable<Personal> {
    var url = API_URL + "/personals/";
    return this.http.put<Personal>(url + personalId, personalRequest);
  }
  addPersonal( personalRequest: PersonalRequest): Observable<Personal>{
    var url = API_URL + "/personals/";
    return this.http.post<Personal>(url+'add',personalRequest);
  }


  uploadImage(personalId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("profileImage", file);
    var url = API_URL + "/personals/";
    return this.http.post(
      url + personalId + "/upload-image",
      formData,
      {
        responseType: "text",
      }
    );
  }
}
