import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { UserRequest } from "../models/UserRequest";
const API_URL = "api/user";
@Injectable()
export class UserService {

  constructor(public http: HttpClient) {}

  private baseApiUrl = '/';

  allUsers(): Observable<User[]> {
    var url = API_URL + "/getAllUsers";
    return this.http.get<User[]>(url);
  }

  getUser(userId: string | null): Observable<User> {
    var url = API_URL + "/users/";
    return this.http.get<User>(url + userId);
  }

  // getImagePath(relativePath: string) {
  //   debugger
  //   return this.baseApiUrl + `${relativePath}`;
  // }

  updateUser(
    userId: string,
    userRequest: UserRequest
  ): Observable<User> {
    var url = API_URL + "/users/";
    return this.http.put<User>(url + userId, userRequest);
  }

  addUser(userRequest: UserRequest): Observable<User>{
    var url = API_URL + "/users/";
    return this.http.post<User>(url+ "add", userRequest);
  }
  
  deleteUser(userId: string): Observable<User>{
    return this.http.delete<User>(API_URL+'/users/'+userId);
  }

  // uploadImage(userId: string, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append("profileImage", file);
  //   var url = API_URL + "/users/";
  //   return this.http.post(
  //     url + userId + "/upload-image",
  //     formData,
  //     {
  //       responseType: "text",
  //     }
  //   );
  // }
}
