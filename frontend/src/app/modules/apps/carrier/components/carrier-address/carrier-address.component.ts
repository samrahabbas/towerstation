import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ZipCodeDataDto } from "../../../../../../core/dto/zip-code-data.dto";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";
import { CountryCallingCodeDto } from "../../../../../../core/dto/country-calling-code.dto";

@Component({
  selector: 'app-carrier-address',
  templateUrl: './carrier-address.component.html',
  styleUrls: ['./carrier-address.component.scss']
})
export class CarrierAddressComponent implements OnInit {

  @Input()
  public addressCount: number

  @Output()
  public deleteAddress: EventEmitter<void> = new EventEmitter();

  public states: ZipCodeDataDto[] = [];
  public cities: ZipCodeDataDto[] = [];
  public telephoneCountryCodes: CountryCallingCodeDto[] = CarrierAddressComponent.countryCallingCodes;
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

  constructor(
    public controlContainer: ControlContainer
  ) { }

  public get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls
  }

  ngOnInit(): void {
  }

  public onDeleteAddress(): void {
    this.formGroup.reset();
    this.deleteAddress.emit();
  }
}
