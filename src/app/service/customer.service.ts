import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../interface/page";
import {ApiResponse} from "../interface/api-response";
import {Customer} from "../interface/customer";
import {CustomerResponse} from "../interface/customer-response";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly serverUrl: string = 'http://localhost:8085';
  constructor(private http: HttpClient) { }


  // Make call to the back end API to retrieve page of users
  customers$ = (name: string = '', page: number = 0, size: number = 0) : Observable<ApiResponse<Page>> =>
       this.http.get<ApiResponse<Page>>(`${this.serverUrl}/customers?name=${name}&page=${page}&size=${size}`)

  customer$ = (id: number) : Observable<CustomerResponse> =>
    this.http.get<CustomerResponse>(`${this.serverUrl}/customer/${id}`)

  updateCustomer(id: number, customerUpdate: Customer) : Observable<CustomerResponse>{
    return this.http.put<CustomerResponse>(`${this.serverUrl}/customer/${id}`, customerUpdate);
  }

  updateCustomerImage(id: number, imageUrl: string) : Observable<CustomerResponse>{
    console.log("path, id=", id, " imageUrl = ", imageUrl)

    return this.http.patch<CustomerResponse>(`${this.serverUrl}/customer/${id}`, imageUrl);
  }

}
