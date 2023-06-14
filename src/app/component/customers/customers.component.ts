import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith, tap, throwError} from "rxjs";
import {ApiResponse} from "../../interface/api-response";
import {Page} from "../../interface/page";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../interface/customer";
import {NgForm} from "@angular/forms";
import {CustomerResponse} from "../../interface/customer-response";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  private currentPageSubject = new BehaviorSubject<number>(0);
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  customersState$: Observable<{
    appState: string,
    appData?: ApiResponse<Page>,
    error?: HttpErrorResponse
  }>
  selectedPageSize: string;
  currentPage$ = this.currentPageSubject.asObservable();
  genderOptions:string[] = ['Genderqueer', 'Bigender', 'Genderfluid', 'Male', 'Polygender', 'Non-binary', 'Female', 'Agender'];
  public deleteCustomer: Customer;
  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.getCustomers();
  }

  public getCustomers(): void {
    this.customersState$ = this.customerService.customers$('', 0, 10).pipe(
      map((response: ApiResponse<Page>) => {
          this.responseSubject.next(response);
          this.currentPageSubject.next(response.data.page.number);
          console.log(response);
          this.selectedPageSize = response.data.page.size.toString();
          return ({
            appState: 'APP_LOADED',
            appData: response
          })
        }
      ),
      startWith({appState: 'APP_LOADING'}),
      catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error})
      ));
  }
  goToPage(name?: string, pageNumber: number = 0) {
    this.customersState$ = this.customerService.customers$(name, pageNumber, parseInt(this.selectedPageSize, 10)).pipe(
      map((response: ApiResponse<Page>) => {
          console.log(response);
          this.responseSubject.next(response);
          this.currentPageSubject.next(pageNumber);
          console.log(this.selectedPageSize);
          return ({
            appState: 'APP_LOADED',
            appData: response
          })
        }
      ),
      startWith({appState: 'APP_LOADED', appData: this.responseSubject.value}),
      catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error})
      ));
  }

  goToNextOrPreviousPage(direction?: string, name?: string) {
    this.goToPage(name, direction === 'forward' ?
      this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1
    )
  }

  onChange(selectedPageSize: string) {
    this.selectedPageSize = selectedPageSize;
    this.currentPageSubject.next(0);
    this.goToPage('', this.currentPageSubject.value);
  }

  onAddCustomer(addForm: NgForm) {
    let closeButton = document.getElementById("add-employee-form");
    if (!closeButton) {
      console.error('Element with id "add-employee-form" not found in the DOM.');
      return;
    }
    closeButton.click();
    let addCustomer:Customer = addForm.value;
    console.log(addCustomer)
    this.customerService.addCustomer(addCustomer).pipe(
      tap((response: CustomerResponse) => {
        console.log(response);
        this.getCustomers()
        addForm.reset();
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
        return throwError(() => error);
      })
    ).subscribe();
  }

  setDeleteCustomer(customer: Customer) {
    this.deleteCustomer = customer;
  }
  public onDeleteCustomer(customerId: number) {
    let closeButton = document.getElementById("delete-button-close");
    if (!closeButton) {
      console.error('Element with id "delete-button-close" not found in the DOM.');
      return;
    }
    closeButton.click();

    this.customerService.deleteCustomer(customerId).pipe(
      tap((response: string) => {
        console.log(response);
        this.getCustomers();
      }),
      catchError((error: HttpErrorResponse) => {
        alert(error.message);
        return throwError(() => error);
      })
    ).subscribe();
  }
}
