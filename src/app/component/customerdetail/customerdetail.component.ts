import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../interface/customer";
import {catchError, tap, throwError} from "rxjs";
import {CustomerResponse} from "../../interface/customer-response";
import {HttpErrorResponse} from "@angular/common/http";
@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.css']
})
export class CustomerdetailComponent implements OnInit{
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';
  customer: Customer;
  genderOptions:string[] = ['Genderqueer', 'Bigender', 'Genderfluid', 'Male', 'Polygender', 'Non-binary', 'Female', 'Agender'];
  statusOptions:string[] = ['BANNED', 'ACTIVE', 'INACTIVE'];
  showOverlay: boolean;
  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customer = this.activatedRoute.snapshot.data['resolvedResponse'].data.customer;
  }

  changeMode(mode?: "edit" | "locked", updatedCustomer?: Customer) : void {
    this.mode = this.mode === 'locked' ? 'edit' : "locked";
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : "Edit";

    if(mode === 'edit'){
      this.customerService.updateCustomer(this.customer.id, <Customer>(updatedCustomer)).subscribe();
    }
  }


  onEditImageUrl(imageUrl: string) {
    let closeButton = document.getElementById("edit-imageurl-close");
    if (!closeButton) {
      console.error('Element with id "edit-imageurl-close" not found in the DOM.');
      return;
    }
    closeButton.click();
    // this.customerService.updateCustomerImage(this.customer.id, imageUrl).subscribe();
    this.customerService.updateCustomerImage(this.customer.id, imageUrl).pipe(
      tap((response: CustomerResponse) => {
        console.log(response);
        this.customer = response.data.customer;
      }),
      catchError((error: HttpErrorResponse) => {
        // alert(error.message);
        return throwError(() => error);
      })
    ).subscribe();
  }
}
