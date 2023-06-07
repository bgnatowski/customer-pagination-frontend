import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { CustomersComponent } from './component/customers/customers.component';
import { CustomerdetailComponent } from './component/customerdetail/customerdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
