import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-customize-international-customization',
  templateUrl: './customize-international-customization.component.html',
  styleUrls: ['./customize-international-customization.component.scss']
})
export class CustomizeInternationalCustomizationComponent implements OnInit {

  public internationCustomizations: FormGroup;
  public currencies: string[] = [
    "Afghan Afghani (AFN)",
    "Albanian Lek (ALL)",
    "Argentine Peso (ARS)",
    "Aruba Guilder (AWG)",
    "Australian Dollar (AUD)",
    "Azerbaijani Manat (AZN)",
    "Bahamas Dollar (BSD)",
    "Barbados Dollar (BBD)",
    "Belarusian Ruble (BYR)",
    "Belize Dollar (BZD)",
    "Bermuda Dollar (BMD)",
    "Bolivian Boliviano (BOB)",
    "Bosnia-Herzegovina Convertible Mark (BAM)",
    "Botswanan Pula (BWP)",
    "Brazilian Real (BRL)",
    "British Pound Sterling (GBP)",
    "Brunei Dollar (BND)",
    "Bulgarian Lev (BGN)",
    "Cambodian Riel (KHR)",
    "Canadian Dollar (CAD)",
    "Cayman Islands Dollar (KYD)",
    "Chilean Peso (CLP)",
    "Chinese Yuan (CNY)",
    "Colombian Peso (COP)",
    "Costa Rican Colon (CRC)",
    "Croatian Kuna (HRK)",
    "Cuba Peso (CUP)",
    "Czech Republic Koruna (CZK)",
    "Danish Krone (DKK)",
    "Dominican Peso (DOP)",
    "East Caribbean Dollar (XCD)",
    "Egyptian Pound (EGP)",
    "El Salvador Colon (SVC)",
    "Estonian Kroon (EEK)",
    "Euro (EUR)",
    "Falkland Islands (Malvinas) Pound (FKP)",
    "Fiji Dollar (FJD)",
    "Ghana Cedi (GHC)",
    "Gibraltar Pound (GIP)",
    "Guatemalan Quetzal (GTQ)",
    "Guernsey Pound (GGP)",
    "Guyana Dollar (GYD)",
    "Honduran Lempira (HNL)",
    "Hong Kong Dollar (HKD)",
    "Hungarian Forint (HUF)",
    "Icelandic Krona (ISK)",
    "Indian Rupee (INR)",
    "Indonesian Rupiah (IDR)",
    "Iranian Rial (IRR)",
    "Isle of Man Pound (IMP)",
    "Israeli New Sheqel (ILS)",
    "Jamaican Dollar (JMD)",
    "Japanese Yen (JPY)",
    "Jersey Pound (JEP)",
    "Kazakhstani Tenge (KZT)",
    "Kyrgyzstan Som (KGS)",
    "Laos Kip (LAK)",
    "Latvian Lats (LVL)",
    "Lebanese Pound (LBP)",
    "Liberia Dollar (LRD)",
    "Lithuanian Litas (LTL)",
    "Macedonian Denar (MKD)",
    "Malaysian Ringgit (MYR)",
    "Mauritian Rupee (MUR)",
    "Mexican Peso (MXN)",
    "Mongolia Tughrik (MNT)",
    "Mozambican Metical (MZN)",
    "Namibian Dollar (NAD)",
    "Nepalese Rupee (NPR)",
    "Netherlands Antilles Guilder (ANG)",
    "New Taiwan Dollar (TWD)",
    "New Zealand Dollar (NZD)",
    "Nicaraguan Cordoba (NIO)",
    "Nigerian Naira (NGN)",
    "North Korean Won (KPW)",
    "Norwegian Krone (NOK)",
    "Omani Rial (OMR)",
    "Pakistani Rupee (PKR)",
    "Panamanian Balboa (PAB)",
    "Paraguayan Guarani (PYG)",
    "Peruvian Nuevo Sol (PEN)",
    "Philippine Peso (PHP)",
    "Polish Zloty (PLN)",
    "Qatari Rial (QAR)",
    "Romanian Leu (RON)",
    "Russian Ruble (RUB)",
    "Rwandan Franc (RWA)",
    "Saint Helena Pound (SHP)",
    "Saudi Riyal (SAR)",
    "Serbian Dinar (RSD)",
    "Seychelles Rupee (SCR)",
    "Singapore Dollar (SGD)",
    "Solomon Islands Dollar (SBD)",
    "Somali Shilling (SOS)",
    "South African Rand (ZAR)",
    "South Korean Won (KRW)",
    "Sri Lankan Rupee (LKR)",
    "Suriname Dollar (SRD)",
    "Swedish Krona (SEK)",
    "Swiss Franc (CHF)",
    "Syrian Pound (SYP)",
    "Thai Baht (THB)",
    "Trinidad and Tobago Dollar (TTD)",
    "Turkish Lira (TRY)",
    "Tuvalu Dollar (TVD)",
    "US Dollar (USD)",
    "Ukrainian Hryvnia (UAH)",
    "United Arab Emirates Dirham (AED)",
    "Uruguayan Peso (UYU)",
    "Uzbekistan Som (UZS)",
    "Venezuelan Bolivar (VEF)",
    "Vietnamese Dong (VND)",
    "Yemeni Rial (YER)",
    "Zambian Kwacha (ZMW)",
    "Zimbabwe Dollar (ZWD)"
  ]
  public thousandSeparators: string[] = [
    '[,] Comma',
    '[] Space',
    '[.] Period/Point',
  ]
  public decimalSeparators: string[] = [
    '[,] Comma',
    '[] Space',
    '[.] Period/Point',
  ]
  public weightUnits: string[] = [
    'Kilograms',
    'Pounds'
  ]
  public distanceUnits: string[] = [
    'Kilometers',
    'Miles'
  ]
  public temperatureUnits: string[] = [
    'Celsius',
    'Fahrenheit'
  ]

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ngbActiveModal: NgbActiveModal
  ) {
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.internationCustomizations.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  public closeModal(): void {
    this.ngbActiveModal.close();
  }

  private initForm(): void {
    this.internationCustomizations = this.formBuilder.group({
      currency: [null, [Validators.required]],
      thousandSeparator: [null, [Validators.required]],
      decimalSeparator: [null, [Validators.required]],
      precision: [null, [Validators.required]],
      currencyDisplay: [null, [Validators.required]],
      currencyPlacement: [null, [Validators.required]],
      weightUnit: [null, [Validators.required]],
      distanceUnit: [null, [Validators.required]],
      temperatureUnit: [null, [Validators.required]],
    });
  }
}
