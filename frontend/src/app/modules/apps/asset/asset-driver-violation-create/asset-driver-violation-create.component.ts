import { ChangeDetectorRef,Component, OnInit,Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { FlatpickrDefaultsInterface } from "angularx-flatpickr/flatpickr-defaults.service";
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { AssetsService } from "src/app/services/assets.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-asset-driver-violation-create',
  templateUrl: './asset-driver-violation-create.component.html',
  styleUrls: ['./asset-driver-violation-create.component.scss'],
  providers: [MessageService]

})
export class AssetDriverViolationCreateComponent implements OnInit {

  
  @Input()
  public isEditing: boolean;
  public isLoading: boolean = false;
  public id:any;
  public drivers: any = [];
  public driver:any;
  public selectedDriver:any;


  
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
    private readonly assetsService: AssetsService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router

  ) { 
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;

  }

  ngOnInit(): void {
    this.initForm();
    this.getDrivers();

    if (this.isEditing) {
      this.getViolationById(this.activatedRoute.snapshot.queryParams.id);
    }

  }

  private initForm(): void {
    this.violationForm = this.formBuilder.group({
      date: [null, []],
      violationType: [null, []],
      drivers: [null, []],
      violationDescription: [null, []],
      authority: [null, []],
      location: [null, []],
      fineAmount: [null, []],
      notes: [null, []]
    });

    // if (this.isEditing) {
    //   this.violationForm.patchValue({
    //     date: new Date(),
    //     violationType: "Truck Safety",
    //     violationDescription: "Test Description",
    //     authority: "Authority",
    //     location: "Test Location",
    //     fineAmount: 59.00,
    //     notes: "Test Notes"
    //   });
    // }
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



  public addViolationLog(): void {
    // console.log(this.violationForm.value);
    this.isLoading = true;
    this.ngxSpinnerService.show();
  
    if (this.isEditing) {
      this.subs.add(
        this.assetsService
          .updateViolation(this.activatedRoute.snapshot.queryParams.id, this.violationForm.value)
          .subscribe(
            (data:any) => {
              console.log(data);
              if(data.message == "Violation Updated successfully"){
                this.messageService.add({
                  severity: "success",
                  summary: "Success",
                  detail: data.message,
                  closable: true
                });
                this.router.navigate(['/apps/asset/drivers/violations/list'])
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
            // window.location.reload();

            this.isLoading = false;
            this.ngxSpinnerService.hide();
            
            this.router.navigate(['/apps/asset/drivers/violations/list'])
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


  private getViolationById(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getViolationById(id).subscribe(
        (data:any) => {
          console.log(data);
        
          this.violationForm.patchValue({
            violationType: data.violationType,
            date: data.date,
            violationDescription: data.violationDescription,
            authority: data.authority,
            location: data.location,
            fineAmount: data.fineAmount,
            notes: data.notes
           
          });

          this.selectedDriver = data.driverId;
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
