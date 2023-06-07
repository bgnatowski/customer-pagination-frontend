import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./component/customers/customers.component";
import {CustomerdetailComponent} from "./component/customerdetail/customerdetail.component";
import {CustomerResolver} from "./service/customer.resolver";

const routes: Routes = [
  {path: 'customers', component: CustomersComponent},
  {path: 'customer/:id', component: CustomerdetailComponent, resolve: {resolvedResponse : CustomerResolver}},
  {path: '', component: CustomersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
