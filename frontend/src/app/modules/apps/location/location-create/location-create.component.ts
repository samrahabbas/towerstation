import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
// import { LocationService } from "../services/location.service";
import { LocationService } from "src/app/services/location.service";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { CountryCallingCodeDto } from "../../../../../core/dto/country-calling-code.dto";
import { CoreHelperService } from "../../../../../core/core-helper.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LocationContactDto } from "../dto/location-contact.dto";
import { ZipCodeService } from "src/app/services/zip-code.service";

@Component({
  selector: "app-location-create",
  templateUrl: "./location-create.component.html",
  styleUrls: ["./location-create.component.scss"],
  providers: [MessageService]
})
export class LocationCreateComponent implements OnInit, OnDestroy {

  public locationFormGroup: FormGroup;
  public states: ZipCodeDataDto[] = [];
  public cities: ZipCodeDataDto[] = [];
  public isLoading: boolean = false;
  public telephoneCountryCodes: CountryCallingCodeDto[] = LocationCreateComponent.countryCallingCodes;
  public telephoneCountryCodeSelected: CountryCallingCodeDto = this.telephoneCountryCodes[0];
  public isAddingNewContact: boolean = false;
  public selectedContactIndex: number = 0;
  public isEditing: boolean = false;
  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  private readonly subs: Subscription = new Subscription();
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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly locationService: LocationService,
    private readonly zipCodeService: ZipCodeService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.locationFormGroup.controls;
  }

  public get locationContactsLength(): number {
    return this.locationContactsFormArray.length;
  }

  public get locationContactsFormArray(): FormArray {
    return this.locationFormGroup.controls.locationContacts as FormArray;
  }

  public get selectedLocationContactFormGroup(): FormGroup {
    return this.locationContactsFormArray.controls[this.selectedContactIndex] as FormGroup;
  }

  public get isPreviousContact(): boolean {
    return !!this.locationContactsFormArray.controls[this.selectedContactIndex - 1];
  }

  public get isNextContact(): boolean {
    return !!this.locationContactsFormArray.controls[this.selectedContactIndex + 1];
  }

  ngOnInit(): void {
    this.initForm();
    this.manageZipCodeChange();

    if (this.isEditing) {
      this.getLocationById(this.activatedRoute.snapshot.queryParams.id);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private initForm(): void {
    this.locationFormGroup = this.formBuilder.group({
      street1: [null, [Validators.required]],
      street2: [null, []],
      zipCode: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      privateNotes: [null, []],
      locationTypes: [null, []],
      locationCodes: [null, []],
      locationContacts: this.formBuilder.array([this.createLocationContactFormGroup()])
    });

    this.f.state.disable();
    this.f.city.disable();
  }

  private createLocationContactFormGroup(isFirstContact: boolean = true): FormGroup {
    return this.formBuilder.group({
      uuid: [null, []],
      name: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      email: [null, []],
      fax: [null, []],
      telephoneCallingCode: [null, [Validators.required]],
      faxCallingCode: [null, []],
      isPrimaryContact: [isFirstContact, []],
      isIncludedInContactEmailList: [isFirstContact, []]
    });
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
  public addCarrierContact(): void {
    this.isAddingNewContact = false;
  }

  public tryAddingCarrierContact(): void {
    this.isAddingNewContact = true;
    this.locationContactsFormArray.push(this.createLocationContactFormGroup(false));
    this.selectedContactIndex = this.locationContactsFormArray.length - 1;
  }

  public cancelAddingCarrierContact(): void {
    this.isAddingNewContact = false;
    this.locationContactsFormArray.removeAt(this.locationContactsFormArray.length - 1);
    this.selectedContactIndex = this.locationContactsFormArray.length - 1;
  }

  public goToPreviousContact(): void {
    this.selectedContactIndex--;
  }

  public goToNextContact(): void {
    this.selectedContactIndex++;
  }

  public onSetAsPrimaryContact(): void {
    this.locationContactsFormArray.controls.forEach((control: any, index: number) => {
      if (index === this.selectedContactIndex) {
        control.controls.isPrimaryContact.setValue(true);
        control.controls.isIncludedInContactEmailList.setValue(true);
      } else {
        control.controls.isPrimaryContact.setValue(false);
        control.controls.isIncludedInContactEmailList.setValue(false);
      }
    });
    this.sortContactsPrimaryContact();

    this.selectedContactIndex = 0;
  }

  private sortContactsPrimaryContact() {
    this.locationContactsFormArray.controls = this.locationContactsFormArray.controls.sort((a: any, b: any) => {
      return a.controls.isPrimaryContact.value ? -1 : 1;
    });
  }

  public onDeleteContact(): void {
    this.locationContactsFormArray.removeAt(this.selectedContactIndex);
    this.selectedContactIndex = this.locationContactsFormArray.length - 1;
    this.selectedContactIndex = 0;
  }

  public validSubmit(): void {
    // console.log("validSubmit");
    // console.log(CoreHelperService.findInvalidControlsRecursive(this.locationFormGroup));
    // if (this.isAddingNewContact) {
    //   this.messageService.add({
    //     severity: "warning",
    //     summary: "Warning",
    //     detail: "Complete the contact information before saving",
    //     closable: true
    //   });
    //   return;
    // }
    // if (this.locationFormGroup.valid && !this.isAddingNewContact) {
    //   if (this.isEditing) {
    //     this.updateLocation(this.activatedRoute.snapshot.queryParams.id);
    //   } else {
    //   }
    // }
    // this.saveLocation();

    this.addLocation();
  }

  public addLocation() {
    this.isLoading = true;
    this.ngxSpinnerService.show();

    // console.log(this.locationFormGroup.getRawValue());
    

    if(this.isEditing){
      this.locationService.updateLocation(this.locationFormGroup.getRawValue(), this.activatedRoute.snapshot.queryParams.id).subscribe((response: any) => {
        console.log(response);
        if(response.message == "Location Updated successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
            
          });
  
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/location/list'])
        
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
      this.locationService.addLocation(this.locationFormGroup.getRawValue(), this.userData.id).subscribe((response: any) => {
        console.log(response);
        if(response.message == "Location Added successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
            
          });
  
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/location/list'])
        
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

  private getLocationById(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.locationService.getLocationById(id).subscribe(
        (data:any) => {
          console.log(data);

          this.locationFormGroup.patchValue({
            street1: data.street1,
            street2: data.street2,
            zipCode: data.zipCode,
            state: data.state,
            city: data.city,
            telephone: data.telephone,
            privateNotes: data.privateNotes,
            locationTypes: data.locationTypes,
            locationCodes: data.locationCodes
          });
        
          // this.customerForm.patchValue({
          //   firstName: data.firstName,
          //   middleName: data.middleName,
          //   lastName: data.lastName,
          //   street1: data.street1,
          //   street2: data.street2,
          //   city: data.city,
          //   state: data.state,
          //   zipCode: data.zipcode,
          //   telephone: data.telephone,
          //   cellPhone: data.cellPhone,
          //   fax: data.fax,
          //   email: data.email,
          //   accountingCreditLimit: data.creditLimit,
          //   accountingIsCreditHold: data.isCreditHold,
          //   accountingAvailableCredit: data.availableCredit,
          //   accountingPaymentTerms: data.paymentTerms,
          //   operatingAuthorityNumber: data.mcNumber,
          //   operatingAuthorityUSDOTNumber: data.usdotNumber,
          //   weightUnit: data.weightUnit,
          //   distanceUnit: data.distanceUnit,
          //   temperatureUnit: data.temperatureUnit,
          //   privateNotes: data.privateNotes,
          //   // status: data.status,
          // });
          // this.selectedOperatingAuthorityNumberType = data?.mcNumberType ?? this.operatingAuthorityNumberTypes[0];
          // this.f.zipCode.setValue(data.zipCode);
          // this.f.zipCode.setErrors(null);
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
