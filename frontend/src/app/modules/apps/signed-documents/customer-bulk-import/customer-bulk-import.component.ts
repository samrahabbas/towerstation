import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { CustomerService } from "src/app/services/customer.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpResponse } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { NgxDropzoneChangeEvent } from "ngx-dropzone";
import { CustomerBulkImportModel } from "../models/customer-bulk-import.model";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-customer-bulk-import",
  templateUrl: "./customer-bulk-import.component.html",
  styleUrls: ["./customer-bulk-import.component.scss"],
  providers: [MessageService]
})
export class CustomerBulkImportComponent implements OnInit, OnDestroy, AfterViewInit {

  public isLoading: boolean = false;
  public selectedFile?: File;
  public hasHeaderRow: boolean = true;
  public fileData: any[] = [];
  public customerData: CustomerBulkImportModel | any = new CustomerBulkImportModel();
  public customers: any;
  public customersSign: any;
  public env:any;

  @ViewChild("FileImport")
  public fileImport: TemplateRef<any>;
  @ViewChild("DataMapping")
  public dataMapping: TemplateRef<any>;
  @ViewChild("DataValidation")
  public dataValidation: TemplateRef<any>;

  public selectedStage: TemplateRef<any>;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly messageService: MessageService,
    private readonly customerService: CustomerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngxSpinnerService: NgxSpinnerService
  ) {
  }


  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');

  ngOnInit(): void {
    this.env = environment;
    this.getCustomers();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.selectedStage = this.fileImport;
  }

  private getCustomers(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    // this.customerService.getCustomers(this.userData.id).subscribe((response: any) => {
    //   console.log(response);
    // });
    this.subs.add(
      this.customerService.getSignedDocuments(this.userData.id, this.userData.userRole)
        .subscribe((res:any) => {
          if (res) {
            this.customers = res.result;
            this.customersSign = res.result2;
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

 
}
