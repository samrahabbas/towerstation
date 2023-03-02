import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from "@angular/forms";
import { CoreHelperService } from "../../../../../core/core-helper.service";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { CustomerService } from 'src/app/services/customer.service';
import { ZipCodeService } from 'src/app/services/zip-code.service';
import { ActivatedRoute, Router } from "@angular/router";





@Component({
  selector: 'app-customer-shipper-create',
  templateUrl: './customer-shipper-create.component.html',
  styleUrls: ['./customer-shipper-create.component.scss'],
  providers: [MessageService]

})
export class CustomerShipperCreateComponent implements OnInit {

  public isLoading: boolean = false;
  public valid: boolean = false;
  public shipperForm: FormGroup;
  userData: any;
  public states: any = [];
  public companyName: boolean = false;
  public state: boolean = false;
  public address: boolean = false;


  private readonly subs: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly customerService: CustomerService,
    private readonly zipCodeService: ZipCodeService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {
    
   }

  public get f(): { [p: string]: AbstractControl } {
    return this.shipperForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllStates();

  }

  public validSubmit(): void {
    // console.log('aa');
    // console.log(CoreHelperService.findInvalidControlsRecursive(this.shipperForm));
    // console.log(this.shipperForm.invalid);
    // if (this.shipperForm.invalid) {
    //   this.shipperForm.markAllAsTouched();
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: "smooth"
    //   });
    //   return;
    // }
    if(this.shipperForm.value.companyName == ""){
      this.companyName = true;
      console.log("comoany"+this.companyName);
    }else if(this.shipperForm.value.state == ""){
      this.state = true;
      console.log("state"+this.state);
    }else if(this.shipperForm.value.address == ""){
      this.address = true;
      console.log("address"+this.address);
    }else{
      this.createShipper();
    }
    
  }
  private initForm() {
    this.shipperForm = this.formBuilder.group({
      companyName: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      address: ["", [Validators.required]],
      entityType: ["", [Validators.required]],
    });
    
    // this.f.state.disable();
    // this.f.city.disable();
    // this.f.accountingAvailableCredit.disable();
  }

  public getAllStates(){

    this.subs.add(
      this.zipCodeService.getStates().subscribe(
        (data:any) => {
          // console.log(data);
      
          this.states = data.uniqueStates;

          this.cdr.markForCheck();
        
        },
        (error: any) => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );


  }
  
  public createShipper(): void {
    
    // console.log(this.shipperForm.value)
    // this.validateFields(this.shipperForm);
    this.isLoading = true;
    this.ngxSpinnerService.show();
    // console.log(customerModel.status);

    this.userData = JSON.parse(localStorage.getItem("user")  || '{}');
  
      // console.log(this.userData.id);

      this.customerService.addCustomerShipper(this.shipperForm.value, this.userData.id).subscribe((response: any) => {
        console.log(response);
        if(response.message == "Shipper Added successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
            
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/customer/shipper-directory'])
          // console.log("aa");
          // this.success = true;
          // this.createLoadForm.reset({});
             
          //     window.scroll({ 
          //       top: 0, 
          //       left: 0, 
          //       behavior: 'smooth' 
          //     });
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
  
  public validateFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf: true});

      }else{
        this.valid = false;
        console.log(this.valid);
        // this.validateFields(control)
      }
    })
  }


}
