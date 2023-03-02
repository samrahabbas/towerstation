import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
// import { CarrierService } from "../services/carrier.service";
import { FlatpickrDefaultsInterface } from "angularx-flatpickr/flatpickr-defaults.service";
import { CountryCallingCodeDto } from "../../../../../core/dto/country-calling-code.dto";
import { ZipCodeService } from "src/app/services/zip-code.service";
import { CoreHelperService } from "src/core/core-helper.service";
import { CarrierService } from "src/app/services/carrier.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-carrier-create",
  templateUrl: "./carrier-create.component.html",
  styleUrls: ["./carrier-create.component.scss"],
  providers: [MessageService]
})
export class CarrierCreateComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public carrierForm: FormGroup;
  public carrierContact:any;
  public isEditing: boolean = false;
  public states: ZipCodeDataDto[] = [];
  public cities: ZipCodeDataDto[] = [];
  public contactArray: any = [];
  public telephoneCountryCodes: CountryCallingCodeDto[] = CarrierCreateComponent.countryCallingCodes;
  public telephoneCountryCodeSelected: CountryCallingCodeDto = this.telephoneCountryCodes[0];
  public cellPhoneCountryCodes: CountryCallingCodeDto[] = CarrierCreateComponent.countryCallingCodes;
  public cellPhoneCountryCodeSelected: CountryCallingCodeDto = this.cellPhoneCountryCodes[0];
  public mcFFMXNumberTypes: string[] = ["MC", "FF", "MX"];
  public selectedMCFFMXNumber: string = this.mcFFMXNumberTypes[0];
  public weightUnits: string[] = ["Pounds", "Kilograms"];
  public distanceUnits: string[] = ["Miles", "Kilometers"];
  public temperatureUnits: string[] = ["Fahrenheit", "Celsius"];
  public paymentMethods: string[] = ["Standard Pay", "Quick Pay", "Pay When Paid"];
  public isAddingNewContact: boolean = false;
  public selectedContactIndex: number = 0;
  public isFactoringAddress: boolean = false;
  public isRemitAddress: boolean = false;
  public isMailAddress: boolean = false;
  public flatPickrOptions: FlatpickrDefaultsInterface = {
    monthSelectorType: "dropdown",
    now: new Date(),
    convertModelValue: true
  };
  userData = JSON.parse(localStorage.getItem("user")  || '{}');



  public isOKToLoadTypes: any[] = [
    {
      label: "OK TO LOAD",
      value: true
    },
    {
      label: "DO NOT LOAD",
      value: false
    }
  ];

  private static countryCallingCodes: CountryCallingCodeDto[] = [
    {
      countryCode: "US",
      callingCode: "+1",
      flag: "assets/media/flags/united-states.svg"
    },
    {
      countryCode: "CA",
      callingCode: "+1",
      flag: "assets/media/flags/canada.svg"
    },
    {
      countryCode: "MX",
      callingCode: "+52",
      flag: "assets/media/flags/mexico.svg"
    }
  ];

  private readonly subs: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly carrierService: CarrierService,
    private readonly zipCodeService: ZipCodeService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router

  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.carrierForm.controls;
  }

  // public get factoringAddressControls(): { [p: string]: AbstractControl } {
  //   return (this.f.factoringAddress as FormGroup).controls;
  // }

  public get carrierContactsFormArray(): FormArray {
    return this.carrierForm.controls.carrierContacts as FormArray;
  }

  public get carrierContactsLength(): number {
    return this.carrierContactsFormArray.length;
  }

  public get selectedCarrierContactFormGroup(): FormGroup {
    return this.carrierContactsFormArray.controls[this.selectedContactIndex] as FormGroup;
  }

  public get isPreviousContact(): boolean {
    return !!this.carrierContactsFormArray.controls[this.selectedContactIndex - 1];
  }

  public get isNextContact(): boolean {
    return !!this.carrierContactsFormArray.controls[this.selectedContactIndex + 1];
  }

  public get newAddressesFormArray(): FormArray {
    return this.f.newAddresses as FormArray
  }

  public validSubmit(): void {
    // console.log(CoreHelperService.findInvalidControlsRecursive(this.carrierForm));
    // console.log(this.carrierForm.invalid);
    // if (this.carrierForm.invalid) {
    //   this.carrierForm.markAllAsTouched();
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: "smooth"
    //   });
    //   return;
    // }
    
    this.createCarrier();
  }
  createCarrier() {
    // console.log(this.carrierForm.value);
    // console.log(this.carrierForm.controls.city.value);
    this.isLoading = true;  
    this.ngxSpinnerService.show();
    console.log(this.carrierForm.getRawValue());

    if(this.isFactoringAddress){
      if(this.carrierForm.getRawValue().factoringAddress.telephone == null){
        window.scrollTo({
          top: 900,
          left: 0,
          behavior: "smooth"
        });
        alert('Please fill factoring address fields')     
        this.ngxSpinnerService.hide();  
        this.isLoading = false;  

          window.scrollTo({
            top: 900,
            left: 0,
            behavior: "smooth"
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          alert('Please fill factory address fields')

      }else{
      
        this.onAddCarrier();

      }
    }else if(this.isMailAddress){
      if(this.carrierForm.getRawValue().mailingAddress.telephone == null){          
            window.scrollTo({
              top: 900,
              left: 0,
              behavior: "smooth"
            });
            alert('Please fill mailing address fields')
        this.ngxSpinnerService.hide();     
        this.isLoading = false;  

        }else{
        
          this.onAddCarrier();

        }
    }else if(this.isRemitAddress){
      if(this.carrierForm.getRawValue().remitAddress.telephone == null){          
            window.scrollTo({
              top: 900,
              left: 0,
              behavior: "smooth"
            });
            this.isLoading = false;
            this.ngxSpinnerService.hide();
            alert('Please fill remit address fields')
            this.ngxSpinnerService.hide();     

        }else{
  
          this.onAddCarrier();

        }
    }else if(this.newAddressesFormArray.length > 0){
      if(this.carrierForm.getRawValue().newAddressesFormArray[0].telephone == null){          
            window.scrollTo({
              top: 900,
              left: 0,
              behavior: "smooth"
            });
            this.isLoading = false;
            this.ngxSpinnerService.hide();
            alert('Please fill address fields')
            this.ngxSpinnerService.hide();     

        }else{
    
          this.onAddCarrier();
        
        }
    }else{

      this.onAddCarrier();
    }
    
  }

  public onAddCarrier(){
    if(this.isEditing){
      this.carrierService.updateCarrier(this.carrierForm.getRawValue(), this.activatedRoute.snapshot.queryParams.id).subscribe((response: any) => {
        console.log(response);
        if(response.message == "Carrier Updated successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
            
          });
  
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/carrier/list'])
        
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

    }else{
      this.carrierService.addCarrier(this.carrierForm.getRawValue(), this.userData.id).subscribe((response: any) => {
        console.log(response);
        if(response.message == "Carrier Added successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
            
          });
  
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/carrier/list'])
        
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

  

  ngOnInit(): void {
    this.initForm();
    this.manageZipCodeChange();

    if (this.isEditing) {
      this.getCarrierById(this.activatedRoute.snapshot.queryParams.id);
      
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  private getCarrierById(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.carrierService.getCarrierById(id).subscribe(
        (data:any) => {
          console.log(data[0]);
          if(data[0].address[0].factoringTelephone != null){
            this.onAddFactoringAddress();
          }if(data[0].address[0].mailingTelephone != null){
            this.onAddMailingAddress();
          }if(data[0].address[0].remitTelephone != null){
            this.onAddRemitAddress();
          }
          // else if((data[0].address[0].factoringTelephone != null) && (data[0].address[0].mailingTelephone != null) && (data[0].address[0].remitTelephone == null)){
          //   this.onAddFactoringAddress();
          //   this.onAddMailingAddress();
          // }else if((data[0].address[0].factoringTelephone != null) && (data[0].address[0].mailingTelephone == null) && (data[0].address[0].remitTelephone != null)){
          //   this.onAddFactoringAddress();
          //   this.onAddRemitAddress();
          // }else if((data[0].address[0].factoringTelephone == null) && (data[0].address[0].mailingTelephone != null) && (data[0].address[0].remitTelephone != null)){
          //   this.onAddMailingAddress();
          //   this.onAddRemitAddress();
          // }
          this.carrierForm.patchValue({
          firstName: data[0].result.firstName,
          middleName:data[0].result.middleName,
          lastName: data[0].result.lastName,
          street1: data[0].result.street1,
          street2: data[0].result.street1,
          zipCode: data[0].result.zipCode,
          telephone: data[0].result.telephone,
          cellPhone: data[0].result.cellPhone,
          fax: data[0].result.fax,
          email: data[0].result.email,
          accountingCreditLimidata: data[0].result.accountingCreditLimidata,
          accountingIsCreditHolddata: data[0].result.accountingIsCreditHolddata,
          accountingAvailableCreddata: data[0].result.accountingAvailableCreddata,
          accountingPaymentTedata: data[0].result.accountingPaymentTedata,
          operatingAuthorityNumber: data[0].result.operatingAuthorityNumber,
          operatingAuthorityUSDOTNumber: data[0].result.operatingAuthorityUSDOTNumber,
          privateNotes: data[0].result.privateNotes,
          MCFFMXNumber: data[0].result.MCFFMXNumber,
          USDOTNumber: data[0].result.USDOTNumber,
          taxIDNumber: data[0].result.taxIDNumber,
          is1099Vendor: data[0].result.is1099Vendor,
          paymentTerms: data[0].result.paymentTerms,
          paymentMethod: data[0].result.paymentMethod,
          primaryInsuranceDetails: data[0].result.primaryInsuranceDetails,
          primaryInsuranceExpirationDate: data[0].result.primaryInsuranceExpirationDate,
          cargoInsuranceDetails: data[0].result.cargoInsuranceDetails,
          cargoInsuranceExpirationDate: data[0].result.cargoInsuranceExpirationDate,
      
          // carrierContacts: this.formBuilder.array([this.createCarrierContactFormGroup()]),
          // factoringAddress: this.createCarrierFactoringAddressFormGroup(),
          // remitAddress: this.createCarrierRemitAddressFormGroup(),
          // mailingAddress: this.createCarrierMailingAddressFormGroup(),
          // newAddresses: this.formBuilder.array([]),

          weightUnit: data[0].result.weightUnit,
          distanceUnit: data[0].result.distanceUnit,
          temperatureUnit: data[0].result.temperatureUnit,
        });

        this.f.zipCode.setValue(data[0].result.zipCode);
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

  public addCarrierContact(): void {
    this.isAddingNewContact = false;
    // this.cdr.detectChanges();
  }

  public tryAddingCarrierContact(): void {
    this.isAddingNewContact = true;
    this.carrierContactsFormArray.push(this.createCarrierContactFormGroup(false));
    this.selectedContactIndex = this.carrierContactsFormArray.length - 1;
  }

  public cancelAddingCarrierContact(): void {
    this.isAddingNewContact = false;
    this.carrierContactsFormArray.removeAt(this.carrierContactsFormArray.length - 1);
    this.selectedContactIndex = this.carrierContactsFormArray.length - 1;
  }

  public goToPreviousContact(): void {
    this.selectedContactIndex--;
  }

  public goToNextContact(): void {
    this.selectedContactIndex++;
  }

  public onSetAsPrimaryContact(): void {
    this.carrierContactsFormArray.controls.forEach((control: any, index: number) => {
      if (index === this.selectedContactIndex) {
        control.controls.isPrimaryContact.setValue(true);
        control.controls.isIncludedInContactEmailList.setValue(true);
      } else {
        control.controls.isPrimaryContact.setValue(false);
        control.controls.isIncludedInContactEmailList.setValue(false);
      }
    });

    this.carrierContactsFormArray.controls = this.carrierContactsFormArray.controls.sort((a: any, b: any) => {
      return a.controls.isPrimaryContact.value ? -1 : 1;
    });

    this.selectedContactIndex = 0
  }

  public onDeleteContact(): void {
    this.carrierContactsFormArray.removeAt(this.selectedContactIndex);
    this.selectedContactIndex = this.carrierContactsFormArray.length - 1;
    this.selectedContactIndex = 0;
  }

  public onAddFactoringAddress(): void {
    this.isFactoringAddress = true;
  }

  public onAddMailingAddress(): void {
    this.isMailAddress = true;
  }

  public onAddRemitAddress(): void {
    this.isRemitAddress = true;
  }

  public onAddNewAddress(): void {
    this.newAddressesFormArray.push(this.createCarrierNewAddressFormGroup());
  }

  public onDeleteFactoringAddress(): void {
    this.isFactoringAddress = false;
  }

  public onDeleteMailingAddress(): void {
    this.isMailAddress = false;
  }

  public onDeleteRemitAddress(): void {
    this.isRemitAddress = false;
  }

  public onDeleteNewAddress(index: number): void {
    this.newAddressesFormArray.removeAt(index);
  }

  private initForm() {
    this.carrierForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      middleName: [null, []],
      lastName: [null, [Validators.required]],
      street1: [null, [Validators.required]],
      street2: [null, []],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      checksPayableTo: [null, []],
      isOKToLoad: [false, []],
      MCFFMXNumber: [null, []],
      USDOTNumber: [null, []],
      taxIDNumber: [null, []],
      is1099Vendor: [false, []],
      paymentTerms: [null, []],
      paymentMethod: [null, []],
      primaryInsuranceDetails: [null, []],
      primaryInsuranceExpirationDate: [new Date(), []],
      cargoInsuranceDetails: [null, []],
      cargoInsuranceExpirationDate: [new Date(), []],
      weightUnit: [this.weightUnits[0], []],
      distanceUnit: [this.distanceUnits[0], []],
      temperatureUnit: [this.temperatureUnits[0], []],
      privateNotes: [null, []],
      carrierContacts: this.formBuilder.array([this.createCarrierContactFormGroup()]),
      factoringAddress: this.createCarrierFactoringAddressFormGroup(),
      remitAddress: this.createCarrierRemitAddressFormGroup(),
      mailingAddress: this.createCarrierMailingAddressFormGroup(),
      newAddresses: this.formBuilder.array([]),
    });

    this.f.state.disable();
    this.f.city.disable();
    // console.log(this.carrierForm);
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

  private createCarrierContactFormGroup(isFirstContact: boolean = true): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      email: [null, []],
      fax: [null, []],
      isPrimaryContact: [isFirstContact, []],
      isIncludedInContactEmailList: [isFirstContact, []]
    });
  }

  private getZipCodeData(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.zipCodeService.getZipCodeData(this.f.zipCode.value).subscribe(
        (data:any) => {
          console.log(data.result);
          this.states = data.result;
          this.cities = data.result;

          if (data.result.length === 1) {
            this.f.state.setValue(data.result[0].stateName);
            this.f.city.setValue(data.result[0].placeName);
          } else if (data.data.length > 1) {
            this.f.state.enable();
            this.f.city.enable();
          }
          this.f.zipCode.setErrors({
            zipCodeNotFound: false
          });
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
    );
  }

  private createCarrierFactoringAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      checksPayableTo: [null, []],
      street1: [null, [Validators.required]],
      street2: [null, []],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
    });
  }

  private createCarrierRemitAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      checksPayableTo: [null, []],
      street1: [null, [Validators.required]],
      street2: [null, []],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
    });
  }

  private createCarrierMailingAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      street1: [null, [Validators.required]],
      street2: [null, []],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
    });
  }

  private createCarrierNewAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      street1: [null, [Validators.required]],
      street2: [null, []],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
    });
  }
}
