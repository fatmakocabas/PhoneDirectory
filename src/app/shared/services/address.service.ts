
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
const API_URL = 'api/address';
@Injectable()
export class AddressService {

  constructor(
   public http:HttpClient
  ) { }

  allAddresses(): Observable<Address[]> {    
    var url = API_URL + '/getAllAddresses';
    return this.http.get<Address[]>(url);
  }
  
}
