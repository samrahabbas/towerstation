import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
// import { CustomerService } from "../services/customer.service";
import { CustomerService } from "src/app/services/customer.service";
import { CustomerDto } from "../dto/customer.dto";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
  providers: [MessageService]
})
export class CustomerListComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public customers: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');
  customersUpdate:boolean = false;
  customersDelete:boolean = false;
  customersCreate:boolean = false;


  @ViewChild("DeleteCustomerSwal")
  public deleteCustomerSwal: SwalComponent;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly customerService: CustomerService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if(this.userData.userRole == 1 || this.userData.userRole == null ){
      this.customersUpdate= true;
      this.customersDelete= true;
      this.customersCreate= true;
    }else{
      for(let i=0; i < this.permissionData.length; i++){
  
        if(this.permissionData[i].name == "Customers"){
          // this.userManagement = true;
          if(this.permissionData[i].privilegeId == 1){
            this.customersCreate = true;
          }
          if(this.permissionData[i].privilegeId == 3){
            this.customersUpdate = true;
          }
          if(this.permissionData[i].privilegeId == 4){
            this.customersDelete = true;
          }
   
        }
      }
    }


    this.getCustomers();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public editCustomer(id: string): void {
    this.router.navigate(["apps/customer/create"], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async openDeleteCustomerConfirmationDialogue(id: string): Promise<void> {
    await this.deleteCustomerSwal.update({
      title: "Delete customer"
    });
    const swalResult = await this.deleteCustomerSwal.fire();
    if (swalResult.value) {
      this.deleteCustomer(id);
    }
  }

  public confirmDeleteCustomer(): void {

  }

  private getCustomers(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    // this.customerService.getCustomers(this.userData.id).subscribe((response: any) => {
    //   console.log(response);
    // });
    this.subs.add(
      this.customerService.getCustomers(this.userData.id, this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.customers = res;
            console.log(this.customers);

            this.cdr.markForCheck();
          }
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }

  private deleteCustomer(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.customerService.deleteCustomer(id).subscribe(
        (data:any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          this.getCustomers();
        },
        (error: any) => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.data,
            closable: true
          });
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }
}
