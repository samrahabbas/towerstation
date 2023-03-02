import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";
import { ZipCodeDataDto } from "../../../../../../core/dto/zip-code-data.dto";
import { CountryCallingCodeDto } from "../../../../../../core/dto/country-calling-code.dto";
import { CarrierService } from "src/app/services/carrier.service";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { ZipCodeService } from "src/app/services/zip-code.service";


@Component({
  selector: 'app-carrier-factoring-address',
  templateUrl: './carrier-factoring-address.component.html',
  styleUrls: ['./carrier-factoring-address.component.scss'],
  providers: [MessageService]

})
export class CarrierFactoringAddressComponent implements OnInit {

  public isLoading: boolean = false;


  @Output()
  public deleteAddress: EventEmitter<void> = new EventEmitter();

  public states: ZipCodeDataDto[] = [];
  public cities: ZipCodeDataDto[] = [];
  public telephoneCountryCodes: CountryCallingCodeDto[] = CarrierFactoringAddressComponent.countryCallingCodes;
  public telephoneCountryCodeSelected: CountryCallingCodeDto = this.telephoneCountryCodes[0];

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

  userData = JSON.parse(localStorage.getItem("user")  || '{}');

  private readonly subs: Subscription = new Subscription();

  constructor(
    public controlContainer: ControlContainer,
    private readonly carrierService: CarrierService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly zipCodeService: ZipCodeService,

  ) {
    
   }

  public get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams.isEditing){

      this.getFactoryAddress();

    }
    this.manageZipCodeChange();


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


  getFactoryAddress(){
    this.subs.add(
      this.carrierService.getCarrierById(this.activatedRoute.snapshot.queryParams.id).subscribe(
        (data:any) => {
          console.log(data[0].address[0]);
          this.formGroup.patchValue({
            name: data[0].address[0].factoringName,
            checksPayableTo: data[0].address[0].factoringChecksPayableTo,
            street1: data[0].address[0].factoringStreet1,
            street2: data[0].address[0].factoringStreet2,
            zipCode: data[0].address[0].factoringZipCode,
            state: data[0].address[0].factoringState,
            city: data[0].address[0].factoringCity,
            telephone: data[0].address[0].factoringTelephone,

          })

          this.f.zipCode.setValue(data[0].address[0].factoringZipCode);


        },
        (error: any) => {
          // this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
        }, () => {
          // this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }

  public onDeleteAddress(): void {
    this.formGroup.reset();
    this.deleteAddress.emit();
  }
}
