import { ChangeDetectorRef,Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { FlatpickrDefaultsInterface } from "angularx-flatpickr/flatpickr-defaults.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { AssetsService } from "src/app/services/assets.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";



@Component({
  selector: 'app-trailer-maintenance-log-modal',
  templateUrl: './trailer-maintenance-log-modal.component.html',
  styleUrls: ['./trailer-maintenance-log-modal.component.scss'],
  providers: [MessageService]

})
export class TrailerMaintenanceLogModalComponent implements OnInit {

  @Input()
  public isEditing: boolean

  public isLoading: boolean = false;
  public id:any;

  public maintenanceForm: FormGroup;

  userData = JSON.parse(localStorage.getItem("user")  || '{}');

  private subs: Subscription = new Subscription();

  public maintenanceTypes: string[] = [
    'Service',
    'Brakes',
    'Tires/Retread',
    'Break/Fix',
    'General Maintenance'
  ]

  public flatPickrOptions: FlatpickrDefaultsInterface = {
    monthSelectorType: "dropdown",
    convertModelValue: true,
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ngbActiveModal: NgbActiveModal,
    private readonly assetsService: AssetsService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.maintenanceForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    if (this.isEditing) {
      this.getTrailerLogById(this.id);

    }
  }

  public closeModal(): void {
    this.ngbActiveModal.close()
  }

  private initForm(): void {
    this.maintenanceForm = this.formBuilder.group({
      mileage: [null, []],
      date: [null, []],
      maintenanceType: [null, []],
      maintenancePerformed: [null, []],
      performedBy: [null, []],
      location: [null, []],
      billTo: [null, []],
      amount: [null, []],
    });


  }


  
  public addTrailerLog(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
  
    if (this.isEditing) {
      this.subs.add(
        this.assetsService
          .updateTrailerLog(this.id, this.maintenanceForm.value)
          .subscribe(
            (data:any) => {
              console.log(data);
              if(data.message == "Maintenance Log Updated successfully"){
                this.messageService.add({
                  severity: "success",
                  summary: "Success",
                  detail: data.message,
                  closable: true
                });
                window.location.reload();
                this.cdr.markForCheck();
                this.cdr.detectChanges();
                this.isLoading = false;
                this.ngxSpinnerService.hide();

                
              }else{
                this.messageService.add({
                  severity: "error",
                  summary: "Error",
                  detail: "Something went wrong",
                  closable: true
                });
              }
            this.closeModal();

              // this.router.navigate(['/apps/asset/trailers'])
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
              // this.isLoading = false;
              // this.ngxSpinnerService.hide();
            })
      );
   
      //   this.customerService
      //     .updateCustomer(this.activatedRoute.snapshot.queryParams.id, customerModel)
      //     .subscribe(
      //       (data:any) => {
      //         this.messageService.add({
      //           severity: "success",
      //           summary: "Success",
      //           detail: data.message,
      //           closable: true
      //         });
      //         this.router.navigate(['/apps/customer/list'])
      //       },
      //       (error: any) => {
      //         this.isLoading = false;
      //         this.ngxSpinnerService.hide();
      //         this.messageService.add({
      //           severity: "error",
      //           summary: "Error",
      //           detail: error,
      //           closable: true
      //         });
      //       }, () => {
      //         this.isLoading = false;
      //         this.ngxSpinnerService.hide();
      //       })
      // );
    } 
      else {
        console.log('a');
        this.assetsService.addTrailerLog(this.maintenanceForm.value, this.userData.id).subscribe((response: any) => {
          console.log(response);
          if(response.message == "Maintenance Added successfully"){
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: response.message,
              closable: true
        
            });
            this.closeModal();
            window.location.reload();

            this.isLoading = false;
            this.ngxSpinnerService.hide();
            
            // this.router.navigate(['/apps/customer/list'])
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

  private getTrailerLogById(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getTrailerLogById(id).subscribe(
        (data:any) => {
          console.log(data);

          this.maintenanceForm.patchValue({
            mileage: data.mileage,
            date: data.date,
            maintenanceType: data.maintenanceType,
            maintenancePerformed: data.maintenancePerformed,
            performedBy: data.performedBy,
            location: data.location,
            billTo: data.billTo,
            amount: data.amount,
          });
       
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
