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
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

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
  ) { }


  public get f(): { [p: string]: AbstractControl } {
    return this.customerForm.controls;
  }


  ngOnInit(): void {
    this.initForm();
    this.manageZipCodeChange();


  }

  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  private initForm() {
    this.customerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      middleName: [null, []],
      lastName: [null, [Validators.required]],
      street1: [null, [Validators.required]],
      street2: [null, []],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      cellPhone: [null, []],
      fax: [null, []],
      email: [null, []],
      accountingCreditLimit: [null, []],
      accountingIsCreditHold: [false, []],
      accountingAvailableCredit: ["", []],
      accountingPaymentTerms: [null, []],
      operatingAuthorityNumber: [null, []],
      operatingAuthorityUSDOTNumber: [null, []],
      weightUnit: [this.weightUnits[0], []],
      distanceUnit: [this.distanceUnits[0], []],
      temperatureUnit: [this.temperatureUnits[0], []],
      privateNotes: [null, []],
      status: [1,[]],
    });

    this.f.state.disable();
    this.f.city.disable();
    this.f.accountingAvailableCredit.disable();
  }

  public validSubmit(): void {
    // console.log(CoreHelperService.findInvalidControlsRecursive(this.customerForm));
    // console.log(this.customerForm.invalid);
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    // this.createCustomer();
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



}
