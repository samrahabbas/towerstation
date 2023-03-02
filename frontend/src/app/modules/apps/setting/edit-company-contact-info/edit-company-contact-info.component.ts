import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { CountryCallingCodeDto } from "../../../../../core/dto/country-calling-code.dto";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from "@angular/router";
import { SettingsService } from "../services/settings.service";

@Component({
  selector: "app-edit-company-contact-info",
  templateUrl: "./edit-company-contact-info.component.html",
  styleUrls: ["./edit-company-contact-info.component.scss"],
  providers: [MessageService]
})
export class EditCompanyContactInfoComponent implements OnInit, OnDestroy {

  public contactForm: FormGroup;
  public isLoading: boolean = false;
  public states: ZipCodeDataDto[] = [];
  public cities: ZipCodeDataDto[] = [];
  public operatingAuthorityNumberTypes: string[] = ["MC", "FF", "MX"];
  public selectedOperatingAuthorityNumberType: string = this.operatingAuthorityNumberTypes[0];
  public telephoneCountryCodes: CountryCallingCodeDto[] = EditCompanyContactInfoComponent.countryCallingCodes;
  public telephoneCountryCodeSelected: CountryCallingCodeDto = this.telephoneCountryCodes[0];
  public faxCountryCodes: CountryCallingCodeDto[] = EditCompanyContactInfoComponent.countryCallingCodes;
  public faxCountryCodeSelected: CountryCallingCodeDto = this.faxCountryCodes[0];
  public enabledDisabledOptions: any[] = [
    {
      label: "Disabled",
      value: false
    },
    {
      label: "Enabled",
      value: true
    }
  ];

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly settingsService: SettingsService
  ) {
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.manageZipCodeChange();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onFileChange(target: EventTarget | null): void {
    const event = target as HTMLInputElement;
    if (event.files) {
      const file = event.files[0];
      // this.f.logo.setValue(event.files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.f.logo.setValue(reader.result);
        this.cdr.detectChanges()
      };
    }
  }

  private initForm(): void {
    this.contactForm = this.formBuilder.group({
      name: [null, []],
      logo: [null, []],
      street1: [null, [Validators.required]],
      street2: [null, []],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      fax: [null, []],
      docketNumber: [null, []],
      USDOTNumber: [null, []],
      SCACCode: [null, []],
      isFreightBrokerFeatures: [false, []],
      isCarrierFeatures: [false, []],
    });

    this.f.state.disable();
    this.f.city.disable();
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
      this.settingsService.getZipCodeData(this.f.zipCode.value).subscribe(
        (data) => {
          console.log(data);
          this.states = data.data;
          this.cities = data.data;

          if (data.data.length === 1) {
            this.f.state.setValue(data.data[0].stateName);
            this.f.city.setValue(data.data[0].placeName);
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
}
