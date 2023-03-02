import { ChangeDetectorRef,Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AssetsService } from "src/app/services/assets.service";

@Component({
  selector: 'app-asset-driver-deduction-items-list',
  templateUrl: './asset-driver-deduction-items-list.component.html',
  styleUrls: ['./asset-driver-deduction-items-list.component.scss'],
  providers: [MessageService]

})
export class AssetDriverDeductionItemsListComponent implements OnInit {

  public isLoading: boolean = false;
  public deductions: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');


  @ViewChild('DeleteDeductionSwal')
  public deleteDeductionItemSwal: SwalComponent;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly assetsService: AssetsService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getDriverDeductions();

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  public editDeductionItem(id:any): void {
    this.router.navigate(['apps/asset/drivers/deduction-items/create'], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async deleteDeductionItem(id:any): Promise<void> {
    this.deleteDeductionItemSwal.update({
      title: 'Delete Deduction Item',
    })

    
    const swalResult = await this.deleteDeductionItemSwal.fire();
    if (swalResult.value) {
      this.deleteDeduction(id);
    }
    // this.deleteDeductionItemSwal.fire()
  }

  public confirmDeleteDeductionItem(): void {

  }

  private deleteDeduction(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.deleteDeduction(id).subscribe(
        (data:any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          // this.router.navigate(['/apps/asset/drivers/pay-items/list'])
          
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


  private getDriverDeductions(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getDriverDeductions(this.userData.id,  this.userData.userRole)
        .subscribe((res:any) => {
          console.log(res);
          if (res.length > 0) {
            this.deductions = res;
            console.log(this.deductions);

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

}
