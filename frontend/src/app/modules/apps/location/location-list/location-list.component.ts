import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
// import { LocationService } from "../services/location.service";
import { LocationService } from "src/app/services/location.service";
import { Subscription } from "rxjs";
import { ViewLocationDto } from "../dto/view-location.dto";

@Component({
  selector: "app-location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.scss"],
  providers: [MessageService]
})
export class LocationListComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public locations:any = [];
  private selectedLocationId: string;

  @ViewChild("DeleteLocationSwal")
  public deleteLocationSwal: SwalComponent;

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');
  locationUpdate:boolean =false;
  locationDelete:boolean = false;
  locationCreate:boolean = false;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly locationService: LocationService
  ) {
  }

  ngOnInit(): void {

    if(this.userData.userRole == 1 || this.userData.userRole == null ){
      this.locationUpdate= true;
      this.locationDelete= true;
      this.locationCreate= true;
    }else{
      for(let i=0; i < this.permissionData.length; i++){
  
        if(this.permissionData[i].name == "Location"){
          // this.userManagement = true;
          if(this.permissionData[i].privilegeId == 1){
            this.locationCreate = true;
          }
          if(this.permissionData[i].privilegeId == 3){
            this.locationUpdate = true;
          }
          if(this.permissionData[i].privilegeId == 4){
            this.locationDelete = true;
          }
   
        }
      }
    }



    this.getLocations();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public editLocation(id: string): void {
    this.router.navigate(["apps/location/create"], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async deleteLocationDialog(id: string): Promise<void> {
    this.selectedLocationId = id;
    this.deleteLocationSwal.update({
      title: "Delete location"
    });
    const swalResult = await this.deleteLocationSwal.fire();
    if (swalResult.value) {
      this.deleteLocation(id);
    }

  }

  public confirmDeleteLocation(): void {
    console.log("confirmDeleteLocation");
    // this.deleteLocation(this.selectedLocationId);
  }

  private getLocations(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.locationService.getLocations(this.userData.id, this.userData.userRole)
        .subscribe((res:any) => {
          if (res.length > 0) {
            this.locations = res;
            console.log(this.locations);

          }
          this.cdr.markForCheck();
        }, error => {
          console.log({ error });
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
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

    private deleteLocation(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.locationService.deleteLocation(id).subscribe(
        (data:any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          window.location.reload();
          this.getLocations();
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

}
