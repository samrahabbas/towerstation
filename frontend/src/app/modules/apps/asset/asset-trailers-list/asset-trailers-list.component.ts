import { ChangeDetectorRef,Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AssetsService } from "src/app/services/assets.service";

@Component({
  selector: 'app-asset-trailers-list',
  templateUrl: './asset-trailers-list.component.html',
  styleUrls: ['./asset-trailers-list.component.scss'],
  providers: [MessageService]

})
export class AssetTrailersListComponent implements OnInit {


  public isLoading: boolean = false;
  public trailers: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');
  trailersUpdate:boolean =false;
  trailersDelete:boolean = false;
  trailersCreate:boolean = false;

  @ViewChild('DeleteTrailerSwal')
  public deleteTrailerSwal: SwalComponent;
  
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
      this.trailersUpdate= true;
      this.trailersDelete= true;
      this.trailersCreate= true;
    }else{
      for(let i=0; i < this.permissionData.length; i++){
  
        if(this.permissionData[i].name == "Trailers"){
          // this.userManagement = true;
          if(this.permissionData[i].privilegeId == 1){
            this.trailersCreate = true;
          }
          if(this.permissionData[i].privilegeId == 3){
            this.trailersUpdate = true;
          }
          if(this.permissionData[i].privilegeId == 4){
            this.trailersDelete = true;
          }
   
        }
      }
    }

    this.getTrailers();

  }


  private getTrailers(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.getTrailers(this.userData.id, this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.trailers = res;
            console.log(this.trailers);

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

  public editTrailer(id:any): void {
    this.router.navigate(['apps/asset/trailers/create'], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async deleteTrailer(id:any): Promise<void> {
    this.deleteTrailerSwal.update({
      title: 'Delete Trailer',
    })
    const swalResult = await this.deleteTrailerSwal.fire()
    if (swalResult.value) {
      this.delete(id);
    }
  }

  private delete(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.assetsService.deleteTrailer(id).subscribe(
        (data:any) => {
          console.log(data);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          this.router.navigate(['/apps/asset/trailers'])
          this.getTrailers();
          this.cdr.markForCheck();
          
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
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }
  public confirmDeleteTrailer(): void {

  }
}
