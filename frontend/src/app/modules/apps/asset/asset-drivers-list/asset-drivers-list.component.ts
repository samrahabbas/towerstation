import { ChangeDetectorRef,Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AssetsService } from "src/app/services/assets.service";
@Component({
  selector: 'app-asset-drivers-list',
  templateUrl: './asset-drivers-list.component.html',
  styleUrls: ['./asset-drivers-list.component.scss'],
  providers: [MessageService]

})
export class AssetDriversListComponent implements OnInit {


  public isLoading: boolean = false;
  // public customers: CustomerDto[] = [];
  public drivers: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');
  driversUpdate:boolean =false;
  driversDelete:boolean = false;
  driversCreate:boolean = false;

  @ViewChild('DeleteDriverSwal')
  public deleteDriverSwal: SwalComponent;

  private subs: Subscription = new Subscription();


  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly assetsService: AssetsService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {


    if(this.userData.userRole == 1 || this.userData.userRole == null ){
      this.driversUpdate= true;
      this.driversDelete= true;
      this.driversCreate= true;
    }else{
      for(let i=0; i < this.permissionData.length; i++){
  
        if(this.permissionData[i].name == "Drivers"){
          // this.userManagement = true;
          if(this.permissionData[i].privilegeId == 1){
            this.driversCreate = true;
          }
          if(this.permissionData[i].privilegeId == 3){
            this.driversUpdate = true;
          }
          if(this.permissionData[i].privilegeId == 4){
            this.driversDelete = true;
          }
   
        }
      }
    }

    this.getDrivers();

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  public editDriver(id:any): void {
    this.router.navigate(['apps/asset/drivers/create'], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async deleteDriver(id:any): Promise<void> {
    this.deleteDriverSwal.update({
      title: 'Delete Driver',
    })
    const swalResult = await this.deleteDriverSwal.fire()
    if (swalResult.value) {
      this.delete(id);
    }
  }

  private delete(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.deleteDriver(id).subscribe(
        (data:any) => {
          console.log(data);
          if(data.message == "Driver Deleted successfully"){
            this.router.navigate(['/apps/asset/drivers'])
            this.getDrivers();
            this.cdr.markForCheck();
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: data.message,
              closable: true
            });
        }else{
          // this.error = true;
        }
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
          // this.isLoading = false;
          // this.ngxSpinnerService.hide();
        })
    );
  }

  public confirmDeleteDriver(): void {
    this.ngxSpinnerService.show();
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
