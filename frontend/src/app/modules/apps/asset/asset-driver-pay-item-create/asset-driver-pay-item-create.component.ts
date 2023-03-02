import { ChangeDetectorRef,Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RateBasisTypeDto } from "../dto/rate-basis-type.dto";
import { FlatpickrDefaultsInterface } from "angularx-flatpickr/flatpickr-defaults.service";
import { ActivatedRoute,Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AssetsService } from "src/app/services/assets.service";


@Component({
  selector: "app-asset-driver-pay-item-create",
  templateUrl: "./asset-driver-pay-item-create.component.html",
  styleUrls: ["./asset-driver-pay-item-create.component.scss"],
  providers: [MessageService]

})
export class AssetDriverPayItemCreateComponent implements OnInit {

  public payItemForm: FormGroup;
  public isEditing: boolean = false;
  public isModal: boolean = false;
  public isLoading: boolean = false;
  public drivers: any = [];



  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  public rateBasisTypes: RateBasisTypeDto[] = [
    {
      name: "All in Mileage (Carrier and Deadhead) (Unit: Miles)",
      group: "Rates based on load data"
    },
    {
      name: "All in Mileage (Carrier and Deadhead) (Unit: Kilometers)",
      group: "Rates based on load data"
    },
    {
      name: "All in Mileage (Customer and Deadhead) (Unit: Miles)",
      group: "Rates based on load data"
    },
    {
      name: "All in Mileage (Customer and Deadhead) (Unit: Kilometers)",
      group: "Rates based on load data"
    },
    {
      name: "Carrier Mileage (Unit: Miles)",
      group: "Rates based on load data"
    },
    {
      name: "Carrier Mileage (Unit: Kilometers)",
      group: "Rates based on load data"
    },
    {
      name: "Customer Mileage (Unit: Miles)",
      group: "Rates based on load data"
    },
    {
      name: "Customer Mileage (Unit: Kilometers)",
      group: "Rates based on load data"
    },
    {
      name: "Deadhead Mileage (Unit: Miles)",
      group: "Rates based on load data"
    },
    {
      name: "Deadhead Mileage (Unit: Kilometers)",
      group: "Rates based on load data"
    },
    {
      name: "Load Weight (Unit: Pounds)",
      group: "Rates based on load data"
    },
    {
      name: "Load Weight (Unit: Kilograms)",
      group: "Rates based on load data"
    },
    {
      name: "Number of Pickups",
      group: "Rates based on load data"
    },
    {
      name: "Number of Deliveries",
      group: "Rates based on load data"
    },
    {
      name: "Number of Pickups and Deliveries (All Stops)",
      group: "Rates based on load data"
    },
    {
      name: "Percentage of total load income",
      group: "Percentage of load income items"
    },
    {
      name: "Weekly",
      group: "Rates based on time intervals"
    },
    {
      name: "Bi-Weekly",
      group: "Rates based on time intervals"
    },
    {
      name: "Semi-Monthly",
      group: "Rates based on time intervals"
    },
    {
      name: "Monthly",
      group: "Rates based on time intervals"
    },
    {
      name: "Currency rate to be multiplied against an entered quantity on the load",
      group: "Misc."
    },
    {
      name: "Percentage rate to be multiplied against an entered quantity on load",
      group: "Misc."
    }
  ];

  public selectedRateBasisType: RateBasisTypeDto;
  public selectedDriver:any;
  public rateBasis:any;


  public flatPickrOptions: FlatpickrDefaultsInterface = {
    monthSelectorType: "dropdown",
    convertModelValue: true,
    mode: "range"
  };

  @Output()
  public onClose = new EventEmitter<void>();

  private subs: Subscription = new Subscription();


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

  public get f(): { [p: string]: AbstractControl } {
    return this.payItemForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.getDrivers();

    if (this.isEditing) {

      this.getPayItemById(this.activatedRoute.snapshot.queryParams.id);
     
    }

  }

  public closeModal(): void {
    this.onClose.emit();
  }

  private initForm(): void {
    this.payItemForm = this.formBuilder.group({
      rateBasis: [null, [Validators.required]],
      description: [null, [Validators.required]],
      drivers: [null, [Validators.required]],
      adjustment: [null, []],
      rate: [null, [Validators.required]],
      notes: [null, []],
      dateRange: [null, []],
      isAutoAddToLoad: [false, []]
    });

   
  }

  private getDrivers(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getDrivers(this.userData.id, this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.drivers = res;
            console.log(this.drivers);

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

  public addPayItems(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
  
      // console.log(this.userData.id);
    if (this.isEditing) {
      console.log('aa');
      this.subs.add(
        this.assetsService
          .updatePayItem(this.activatedRoute.snapshot.queryParams.id, this.payItemForm.value)
          .subscribe(
            (data:any) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: data.message,
                closable: true
              });
              this.router.navigate(['/apps/asset/drivers/pay-items/list'])
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
    } 
      else {
        this.assetsService.addPayItems(this.payItemForm.value, this.userData.id).subscribe((response: any) => {
          console.log(response);
          if(response.message == "Driver Pay Added successfully"){
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: response.message,
              closable: true
              
            });
            this.isLoading = false;
            this.ngxSpinnerService.hide();
            this.router.navigate(['/apps/asset/drivers/pay-items/list'])
            this.cdr.markForCheck();
          }else{
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

  private getPayItemById(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getPayItemById(id).subscribe(
        (data:any) => {
          console.log(data);

            this.payItemForm.patchValue({
            rateBasis: data.rateBasis,
            description: data.description,
            adjustment: data.adjustment,
            rate:data.rate,
            notes: data.notes,
            });

            this.selectedDriver = parseInt(data.drivers);
            if(data.isAutoAddToLoad = '1'){
              this.payItemForm.controls.isAutoAddToLoad.setValue(true);
            }else{
              this.payItemForm.controls.isAutoAddToLoad.setValue(false);

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

}
