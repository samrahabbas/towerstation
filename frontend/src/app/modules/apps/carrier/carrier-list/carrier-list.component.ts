import { ChangeDetectorRef,Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { CarrierService } from "src/app/services/carrier.service";

@Component({
  selector: 'app-carrier-list',
  templateUrl: './carrier-list.component.html',
  styleUrls: ['./carrier-list.component.scss'],
  providers: [MessageService]

})
export class CarrierListComponent implements OnInit {


  public isLoading: boolean = false;
  public carriers: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');
  carriersUpdate:boolean = false;
  carriersDelete:boolean = false;
  carriersCreate:boolean = false;


  @ViewChild('DeleteCarrierSwal')
  public deleteCarrierSwal: SwalComponent;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly carrierService: CarrierService,
    private readonly cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    // this.ngxSpinnerService.show();

    if(this.userData.userRole == 1 || this.userData.userRole == null ){
      this.carriersUpdate= true;
      this.carriersDelete= true;
      this.carriersCreate= true;
    }else{
      for(let i=0; i < this.permissionData.length; i++){
  
        if(this.permissionData[i].name == "Carriers"){
          // this.userManagement = true;
          if(this.permissionData[i].privilegeId == 1){
            this.carriersCreate = true;
          }
          if(this.permissionData[i].privilegeId == 3){
            this.carriersUpdate = true;
          }
          if(this.permissionData[i].privilegeId == 4){
            this.carriersDelete = true;
          }
   
        }
      }
    }

    this.getCarriers();

  }

  public editCarrier(id:any): void {
    this.router.navigate(['apps/carrier/create'], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async deleteCarrier(id:any): Promise<void> {
    this.deleteCarrierSwal.update({
      title: 'Delete Carrier',
    })
    // this.deleteCarrierSwal.fire();
    const swalResult = await this.deleteCarrierSwal.fire();
    if (swalResult.value) {
      this.delete(id);
    }
  }

  
  private delete(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.carrierService.deleteCarrier(id).subscribe(
        (data:any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          this.getCarriers();
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

  public confirmDeleteCarrier(): void {

  }

  private getCarriers(): void {
    this.ngxSpinnerService.show();
    this.isLoading = true;
    this.subs.add(
      this.carrierService.getCarriers(this.userData.id,  this.userData.userRole)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.carriers = res;
            // console.log(this.carriers);

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
