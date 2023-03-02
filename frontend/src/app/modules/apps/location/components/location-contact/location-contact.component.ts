import { ChangeDetectorRef,AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";
import { CountryCallingCodeDto } from "../../../../../../core/dto/country-calling-code.dto";
import { Observable, Subscription } from "rxjs";
import { LocationService } from "src/app/services/location.service";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";




@Component({
  selector: "app-location-contact",
  templateUrl: "./location-contact.component.html",
  styleUrls: ["./location-contact.component.scss"],
  providers: [MessageService]

})
export class LocationContactComponent implements OnInit, OnDestroy {

  @Input()
  public isAddingContact: boolean;
  @Output()
  private onSetAsPrimaryContact: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  private onDeleteContact: EventEmitter<void> = new EventEmitter<void>();

  public callingCountryCodes: CountryCallingCodeDto[] = LocationContactComponent.countryCallingCodes;
  public telephoneCountryCodeSelected: CountryCallingCodeDto = this.callingCountryCodes[0];
  public faxCountryCodeSelected: CountryCallingCodeDto = this.callingCountryCodes[0];

  private subs: Subscription = new Subscription();
  public isLoading: boolean = false;


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
    public readonly controlContainer: ControlContainer,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly locationService: LocationService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  public get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.f.telephoneCallingCode.setValue(this.callingCountryCodes[0]);
    this.f.faxCallingCode.setValue(this.callingCountryCodes[0]);
    if( this.activatedRoute.snapshot.queryParams.isEditing){

      this.getLocationById(this.activatedRoute.snapshot.queryParams.id);
    }
  }

  private getLocationById(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.locationService.getLocationById(id).subscribe(
        (data:any) => {
          console.log(data);

          this.formGroup.patchValue({
            name: data.contactName,
            telephone: data.telephone,
            email: data.email,
            fax: data.fax,
          });
          this.ngxSpinnerService.hide();        
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


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onSetAsPrimaryContactClick(): void {
    this.onSetAsPrimaryContact.emit();
  }

  public onDeleteContactClick(): void {
    this.onDeleteContact.emit();
  }
}
