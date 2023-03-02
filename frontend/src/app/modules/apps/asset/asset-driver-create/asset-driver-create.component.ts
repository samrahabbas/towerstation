import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { CountryCallingCodeDto } from "../../../../../core/dto/country-calling-code.dto";
// import { AssetService } from "../services/asset.service";
import { CustomerService } from "src/app/services/customer.service";
import { FlatpickrDefaultsInterface } from "angularx-flatpickr/flatpickr-defaults.service";
import Swal from "sweetalert2";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DriverViolationLogModalComponent } from "../modals/driver-violation-log-modal/driver-violation-log-modal.component";
import { AssetDriverPayItemCreateComponent } from "../asset-driver-pay-item-create/asset-driver-pay-item-create.component";
import { AssetDriverDeductionItemCreateComponent } from "../asset-driver-deduction-item-create/asset-driver-deduction-item-create.component";
import { AssetsService } from "src/app/services/assets.service";

@Component({
  selector: "app-asset-driver-create",
  templateUrl: "./asset-driver-create.component.html",
  styleUrls: ["./asset-driver-create.component.scss"],
  providers: [MessageService]
})
export class AssetDriverCreateComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public driverForm: FormGroup;
  public isEditing: boolean = false;
  public states: ZipCodeDataDto[] = [];
  public cities: ZipCodeDataDto[] = [];
  public cellPhoneCountryCodes: CountryCallingCodeDto[] = AssetDriverCreateComponent.countryCallingCodes;
  public cellPhoneCountryCodeSelected: CountryCallingCodeDto = this.cellPhoneCountryCodes[0];
  public driverTypes: string[] = ["Single", "Team"];
  public statuses: string[] = ["Active", "Inactive"];
  public licenseTypes: string[] = ["A", "B", "C", "D", "E", "F", "DJ", "O", "P", "R", "S"];
  public licenseEndorsements: string[] = [
    "A - Air-Brakes", "H - Hazardous Materials",
    "K - No Air-Brakes", "K - Intrastate Only",
    "L - No Air-Brakes", "L - Air-Brakes",
    "N - Tank Truck", "P - Passenger Vehicle",
    "S - School Bus", "T - Semi-Trailer Double or Triple",
    "W - Tow Truck", "X - Tank and Hazmat"
  ];
  public ownershipTypes: string[] = ["Company", "Owner/Operator"];
  public weightUnits: string[] = ["Pounds", "Kilograms"];
  public distanceUnits: string[] = ["Miles", "Kilometers"];
  public temperatureUnits: string[] = ["Fahrenheit", "Celsius"];
  public flatPickrOptions: FlatpickrDefaultsInterface = {
    monthSelectorType: "dropdown",
    convertModelValue: true
  };
  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  public status:any;



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

  @ViewChild("DeleteLogSwal")
  public deleteLogSwal: SwalComponent;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly ngbModal: NgbModal,
    private readonly assetsService: AssetsService,
    private readonly router: Router,
  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.driverForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.manageZipCodeChange();

    if (this.isEditing) {
      this.getDriverById(this.activatedRoute.snapshot.queryParams.id);
    
    }

    // if (this.isEditing) {
    //   this.driverForm.patchValue({
    //     firstName: "John",
    //     middleName: "Doe",
    //     lastName: "Smith",
    //     street1: "123 Main St",
    //     street2: "Apt. 1",
    //     zipCode: "94608",
    //     cellPhone: "123456789",
    //     email: "john.doe@ts.com",
    //     notes: "Private Notes..."
    //   });
    // }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public addDriver(){
    // console.log(this.driverForm);

    
    this.isLoading = true;
    this.ngxSpinnerService.show();
    // console.log(this.powerUnitForm);
    if (this.isEditing) {
      this.subs.add(
        this.assetsService
          .updateDriver(this.activatedRoute.snapshot.queryParams.id, this.driverForm.value)
          .subscribe(
            (data:any) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: data.message,
                closable: true
              });
              this.router.navigate(['/apps/asset/drivers'])
              this.cdr.markForCheck();
              
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
    }else{
      this.assetsService.addDriver(this.driverForm.value, this.userData.id).subscribe((response: any) => {
        console.log(response);
        if(response.message == "Driver Added successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
            
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/asset/drivers'])
  
        }else{
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
          closable: true
        });
        this.isLoading = false;
                  this.ngxSpinnerService.hide();
      }, () => {
      });

    }

  }

  
  private getDriverById(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getDriverById(id).subscribe(
        (data:any) => {
          console.log(data);
        
          this.driverForm.patchValue({
        
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            street1: data.street1,
            street2: data.street2,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            cellPhone: data.cellPhone,
            email: data.email,
            driverType: data.driverType, 
            dateOfBirth: data.dateOfBirth,
            driverNumber: data.driverNumber,
            ownershipType: data.ownershipType,//
            weightUnit: data.weightUnit,//
            distanceUnit: data.distanceUnit,//
            temperatureUnit: data.temperatureUnit,//
            notes: data.notes,
            commercialDriverSinceYear: data.commercialDriverSinceYear,
            experienceType: data.experienceType,
            drivingSchool: data.drivingSchool,
            CDLNumber: data.CDLNumber,
            licenseType: data.licenseType,//
            licenseEndorsements: data.licenseEndorsements,//
            applicationDate: data.applicationDate,
            hireDate: data.hireDate,
            terminationDate: data.terminationDate,
            canHireAgain: data.canHireAgain,
            bonusEligibilityDate: data.bonusEligibilityDate,
            employmentNotes: data.employmentNotes,
            insuranceCompany: data.insuranceCompany,
            groupNumber: data.groupNumber,
            idNumber: data.idNumber,
            licenseExpirationDate: data.licenseExpirationDate,
            TWICCardExpirationDate: data.TWICCardExpirationDate,
            hazmatEndorsementExpirationDate: data.hazmatEndorsementExpirationDate,
            DOTMedicalCardExpirationDate: data.DOTMedicalCardExpirationDate,
            insuranceExpirationDate: data.insuranceExpirationDate,
            lastRoadTestDate: data.lastRoadTestDate,
            lastDrugTestDate: data.lastDrugTestDate,
            lastAlcoholTestDate: data.lastAlcoholTestDate
    
          });

          if(data.status == 'Active'){
            this.status = 'Active'
          }else{
            this.status = 'Inactive'

          }

      
        
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


  public editLog(): void {
    const modal = this.ngbModal.open(DriverViolationLogModalComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
      animation: true
    });

    modal.componentInstance.isEditing = true;
  }

  public deleteLog(): void {
    this.deleteLogSwal.update({
      title: "Delete Log Entry"
    });
    this.deleteLogSwal.fire();
  }

  public confirmDeleteLog(): void {
  }

  public openViolationLogModal(event: MouseEvent): void {
    this.ngbModal.open(DriverViolationLogModalComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
      animation: true
    });
  }

  public openPayItemModal(): void {
    const modal = this.ngbModal.open(AssetDriverPayItemCreateComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
      animation: true
    });

    modal.componentInstance.isModal = true

    modal.componentInstance.onClose = () => {
      modal.close();
    }
  }

  public openDeductionItemModal(): void {
    const modal = this.ngbModal.open(AssetDriverDeductionItemCreateComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
      animation: true
    });

    modal.componentInstance.isModal = true

    modal.componentInstance.onClose = () => {
      modal.close();
    }
  }

  public editScheduleItem(type: string): void {
    if (type === "Pay Item") {
      const modal = this.ngbModal.open(AssetDriverPayItemCreateComponent, {
        size: "lg",
        centered: true,
        backdrop: "static",
        keyboard: false,
        animation: true
      });
      modal.componentInstance.isEditing = true
      modal.componentInstance.isModal = true
      modal.componentInstance.onClose = () => {
        modal.close();
      }
    } else if (type === "Deduction Item") {
      const modal = this.ngbModal.open(AssetDriverDeductionItemCreateComponent, {
        size: "lg",
        centered: true,
        backdrop: "static",
        keyboard: false,
        animation: true
      });
      modal.componentInstance.isEditing = true
      modal.componentInstance.isModal = true
      modal.componentInstance.onClose = () => {
        modal.close();
      }
    }
  }

  public deleteScheduleItem(type: string): void {
    if (type === "Pay Item") {
      this.deleteLogSwal.update({
        title: "Delete Pay Item"
      });
      this.deleteLogSwal.fire()
    } else if (type === "Deduction Item") {
      this.deleteLogSwal.update({
        title: "Delete Deduction Item"
      });
      this.deleteLogSwal.fire()
    }
  }

  private initForm() {
    this.driverForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      middleName: [null, []],
      lastName: [null, [Validators.required]],
      street1: [null, [Validators.required]],
      street2: [null, []],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      cellPhone: [null, []],
      email: [null, []],
      driverType:[null, [Validators.required]],
      status: ['Active', [Validators.required]],
      dateOfBirth: [null, []],
      driverNumber: [null, []],
      ownershipType: [null, []],
      weightUnit: [this.weightUnits[0], []],
      distanceUnit: [this.distanceUnits[0], []],
      temperatureUnit: [this.temperatureUnits[0], []],
      notes: [null, []],
      commercialDriverSinceYear: [null, []],
      experienceType: [null, []],
      drivingSchool: [null, []],
      CDLNumber: [null, []],
      licenseType: [null, []],
      licenseEndorsements: [null, []],
      applicationDate: [null, []],
      hireDate: [null, []],
      terminationDate: [null, []],
      canHireAgain: [null, []],
      bonusEligibilityDate: [null, []],
      employmentNotes: [null, []],
      insuranceCompany: [null, []],
      groupNumber: [null, []],
      idNumber: [null, []],
      licenseExpirationDate: [null, []],
      TWICCardExpirationDate: [null, []],
      hazmatEndorsementExpirationDate: [null, []],
      DOTMedicalCardExpirationDate: [null, []],
      insuranceExpirationDate: [null, []],
      lastRoadTestDate: [null, []],
      lastDrugTestDate: [null, []],
      lastAlcoholTestDate: [null, []]
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
    // console.log(this.f.zipCode.value);
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.customerService.getZipCodeData(this.f.zipCode.value).subscribe((response: any) => {
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
