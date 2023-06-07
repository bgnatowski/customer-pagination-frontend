import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CustomerService} from "./customer.service";
import {CustomerResponse} from "../interface/customer-response";

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<CustomerResponse> {
  constructor(private customerService: CustomerService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerResponse> {
    return this.customerService.customer$(+route.paramMap.get('id')!);
  }
}
