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
  public states: ZipCodeDataDto[] = [];
  public cities: ZipCodeDataDto[] = [];
  public telephoneCountryCodes: CountryCallingCodeDto[] = CoreHelperService.countryCallingCodes;
  public telephoneCountryCodeSelected: CountryCallingCodeDto = this.telephoneCountryCodes[0];
  public cellPhoneCountryCodes: CountryCallingCodeDto[] = CoreHelperService.countryCallingCodes;
  public cellPhoneCountryCodeSelected: CountryCallingCodeDto = this.cellPhoneCountryCodes[0];
  public faxCountryCodes: CountryCallingCodeDto[] = CoreHelperService.countryCallingCodes;
  public faxCountryCodeSelected: CountryCallingCodeDto = this.faxCountryCodes[0];
  public operatingAuthorityNumberTypes: string[] = ["MC", "FF", "MX"];
  public selectedOperatingAuthorityNumberType: string = this.operatingAuthorityNumberTypes[0];
  public weightUnits: string[] = ["Pounds", "Kilograms"];
  public distanceUnits: string[] = ["Miles", "Kilometers"];
  public temperatureUnits: string[] = ["Fahrenheit", "Celsius"];
  userData: any;
  middleName:any;



  public creditHoldOptions: any[] = [
    {
      label: "Credit Hold Disabled",
      value: false
    },
    {
      label: "Credit Hold Enabled",
      value: true
    }
  ];

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
    this.manageZipCodeChange();

    if (this.isEditing) {
      this.getCustomer(this.activatedRoute.snapshot.queryParams.id);
    }
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
    // console.log(this.customerForm)
    this.customerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      middleName: ["", []],
      lastName: ["", [Validators.required]],
      street1: ["", [Validators.required]],
      street2: ["", []],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      zipCode: ["", [Validators.required]],
      telephone: ["",[]],
      cellPhone: ["", []],
      fax: ["", []],
      email: ["", []],
      accountingCreditLimit: ["", []],
      accountingIsCreditHold: [false, []],
      accountingAvailableCredit: ["", []],
      accountingPaymentTerms: ["", []],
      operatingAuthorityNumber: ["", []],
      operatingAuthorityUSDOTNumber: ["", []],
      weightUnit: [this.weightUnits[0], []],
      distanceUnit: [this.distanceUnits[0], []],
      temperatureUnit: [this.temperatureUnits[0], []],
      privateNotes: ["", []],
      // status: [1,[]],
    });

    this.f.state.disable();
    this.f.city.disable();
    this.f.accountingAvailableCredit.disable();
  }

  private manageZipCodeChange(): void {
    this.subs.add(this.f.zipCode.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((zipCode: string) => zipCode.length === 5)
    ).subscribe(() => {
      this.getZipCodeData();
    }));

    this.subs.add(this.f.zipCode.valueChanges.pipe(
      filter((zipCode: string) => zipCode.length === 0)
    ).subscribe(() => {
      console.log("zipCode is empty");
      this.f.city.setValue(null);
      this.f.state.setValue(null);
    }));
  }

  private getZipCodeData(): void {
    // console.log(this.f.zipCode.value);
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.customerService.getZipCodeData(this.f.zipCode.value).subscribe((response: any) => {
      // console.log(response);
    // this.subs.add(
    //   this.customerService.getZipCodeData(this.f.zipCode.value).subscribe(
    //     (data) => {
    //       console.log(data);
          this.states = response.result;
          this.cities = response.result;

          if (response.result.length === 1) {
            this.f.state.setValue(response.result[0].stateName);
            this.f.city.setValue(response.result[0].placeName);
          } else if (response.result.length > 1) {
            this.f.state.enable();
            this.f.city.enable();
          }
          this.f.zipCode.setErrors(null);
          this.cdr.markForCheck();
        },
        (error: any) => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.f.zipCode.setErrors({
            zipCodeNotFound: true
          });
          this.states = [];
          this.cities = [];
          this.f.state.setValue(null);
          this.f.city.setValue(null);
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
    
  }

  private createCustomer(): void {
    this.isLoading = true;
    this.ngxSpinnerService.hide();
    const rawValue = this.customerForm.getRawValue();
    const customerModel: CustomerModel = {
      firstName: rawValue.firstName,
      middleName: rawValue.middleName,
      lastName: rawValue.lastName,
      street1: rawValue.street1,
      street2: rawValue.street2,
      city: rawValue.city,
      state: rawValue.state,
      zipCode: rawValue.zipCode,
      telephone: rawValue.telephone,
      cellPhone: rawValue.cellPhone,
      fax: rawValue.fax,
      email: rawValue.email,
      availableCredit: Number(rawValue?.accountingAvailableCredit ?? 0),
      isCreditHold: rawValue.accountingIsCreditHold,
      paymentTerms: Number(rawValue?.accountingPaymentTerms ?? 0),
      mcNumber: rawValue.operatingAuthorityNumber,
      mcNumberType: this.selectedOperatingAuthorityNumberType,
      usdotNumber: rawValue.operatingAuthorityUSDOTNumber,
      weightUnit: rawValue.weightUnit,
      distanceUnit: rawValue.distanceUnit,
      temperatureUnit: rawValue.temperatureUnit,
      privateNotes: rawValue.privateNotes,
      status: rawValue.status,
      creditLimit: Number(rawValue?.accountingCreditLimit ?? 0)
    };
    // console.log(customerModel.status);

    this.userData = JSON.parse(localStorage.getItem("user")  || '{}');
  
      // console.log(this.userData.id);


    if (this.isEditing) {
      console.log('aa');
      this.subs.add(
        this.customerService
          .updateCustomer(this.activatedRoute.snapshot.queryParams.id, customerModel)
          .subscribe(
            (data:any) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: data.message,
                closable: true
              });
              this.router.navigate(['/apps/customer/list'])
            },
            (error: any) => {
              this.isLoading = false;
              this.ngxSpinnerService.hide();
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error,
                closable: true
              });
            }, () => {
              this.isLoading = false;
              this.ngxSpinnerService.hide();
            })
      );
    } 
      else {
        this.customerService.addCustomer(customerModel, this.userData.id).subscribe((response: any) => {
          console.log(response);
          if(response.message == "Customer Added successfully"){
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: response.message,
              closable: true
              
            });
            this.isLoading = false;
            this.ngxSpinnerService.hide();
            this.router.navigate(['/apps/customer/list'])
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
  }
  

  private getCustomer(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.customerService.getCustomerById(id).subscribe(
        (data:any) => {
          console.log(data);
        
          this.customerForm.patchValue({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            street1: data.street1,
            street2: data.street2,
            city: data.city,
            state: data.state,
            zipCode: data.zipcode,
            telephone: data.telephone,
            cellPhone: data.cellPhone,
            fax: data.fax,
            email: data.email,
            accountingCreditLimit: data.creditLimit,
            accountingIsCreditHold: data.isCreditHold,
            accountingAvailableCredit: data.availableCredit,
            accountingPaymentTerms: data.paymentTerms,
            operatingAuthorityNumber: data.mcNumber,
            operatingAuthorityUSDOTNumber: data.usdotNumber,
            weightUnit: data.weightUnit,
            distanceUnit: data.distanceUnit,
            temperatureUnit: data.temperatureUnit,
            privateNotes: data.privateNotes,
            // status: data.status,
          });
          this.selectedOperatingAuthorityNumberType = data?.mcNumberType ?? this.operatingAuthorityNumberTypes[0];
          this.f.zipCode.setValue(data.zipCode);
          this.f.zipCode.setErrors(null);
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
}
