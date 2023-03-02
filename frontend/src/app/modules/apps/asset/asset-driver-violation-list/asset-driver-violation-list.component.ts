import { ChangeDetectorRef,Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AssetsService } from 'src/app/services/assets.service';
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";



@Component({
  selector: 'app-asset-driver-violation-list',
  templateUrl: './asset-driver-violation-list.component.html',
  styleUrls: ['./asset-driver-violation-list.component.scss'],
  providers: [MessageService]

})
export class AssetDriverViolationListComponent implements OnInit {

  
  public isLoading: boolean = false;
  // public customers: CustomerDto[] = [];
  public violations: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');

  @ViewChild("deleteLogSwal")
  public deleteLogSwal: SwalComponent;

  private subs: Subscription = new Subscription();


  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly assetsService: AssetsService,
    private readonly cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.getViolations();
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private getViolations(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getViolations(this.userData.id,  this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.violations = res;
            console.log(this.violations);

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




  public editLog(id:any): void {
    this.router.navigate(["apps/asset/drivers/violations/create"], {
      queryParams: {
        isEditing: true,
        id
      }
    });

  }

  public async deleteLog(id:any): Promise<void> {
    console.log(id);
    this.deleteLogSwal.update({
      title: "Delete Log Entry"
    });

    const swalResult = await this.deleteLogSwal.fire();
    if (swalResult.value) {
      this.deleteViolation(id);
    }

  }

  private deleteViolation(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.deleteViolation(id).subscribe(
        (data:any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          window.location.reload();
        },
        (error: any) => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.data,
            closable: true
          });
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }



}
