import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TrailerMaintenanceLogModalComponent } from "../modals/trailer-maintenance-log-modal/trailer-maintenance-log-modal.component";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
// import { AssetService } from "../services/asset.service";
import { ZipCodeDataDto } from "../../../../../core/dto/zip-code-data.dto";
import { Subscription } from "rxjs";
import { ZipCodeService } from "src/app/services/zip-code.service";
import { AssetsService } from "src/app/services/assets.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: "app-asset-trailer-create",
  templateUrl: "./asset-trailer-create.component.html",
  styleUrls: ["./asset-trailer-create.component.scss"],
  providers: [MessageService]
})
export class AssetTrailerCreateComponent implements OnInit, OnDestroy {

  public trailerForm: FormGroup;

  public statuses: string[] = ["Active", "Inactive"];
  public ownershipTypes: string[] = ["Company", "Owner/Operator"];
  public purchasesOrLeased: string[] = ['Purchased', 'Leased'];
  public states: ZipCodeDataDto[] = [];
  public isLoading: boolean = false;
  public isEditing: boolean = false;
  public status: any;
  public trailersLog: any  = [];



  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  @ViewChild("DeleteLogSwal")
  public deleteLogSwal: SwalComponent;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ngbModal: NgbModal,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly assetsService: AssetsService,
    private readonly zipCodeService: ZipCodeService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,


  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;

  }

  ngOnInit(): void {
    this.initForm();
    this.getStates();
    this.getTrailersLog();

    
    if (this.isEditing) {
      this.getTrailerById(this.activatedRoute.snapshot.queryParams.id);
    
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.trailerForm.controls;
  }

  public openLogModal(): void {
    this.ngbModal.open(TrailerMaintenanceLogModalComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
      animation: true
    });
  }

  public editLog(id:any): void {
    const modal = this.ngbModal.open(TrailerMaintenanceLogModalComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
      animation: true,

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
      this.assetsService.deleteTrailerLog(id).subscribe(
        (data:any) => {
          console.log(data);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          window.location.reload();
          this.getTrailersLog();
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
    this.trailerForm = this.formBuilder.group({
      model: [null, [Validators.required]],
      trailerNumber: [null, [Validators.required]],
      trailerType: [null, [Validators.required]],
      generatorInfo: [null, [Validators.required]],
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
      DOTExpiration: [null, [Validators.required]],
      insuranceExpiration: [null, [Validators.required]],
      lastServiceDate: [null, [Validators.required]],
      inspectionExpiration: [null, [Validators.required]],
      registrationExpiration: [null, [Validators.required]],
      estimatedOdometerReading: [null, [Validators.required]],
      lastServiceMileage: [null, [Validators.required]]
    });
  }

  private getTrailerById(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getTrailerById(id).subscribe(
        (data:any) => {
          console.log(data);
        
          this.trailerForm.patchValue({
            firstName: data.firstName,


            model:data.model,
            trailerNumber:data.trailerNumber,
            trailerType:data.trailerType,
            generatorInfo:data.generatorInfo,
            licensePlate:data.licensePlate,
            modelYear:data.modelYear,
            vehicleIdNumber:data.vehicleIdNumber,
            // status: ['Active', [Validators.required]],
            insuranceInformation:data.insuranceInformation,
            registeredStates:data.registeredStates,
            length:data.length,
            width:data.width,
            height:data.height,
            numberOfAxles:data.numberOfAxles,
            unloadedVehicleWeight:data.unloadedVehicleWeight,
            grossVehicleWeight:data.grossVehicleWeight,
            notes:data.notes,
            ownership:data.ownership,
            isPurchased:data.isPurchased,
            purchasedFrom:data.purchasedFrom,
            soldTo:data.soldTo,
            purchasedDate:data.purchasedDate,
            soldDate:data.soldDate,
            purchasedPrice:data.purchasedPrice,
            soldPrice:data.soldPrice,
            factoryPrice:data.factoryPrice,
            currentValue:data.currentValue,
            licensePlateExpiration:data.licensePlateExpiration,
            DOTExpiration:data.DOTExpiration,
            insuranceExpiration:data.insuranceExpiration,
            lastServiceDate:data.lastServiceDate,
            inspectionExpiration:data.inspectionExpiration,
            registrationExpiration:data.registrationExpiration,
            estimatedOdometerReading:data.estimatedOdometerReading,
            lastServiceMileage:data.lastServiceMileage
            // status: data.status,
          });
          
          if(data.status == 'Active'){
            this.status = 'Active'
          }else{
            this.status = 'Inactive'

          }

       
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

  public addTrailer(){
    this.validateFields(this.trailerForm);

    if (this.trailerForm.value.trailerNumber == null) {
      // this.trailerForm.markAllAsTouched();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      return;
    }else{
      this.createTrailer();
    }



  }

  public createTrailer(){
    this.isLoading =true;
    this.ngxSpinnerService.show();
    if (this.isEditing) {
      this.subs.add(
        this.assetsService
          .updateTrailer(this.activatedRoute.snapshot.queryParams.id, this.trailerForm.value)
          .subscribe(
            (data:any) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: data.message,
                closable: true
              });
              
              this.router.navigate(['/apps/asset/trailers'])
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

      this.assetsService.addTrailers(this.trailerForm.value, this.userData.id).subscribe((response: any) => {
        console.log(response);
        if(response.message == "Trailers Added successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
            
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/asset/trailers'])
  
          // console.log("aa");
          // this.success = true;
          // this.createLoadForm.reset({});
             
          //     window.scroll({ 
          //       top: 0, 
          //       left: 0, 
          //       behavior: 'smooth' 
          //     });
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
  
  private getTrailersLog(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getTrailersLog(this.userData.id,  this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.trailersLog = res;
            console.log(this.trailersLog);

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
