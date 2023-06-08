import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../interface/customer";
import {catchError, tap, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomerResponse} from "../../interface/customer-response";
import {MatDialog} from "@angular/material/dialog";
import {EditdialogComponent} from "../editdialog/editdialog.component";

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
  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.customer = this.activatedRoute.snapshot.data['resolvedResponse'].data.customer;
  }

  changeMode(mode?: "edit" | "locked", updatedCustomer?: Customer) : void {
    this.mode = this.mode === 'locked' ? 'edit' : "locked";
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : "Edit";

    if(mode === 'edit'){
      // logic to update user on the backend
      this.customerService.updateCustomer(this.customer.id, <Customer>(updatedCustomer)).subscribe();
    }
  }

  openEditPhotoDialog(customer: Customer) {
    const dialogRef = this.dialog.open(EditdialogComponent, {
      width: '400px', // Dostosuj szerokość okna dialogowego do własnych preferencji
      data: this.customer.imageUrl
    });

    dialogRef.afterClosed().subscribe((newImageUrl: string) => {
      if (newImageUrl) {
        customer.imageUrl = newImageUrl;
        this.customerService.updateCustomerImage(customer.id, customer).subscribe();
        console.log(customer);
      }
    });
  }
}
