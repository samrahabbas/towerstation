import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
// import { AssetService } from "../services/asset.service";
import { AssetsService } from "src/app/services/assets.service";
import { PowerUnitMaintenanceLogModalComponent } from "../modals/power-unit-maintenance-log-modal/power-unit-maintenance-log-modal.component";
import { ZipCodeService } from "src/app/services/zip-code.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-asset-power-unit-create',
  templateUrl: './asset-power-unit-create.component.html',
  styleUrls: ['./asset-power-unit-create.component.scss'],
  providers: [MessageService]
})
export class AssetPowerUnitCreateComponent implements OnInit {

  public powerUnitForm: FormGroup;
  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  public isEditing: boolean = false;
  public powerUnitLogs: any  = [];



  public statuses: string[] = ["Active", "Inactive"];
  public ownershipTypes: string[] = ["Company", "Owner/Operator"];
  public purchasesOrLeased: string[] = ['Purchased', 'Leased'];
  public fuelTypes: string[] = [
    'Special Diesel', 'Gasoline', 'Gasohol',
    'Propane', 'LNG', 'CNG',
    'Ethanol', 'Methanol', 'E-85',
    'M-85', 'A55', 'Bio-Diesel',
    'Hydrogen', 'Electricity'
  ];
  public states: ZipCodeDataDto[] = [];
  public isLoading: boolean = false;
  public status:any;

  @ViewChild("DeleteLogSwal")
  public deleteLogSwal: SwalComponent;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ngbModal: NgbModal,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly assetsService: AssetsService,
    private readonly cdr: ChangeDetectorRef,
    private readonly zipCodeService: ZipCodeService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,



  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;

  }

  ngOnInit(): void {
    this.initForm();
    this.getStates();
    this.getPowerUnitLog();


    if (this.isEditing) {
      this.getPowerUnitById(this.activatedRoute.snapshot.queryParams.id);
    
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.powerUnitForm.controls;
  }

  public openLogModal(): void {
    this.ngbModal.open(PowerUnitMaintenanceLogModalComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
      animation: true
    });
  }

  public editLog(id:any): void {
    const modal = this.ngbModal.open(PowerUnitMaintenanceLogModalComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
      animation: true
    });

    modal.componentInstance.isEditing = true;
    modal.componentInstance.id = id;

  }

  public async deleteLog(id:any): Promise<void> {
    this.deleteLogSwal.update({
      title: "Delete Log Entry"
    });
    const swalResult = await this.deleteLogSwal.fire()
    if (swalResult.value) {
      this.delete(id);
    }
  }

  
  private delete(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.deletePowerUnitLog(id).subscribe(
        (data:any) => {
          console.log(data);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          window.location.reload();
          this.getPowerUnitLog();
          // this.router.navigate(['/apps/asset/trailers/create'])
          this.cdr.markForCheck();
          
        },
        (error: any) => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            closable: true
          });
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }


  public confirmDeleteLog(): void {
  }


  private initForm(): void {

    console.log(this.powerUnitForm);
    this.powerUnitForm = this.formBuilder.group({
      model: [null, [Validators.required]],
      powerUnitNumber: [null, [Validators.required]],
      engineType: [null, [Validators.required]],
      transmissionType: [null, [Validators.required]],
      fuelType: [null, [Validators.required]],
      horsepower: [null, [Validators.required]],
      licensePlate: [null, [Validators.required]],
      modelYear: [null, [Validators.required]],
      vehicleIdNumber: [null, [Validators.required]],
      status: ['Active', [Validators.required]],
      insuranceInformation: [null, [Validators.required]],
      registeredStates: [null, [Validators.required]],
      length: [null, [Validators.required]],
      width: [null, [Validators.required]],
      height: [null, [Validators.required]],
      numberOfAxles: [null, [Validators.required]],
      unloadedVehicleWeight: [null, [Validators.required]],
      grossVehicleWeight: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      ownership: [null, [Validators.required]],
      isPurchased: [null, [Validators.required]],
      purchasedFrom: [null, [Validators.required]],
      soldTo: [null, [Validators.required]],
      purchasedDate: [null, [Validators.required]],
      soldDate: [null, [Validators.required]],
      purchasedPrice: [null, [Validators.required]],
      soldPrice: [null, [Validators.required]],
      factoryPrice: [null, [Validators.required]],
      currentValue: [null, [Validators.required]],
      licensePlateExpiration: [null, [Validators.required]],
      inspectionExpiration: [null, [Validators.required]],
      DOTExpiration: [null, [Validators.required]],
      registrationExpiration: [null, [Validators.required]],
      insuranceExpiration: [null, [Validators.required]],
      estimatedOdometerReading: [null, [Validators.required]],
      lastOilChangeDate: [null, [Validators.required]],
      lastOilChangeMileage: [null, [Validators.required]],
      lastTuneUpDate: [null, [Validators.required]],
      lastTuneUpMileage: [null, [Validators.required]],
      lastServiceDate: [null, [Validators.required]],
      lastServiceMileage: [null, [Validators.required]],
      keepTruckInVehicleId: [null, [Validators.required]],
    });
  }

  
  public addPowerUnit():void {
    this.validateFields(this.powerUnitForm);

    if (this.powerUnitForm.value.powerUnitNumber == null) {
      // this.trailerForm.markAllAsTouched();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      return;
    }else{
      this.createPowerUnit();
    }


    
  }

  public createPowerUnit(){
    this.isLoading = true;
    this.ngxSpinnerService.show();
    if (this.isEditing) {
      this.subs.add(
        this.assetsService
          .updatePowerUnit(this.activatedRoute.snapshot.queryParams.id, this.powerUnitForm.value)
          .subscribe(
            (data:any) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: data.message,
                closable: true
              });
              this.router.navigate(['/apps/asset/power-units'])
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
    } else{
      this.assetsService.addPowerUnit(this.powerUnitForm.value, this.userData.id).subscribe((response: any) => {
        console.log(response);
        if(response.message == "Power Unit Added successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
            
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/asset/power-units'])
  
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


  private getStates(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.zipCodeService.getStates().subscribe(
        (data:any) => {
          // console.log(data);
          this.states = data.uniqueStates;
          this.cdr.markForCheck();
        },
        (error: any) => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.states = [];
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }));
  }

  private getPowerUnitById(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getPowerUnitById(id).subscribe(
        (data:any) => {
          console.log(data);
        
          this.powerUnitForm.patchValue({
        
            model: data.model,
            powerUnitNumber: data.powerUnitNumber,
            engineType: data.engineType,
            transmissionType: data.transmissionType,
            fuelType: data.fuelType,
            horsepower: data.horsepower,
            licensePlate: data.licensePlate,
            modelYear: data.modelYear,
            vehicleIdNumber: data.vehicleIdNumber,
            status: data.status,
            insuranceInformation: data.insuranceInformation,
            registeredStates: data.registeredStates,
            length: data.length,
            width: data.width,
            height: data.height,
            numberOfAxles: data.numberOfAxles,
            unloadedVehicleWeight: data.unloadedVehicleWeight,
            grossVehicleWeight: data.grossVehicleWeight,
            notes: data.notes,
            ownership: data.ownership,
            isPurchased: data.isPurchased,
            purchasedFrom: data.purchasedFrom,
            soldTo: data.soldTo,
            purchasedDate: data.purchasedDate,
            soldDate: data.soldDate,
            purchasedPrice: data.purchasedPrice,
            soldPrice: data.soldPrice,
            factoryPrice: data.factoryPrice,
            currentValue: data.currentValue,
            licensePlateExpiration: data.licensePlateExpiration,
            inspectionExpiration: data.inspectionExpiration,
            DOTExpiration: data.DOTExpiration,
            registrationExpiration: data.registrationExpiration,
            insuranceExpiration: data.insuranceExpiration,
            estimatedOdometerReading: data.estimatedOdometerReading,
            lastOilChangeDate: data.lastOilChangeDate,
            lastOilChangeMileage: data.lastOilChangeMileage,
            lastTuneUpDate: data.lastTuneUpDate,
            lastTuneUpMileage: data.lastTuneUpMileage,
            lastServiceDate: data.lastServiceDate,
            lastServiceMileage: data.lastServiceMileage,
            keepTruckInVehicleId: data.keepTruckInVehicleId,

    
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

    
  private getPowerUnitLog(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getPowerUnitLog(this.userData.id,  this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.powerUnitLogs = res;
            console.log(this.powerUnitLogs);

            this.cdr.markForCheck();
          }
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

  
  public validateFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf: true});
      }else if(control instanceof FormGroup){
        this.validateFields(control)
      }
    })
  }
}
