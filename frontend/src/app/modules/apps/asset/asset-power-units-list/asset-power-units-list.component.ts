import { ChangeDetectorRef,Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AssetsService } from "src/app/services/assets.service";

@Component({
  selector: 'app-asset-power-units-list',
  templateUrl: './asset-power-units-list.component.html',
  styleUrls: ['./asset-power-units-list.component.scss'],
  providers: [MessageService]

})
export class AssetPowerUnitsListComponent implements OnInit {

  public isLoading: boolean = false;
  public assets: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');
  powerUnitsUpdate:boolean =false;
  powerUnitsDelete:boolean = false;
  powerUnitsCreate:boolean = false;



  @ViewChild('DeletePowerUnitSwal')
  public deletePowerUnitSwal: SwalComponent;

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
      this.powerUnitsUpdate= true;
      this.powerUnitsDelete= true;
      this.powerUnitsCreate= true;
    }else{
      for(let i=0; i < this.permissionData.length; i++){
  
        if(this.permissionData[i].name == "Power Units"){
          // this.userManagement = true;
          if(this.permissionData[i].privilegeId == 1){
            this.powerUnitsCreate = true;
          }
          if(this.permissionData[i].privilegeId == 3){
            this.powerUnitsUpdate = true;
          }
          if(this.permissionData[i].privilegeId == 4){
            this.powerUnitsDelete = true;
          }
   
        }
      }
    }
  
    this.getPowerUnit();

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  public editPowerUnit(id:any): void {
    this.router.navigate(['apps/asset/power-units/create'], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async deletePowerUnit(id:any): Promise<void> {
    this.deletePowerUnitSwal.update({
      title: 'Delete Power Unit',
    })
    const swalResult = await this.deletePowerUnitSwal.fire();
    if (swalResult.value) {
      this.deletePower(id);
    }

  }

  public confirmDeletePowerUnit(): void {

  }

  private deletePower(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.deletePower(id).subscribe(
        (data:any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          this.router.navigate(['/apps/asset/power-units'])
          this.getPowerUnit();
          this.cdr.markForCheck();
          
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

  private getPowerUnit(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getPowerUnits(this.userData.id, this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.assets = res;
            console.log(this.assets);

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
