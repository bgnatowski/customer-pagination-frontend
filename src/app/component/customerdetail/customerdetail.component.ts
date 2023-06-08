import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../interface/customer";

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
  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customer = this.activatedRoute.snapshot.data['resolvedResponse'].data.customer;
    // this.activatedRoute.paramMap.subscribe(
    //   (params: ParamMap) => {
    //     console.log('Customer ID: ', params.get('id')!);
    //     this.customerService.customer$(+params.get('id')!).subscribe(
    //       (response: any) => {
    //         console.log(response);
    //         this.response = response;
    //       }
    //     );
    //   }
    // );
  }

  changeMode(mode?: 'edit' | 'locked' ) : void {
    this.mode = this.mode === 'locked' ? 'edit' : "locked";
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : "Edit";

    if(mode === 'edit'){
      // logic to update user on the backend
      console.log('Updating user on the backend');
    }
  }
}
