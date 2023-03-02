import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
// import { CustomerService } from "../services/customer.service";
import { CustomerService } from "src/app/services/customer.service";
import { MessageService } from "primeng/api";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { CountryCallingCodeDto } from "../../../../../core/dto/country-calling-code.dto";
import { CoreHelperService } from "../../../../../core/core-helper.service";
import { CustomerModel } from "../models/customer.model";

@Component({
  selector: "app-customer-create",
  templateUrl: "./customer-create.component.html",
  styleUrls: ["./customer-create.component.scss"],
  providers: [MessageService]
})
export class CustomerCreateComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public customerForm: FormGroup;
  public isEditing: boolean = false;
  public roles: string[] = ["Admin", "Developer","Broker"];
  userData: any;
 

  private readonly subs: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  ngOnInit(): void {
    this.initForm();

    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public validSubmit(): void {
    console.log(CoreHelperService.findInvalidControlsRecursive(this.customerForm));
    console.log(this.customerForm.invalid);
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    this.createCustomer();
  }

  private initForm() {
    this.customerForm = this.formBuilder.group({
      role: [this.roles[0], []],
    //  file: '',
      fileSource: ['', Validators.required],
      fileName: {},
     
    });

  }
 
   onFileSelected(event: any) {
    if(event.target.files.length > 0) 
     {
       this.customerForm.patchValue({
          fileName: event.target.files[0],
       })
     }
  }

  private createCustomer(): void {
    this.isLoading = true;
    this.ngxSpinnerService.hide();
    const rawValue = this.customerForm.getRawValue();
    this.userData = JSON.parse(localStorage.getItem("user")  || '{}');
    

    const formData = new FormData();
    formData.append('file', rawValue.fileName);
    formData.append('role', rawValue.role);
    formData.append('title', "hhsa");
    formData.append('u_id', this.userData.id);
    console.log(formData.get("file"))
    
    // const customerModel: CustomerModel = {
    //   role: rawValue.role,
    //   // file: rawValue.fileName,
    //   formData: formData.get("file")
    // };
    

      this.customerService.addSignedDocument(formData).subscribe((response: any) => {
          console.log(response);
          if(response.message == "Document Added successfully"){
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: response.message,
              closable: true
              
            });
            this.isLoading = false;
            this.ngxSpinnerService.hide();
            this.router.navigate(['/apps/signed-documents/list'])
            
          }else{
            // this.error = true;
          }
        },
        (error: any) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
          this.isLoading = false;
                    this.ngxSpinnerService.hide();
        }, () => {
        });
  
    
  }
  

 
}
