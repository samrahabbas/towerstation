import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CountryCallingCodeDto } from "../../../../../core/dto/country-calling-code.dto";
import { ActivatedRoute,Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AssetsService } from "src/app/services/assets.service";
import { FormControl } from '@angular/forms';
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
@Component({
  selector: "app-asset-group-create",
  templateUrl: "./asset-group-create.component.html",
  styleUrls: ["./asset-group-create.component.scss"],
  providers: [MessageService]
})
export class AssetGroupCreateComponent implements OnInit {

  public assetGroupForm: FormGroup;
  public driverFormrGoup: FormGroup;
  public drivers: any = [];
  public powerUnits: any = [];
  public trailers: any = [];
  public cellPhoneCountryCodes: CountryCallingCodeDto[] = AssetGroupCreateComponent.countryCallingCodes;
  public cellPhoneCountryCodeSelected: CountryCallingCodeDto = this.cellPhoneCountryCodes[0];
  public isEditing: boolean = false;
  public isLoading: boolean = false;


  userData = JSON.parse(localStorage.getItem("user")  || '{}');

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

  private subs: Subscription = new Subscription();
  powerUnitModel = new FormControl('');
  powerUnitLicensePlate =  new FormControl('');
  driverPhone:any =  new FormControl('');
  driverEmail:any =  new FormControl('');
  driverPhone2 =  new FormControl('');
  driverEmail2 =  new FormControl('');
  trailerType =  new FormControl('');
  trailerModel =  new FormControl('');
  isAddDriver: boolean = false;
  public selectedDriver:any;
  public selectedPowerUnit:any;
  public selectedTrailer:any;



  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly router: Router,
    private readonly assetsService: AssetsService,
    private readonly cdr: ChangeDetectorRef,
    private readonly messageService: MessageService,



  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;
  }

  ngOnInit(): void {
    this.initForm();
    this.getDrivers();
    this.getPowerUnits();
    this.getDriverData();
    this.getPowerUnitData();
    this.getTrailers();
    this.getTrailerData();
    
    if (this.isEditing) {
      this.getAssetsById(this.activatedRoute.snapshot.queryParams.id);
    
    }
    // console.log(this.assetGroupForm.controls.drivers.valueChanges)
    // console.log(this.isAddDriver);
    // if(this.isAddDriver){
    // }
    // if(this.f.drivers.value[0].driver != null){

    //   console.log(this.f.drivers.value[0].driver);
    // }

  }

  public get f(): { [key: string]: AbstractControl } {
    return this.assetGroupForm.controls;
  }

  public get driversFormArray(): FormArray {
    return this.f.drivers as FormArray;
  }

  public onAddDriver(): void {
    this.isAddDriver = true;
    this.driversFormArray.push(this.createDriverFormGroup());
  }

  public onDeleteDriver(index: number): void {
    this.driversFormArray.removeAt(index);
  }

  public initForm(): void {
    this.assetGroupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      // drivers: this.formBuilder.array([this.createDriverFormGroup()]),
      driver: [null, [Validators.required]],
      driverPhone: [null, [Validators.required]],
      driverEmail: [null, [Validators.required]],
      powerUnit: [null, [Validators.required]],
      powerUnitModel: [null, [Validators.required]],
      powerUnitLicensePlate: [null, [Validators.required]],
      trailer: [null, [Validators.required]],
      trailerModel: [null, [Validators.required]],
      trailerType: [null, [Validators.required]]
    });


    if (this.isEditing) {
      this.assetGroupForm.patchValue({
        name: 'Asset Group 1',
        powerUnit: 'Power Unit 1',
        powerUnitModel: 'Power Unit Model 1',
        powerUnitLicensePlate: 'Power Unit License Plate 1',
        trailer: 'Trailer 1',
        trailerModel: 'Trailer Model 1',
        trailerType: 'Trailer Type 1'
      })
    }else{
      // console.log(this.assetGroupForm);
    }
  }

  

  private createDriverFormGroup(): FormGroup {
    return this.formBuilder.group({
      driver: [null, [Validators.required]],
      driverPhone: [null, [Validators.required]],
      driverEmail: [null, [Validators.required]]
    });
  }

  
  private getAssetsById(id: string): void {
    // console.log(id);
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getAssetById(id).subscribe(
        (data:any) => {
          console.log(data);
        
          this.assetGroupForm.patchValue({
        
            name: data.name,
            // driver: [null, [Validators.required]],
            // driverPhone: [null, [Validators.required]],
            // driverEmail: [null, [Validators.required]],
            // powerUnit: [null, [Validators.required]],
            // powerUnitModel: [null, [Validators.required]],
            // powerUnitLicensePlate: [null, [Validators.required]],
            // trailer: [null, [Validators.required]],
            // trailerModel: [null, [Validators.required]],
            // trailerType: [null, [Validators.required]]
    
          });

          console.log(data.driver);
          this.selectedDriver = parseInt(data.driver);
          this.selectedPowerUnit = parseInt(data.powerUnit);
          this.selectedTrailer = parseInt(data.trailer);
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

  private getDrivers(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getDrivers(this.userData.id,this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.drivers = res;
            // console.log(this.drivers);

            this.cdr.markForCheck();
          }
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong",
            closable: true
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }

  
  private getPowerUnits(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getPowerUnits(this.userData.id, this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.powerUnits = res;
            console.log(this.powerUnits);

            this.cdr.markForCheck();
          }
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong",
            closable: true
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }

  private getDriverData(): void {
  
    this.subs.add(this.assetGroupForm.controls.driver.valueChanges.subscribe(() => {
      this.getDriver(this.assetGroupForm.controls.driver.value);

  }));
   
  }

  
  private getDriver(driver:any): void{
    console.log(driver);
    console.log(this.isAddDriver);
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getDriverById(driver)
        .subscribe((res:any) => {
          // this.driversFormArray.get('driverEmail').setValue('2222222')
          // console.log(this.assetGroupForm.controls.drivers.value)
          // this.assetGroupForm.controls.drivers.value[0].driverPhone.setValue('222222');
          // this.f.drivers.value[0].driverPhone.setValue('2211111')
          // console.log(res.cellPhone);
          // console.log(this.driverFormrGoup);

          // console.log(this.driverPhone.value);
          
          // for(let i=0 ; i < this.driversFormArray.length; i++){
          //   this.driversFormArray.controls[i].patchValue({
          //       driverPhone: res.cellPhone,
              
          //   })
          // }
          // if(!this.isAddDriver){
          //   // this.driverFormrGoup.controls.driverPhone.setValue(res.cellPhone);
          //   this.driverPhone[1].setValue(res.cellPhone);
          //   this.driverEmail[1].setValue(res.email);
          // }else{
          //   // this.driverFormrGoup.reset();
          //   this.driverPhone.setValue('');
          //   this.driverEmail.setValue('');
          // }

            this.driverPhone.setValue(res.cellPhone);
            this.driverEmail.setValue(res.email);
        
            this.cdr.markForCheck();
            
          
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
    
  }

  private getPowerUnitData(): void {
    // console.log(this.assetGroupForm.controls.powerUnit);
    this.subs.add(this.assetGroupForm.controls.powerUnit.valueChanges.subscribe(() => {
        // console.log(this.assetGroupForm.controls.powerUnit.value);
        this.getPowerUnit(this.assetGroupForm.controls.powerUnit.value);

    }));

  }

  private getPowerUnit(powerId:any): void{

    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getPowerUnitById(powerId)
        .subscribe((res:any) => {
          // console.log(res);
          // this.f.powerUnit.setValue(res.powerUnitModel);
          // console.log(this.f.powerUnit);
          this.powerUnitModel.setValue(res.model);
          this.powerUnitLicensePlate.setValue(res.licensePlate);
          // this..patchValue({powerUnitModel:'aa', powerUnitLicensePlate:'b'});
          this.cdr.markForCheck();
            
          
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }


  private getTrailers(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getTrailers(this.userData.id, this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.trailers = res;
            console.log(this.trailers);

            this.cdr.markForCheck();
          }
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong",
            closable: true
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }

  private getTrailerData(): void {
    console.log(this.assetGroupForm.controls.trailer);
    this.subs.add(this.assetGroupForm.controls.trailer.valueChanges.subscribe(() => {
        console.log(this.assetGroupForm.controls.trailer.value);
        this.getTrailer(this.assetGroupForm.controls.trailer.value);

    }));

  }

  private getTrailer(trailerId:any): void{

    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getTrailerById(trailerId)
        .subscribe((res:any) => {
          console.log(res);
          // this.f.powerUnit.setValue(res.powerUnitModel);
          // console.log(this.f.powerUnit);
          this.trailerModel.setValue(res.model);
          this.trailerType.setValue(res.trailerType);
          // this..patchValue({powerUnitModel:'aa', powerUnitLicensePlate:'b'});
          this.cdr.markForCheck();
            
          
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }

  public addAssetsGroup():void {
    console.log(this.assetGroupForm.value);
    this.isLoading = true;
    this.ngxSpinnerService.show();
    console.log(this.assetGroupForm.value);
    this.assetsService.addAssetGroup(this.assetGroupForm.value, this.userData.id).subscribe((response: any) => {
      console.log(response);
      if(response.message == "Assets Added successfully"){
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: response.message,
          closable: true
          
        });
        this.isLoading = false;
        this.ngxSpinnerService.hide();
        this.router.navigate(['/apps/asset/groups'])

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
