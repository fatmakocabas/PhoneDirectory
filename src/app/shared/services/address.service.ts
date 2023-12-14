import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Personal } from "../models/personal.model";
import { Address } from "../models/address.model";
import { AddressSection } from "../models/addressSection.model";
import { AddressRequest } from "../models/AddressRequest";
const API_URL = "api/address";
@Injectable()
export class AddressService {
  constructor(public http: HttpClient) {}

  allAddresses(): Observable<Address[]> {
    var url = API_URL + "/getAllAddresses";
    return this.http.get<Address[]>(url);
  }
  allSections(): Observable<AddressSection[]> {
    var url = API_URL + "/getAllSections";
    return this.http.get<AddressSection[]>(url);
  }

  getAddress(addressId: string | null): Observable<Address> {
    var url = API_URL + "/addresses/";
    return this.http.get<Address>(url + addressId);
  }

  updateAddress(
    addressId: string,
    addressRequest: AddressRequest
  ): Observable<Address> {
    var url = API_URL + "/addresses/";
    return this.http.put<Address>(url + addressId, addressRequest);
  }

  // addAddress( addressRequest: AddressRequest): Observable<Address>{
  //   var url = API_URL + "/addresses/add";
  //   return this.http.post<Address>(url,addressRequest);
  // }
  
  addAddress(addressRequest: AddressRequest): Observable<Address> {
    var url = API_URL + "/addresses/";
    return this.http.post<Address>(url + "add", addressRequest);
  }

  deleteAddress(addressId:string): Observable<Address>{
    return this.http.delete<Address>(API_URL+'/addresses/'+addressId);
  }
}
