import { ChangeDetectorRef,Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AssetsService } from "src/app/services/assets.service";

@Component({
  selector: 'app-asset-driver-pay-items-list',
  templateUrl: './asset-driver-pay-items-list.component.html',
  styleUrls: ['./asset-driver-pay-items-list.component.scss'],
  providers: [MessageService]

})
export class AssetDriverPayItemsListComponent implements OnInit {

  public isLoading: boolean = false;
  public payItems: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');

  @ViewChild('DeletePayItemSwal')
  public deletePayItemSwal: SwalComponent;

  private subs: Subscription = new Subscription();


  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly assetsService: AssetsService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getDriverPayItems();

  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public editPayItem(id:any): void {
    this.router.navigate(['apps/asset/drivers/pay-items/create'], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async deletePayItem(id:any): Promise<void> {
    this.deletePayItemSwal.update({
      title: 'Delete Pay Item',
    })

    const swalResult = await this.deletePayItemSwal.fire();
    if (swalResult.value) {
      this.deletePay(id);
    }
  }


  private deletePay(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.deletePayItem(id).subscribe(
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


  public confirmDeletePayItem(): void {

  }

  private getDriverPayItems(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getDriverPayItems(this.userData.id,  this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.payItems = res;
            console.log(this.payItems);

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
