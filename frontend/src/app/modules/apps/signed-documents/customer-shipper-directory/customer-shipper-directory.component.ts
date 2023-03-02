import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
// import { CustomerService } from "../services/customer.service";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { CustomerService } from "src/app/services/customer.service";
import { UserManagementService } from "src/app/services/user-management.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-customer-shipper-directory",
  templateUrl: "./customer-shipper-directory.component.html",
  styleUrls: ["./customer-shipper-directory.component.scss"],
  providers: [MessageService]
})
export class CustomerShipperDirectoryComponent implements OnInit, OnDestroy {

  public states: string[] = [];
  public shippers: any  = [];
  public selectedState: string;
  public isLoading: boolean = false;
  public isExpanded: boolean = false;
  public customerShipper: any = [];
  public id:any;
  public users:any;
  public env:any;

  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  private subs: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly customerService: CustomerService,
    private readonly UserManagementService: UserManagementService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService
  ) {
  }


  ngOnInit(): void {
    this.env = environment;
    // this.getStates();
    // this.id = this.route.snapshot.paramMap.get('id');
    this.id = this.route.snapshot.queryParamMap.get("id");

    this.getShippers();
    this.getUsers();
   
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onExpand(id:any): void {
    this.isExpanded = !this.isExpanded;
    this.getShipperById(id);
  }

  // private getStates(): void {
  //   this.isLoading = true
  //   this.ngxSpinnerService.show()
  //   this.subs.add(this.customerService.getAllStates()
  //     .subscribe(states => {
  //       this.states = states.data;
  //       // this.cdr.detectChanges()
  //     }, error => {
  //       this.isLoading = false
  //       this.ngxSpinnerService.hide()
  //       this.messageService.add({
  //         severity: "error",
  //         summary: "Error Message",
  //         detail: error.error?.message,
  //         closable: true
  //       });
  //     }, () => {
  //       this.isLoading = false
  //       this.ngxSpinnerService.hide()
  //     }));
  // }

  
  private getShippers(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.customerService.getSignedDocumentsById(this.id)
        .subscribe((res:any) => {
          if (res) {
            console.log(res);
            this.shippers = res;
            // console.log(this.shippers);

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

  private getUsers(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.UserManagementService.getUsers(this.userData.id)
        .subscribe((res:any) => {
          if (res) {
            console.log(res);
            this.users = res;
            // console.log(this.shippers);
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


  private getShipperById(id:any):void {
    this.ngxSpinnerService.show();
    this.subs.add(
      this.customerService.getSignedDocumentsById(id)
        .subscribe((res:any) => {
          this.customerShipper = res;
          this.cdr.markForCheck();
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
}
