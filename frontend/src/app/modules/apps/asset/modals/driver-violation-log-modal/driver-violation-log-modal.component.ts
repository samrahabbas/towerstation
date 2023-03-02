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
  selector: "app-driver-violation-log-modal",
  templateUrl: "./driver-violation-log-modal.component.html",
  styleUrls: ["./driver-violation-log-modal.component.scss"],
  providers: [MessageService]

})
export class DriverViolationLogModalComponent implements OnInit {

  @Input()
  public isEditing: boolean;
  public isLoading: boolean = false;
  public id:any;

  public violationForm: FormGroup;

  public violationTypes: string[] = ["Truck Safety", "Truck Violation", "Regulatory/Permitting", "License", "Alcohol Test", "Drug Test"];

  public flatPickrOptions: FlatpickrDefaultsInterface = {
    monthSelectorType: "dropdown",
    convertModelValue: true,
  };

  userData = JSON.parse(localStorage.getItem("user")  || '{}');

  private subs: Subscription = new Subscription();


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
    return this.violationForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  public closeModal(): void {
    this.ngbActiveModal.close()
  }

  private initForm(): void {
    this.violationForm = this.formBuilder.group({
      date: [null, []],
      violationType: [null, []],
      violationDescription: [null, []],
      authority: [null, []],
      location: [null, []],
      fineAmount: [null, []],
      notes: [null, []]
    });

    if (this.isEditing) {
      this.violationForm.patchValue({
        date: new Date(),
        violationType: "Truck Safety",
        violationDescription: "Test Description",
        authority: "Authority",
        location: "Test Location",
        fineAmount: 59.00,
        notes: "Test Notes"
      });
    }
  }

  public addViolationLog(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
  
    if (this.isEditing) {
      // this.subs.add(
      //   this.assetsService
      //     .updateTrailerLog(this.id, this.maintenanceForm.value)
      //     .subscribe(
      //       (data:any) => {
      //         console.log(data);
      //         if(data.message == "Maintenance Log Updated successfully"){
      //           this.messageService.add({
      //             severity: "success",
      //             summary: "Success",
      //             detail: data.message,
      //             closable: true
      //           });
      //           window.location.reload();
      //           this.cdr.markForCheck();
      //           this.cdr.detectChanges();
      //           this.isLoading = false;
      //           this.ngxSpinnerService.hide();

                
      //         }else{
      //           this.messageService.add({
      //             severity: "error",
      //             summary: "Error",
      //             detail: "Something went wrong",
      //             closable: true
      //           });
      //         }
      //       this.closeModal();

      //         // this.router.navigate(['/apps/asset/trailers'])
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
      //         // this.isLoading = false;
      //         // this.ngxSpinnerService.hide();
      //       })
      // );
    } 
      else {
        this.assetsService.addViolation(this.violationForm.value, this.userData.id).subscribe((response: any) => {
          console.log(response);
          if(response.message == "Violation Added successfully"){
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



}
