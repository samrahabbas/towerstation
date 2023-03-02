import { ChangeDetectorRef,Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AssetsService } from "src/app/services/assets.service";

@Component({
  selector: 'app-asset-groups-list',
  templateUrl: './asset-groups-list.component.html',
  styleUrls: ['./asset-groups-list.component.scss'],
  providers: [MessageService]

})
export class AssetGroupsListComponent implements OnInit {

  public isLoading: boolean = false;
  // public customers: CustomerDto[] = [];
  public assets: any  = [];
  assetGroupsUpdate:boolean =false;
  assetGroupsDelete:boolean = false;
  assetGroupsCreate:boolean = false;
  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');

  @ViewChild('DeleteAssetGroupSwal')
  public deleteAssetGroupSwal: SwalComponent;

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
      this.assetGroupsUpdate= true;
      this.assetGroupsDelete= true;
      this.assetGroupsCreate= true;
    }else{
      for(let i=0; i < this.permissionData.length; i++){

        if(this.permissionData[i].name == "Asset Groups"){
          // this.userManagement = true;
          if(this.permissionData[i].privilegeId == 1){
            this.assetGroupsCreate = true;
          }
          if(this.permissionData[i].privilegeId == 3){
            this.assetGroupsUpdate = true;
          }
          if(this.permissionData[i].privilegeId == 4){
            this.assetGroupsDelete = true;
          }
  
        }
      }
    }
    this.getAssets();

  }
  
  private getAssets(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getAssets(this.userData.id, this.userData.userRole)
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

  public editAssetGroup(id:any): void {
    this.router.navigate(['apps/asset/groups/create'], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async deleteAssetGroup(id:any): Promise<void> {
    this.deleteAssetGroupSwal.update({
      title: 'Delete Asset Group',
    })
    const swalResult = await this.deleteAssetGroupSwal.fire();
    if (swalResult.value) {
      this.deleteAsset(id);
    }
  }

  public confirmAssetGroupDriver(): void {

  }

  private deleteAsset(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.deleteAssets(id).subscribe(
        (data:any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          this.getAssets();
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
