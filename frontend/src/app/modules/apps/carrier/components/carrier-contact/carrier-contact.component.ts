import { ChangeDetectorRef,Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { CountryCallingCodeDto } from "../../../../../../core/dto/country-calling-code.dto";
import { CarrierService } from "src/app/services/carrier.service";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-carrier-contact',
  templateUrl: './carrier-contact.component.html',
  styleUrls: ['./carrier-contact.component.scss'],
  providers: [MessageService]

})
export class CarrierContactComponent implements OnInit {

  @Input()
  public carrierContactFormGroup: FormGroup
  @Input()
  public isAddingContact: boolean
  @Output()
  private onSetAsPrimaryContact: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  private onDeleteContact: EventEmitter<void> = new EventEmitter<void>();

  public callingCountryCodes: CountryCallingCodeDto[] = CarrierContactComponent.countryCallingCodes;
  public telephoneCountryCodeSelected: CountryCallingCodeDto = this.callingCountryCodes[0];
  public faxCountryCodeSelected: CountryCallingCodeDto = this.callingCountryCodes[0];

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
    private readonly carrierService: CarrierService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,


  ) { }

  public get f(): {[p: string]: AbstractControl} {
    return this.carrierContactFormGroup.controls
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams.isEditing){

      this.getCarrierContact();
    }

  }

  getCarrierContact(){
    this.subs.add(
      this.carrierService.getCarrierById(this.activatedRoute.snapshot.queryParams.id).subscribe(
        (data:any) => {
          // console.log(data[0].contact);
          this.carrierContactFormGroup.patchValue({
            name: data[0].contact[0].contactName,
            telephone: data[0].contact[0].telephone,
            email: data[0].contact[0].email,
            fax: data[0].contact[0].fax,
            // isPrimaryContact: [isFirstContact, []],
            // isIncludedInContactEmailList: [isFirstContact, []]

          })

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

  public onSetAsPrimaryContactClick(): void {
    this.onSetAsPrimaryContact.emit();
  }

  public onDeleteContactClick(): void {
    this.onDeleteContact.emit();
  }

}
