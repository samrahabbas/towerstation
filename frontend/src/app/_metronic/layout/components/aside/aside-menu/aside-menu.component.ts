import { ChangeDetectorRef,Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component';
import { FormBuilder } from '@angular/forms';
import { UserManagementService } from 'src/app/services/user-management.service';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
  providers: [LoginComponent,FormBuilder]
})
export class AsideMenuComponent implements OnInit {

  public permissions:any = [];

  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;
  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  public showContent: boolean = true;
  admin:boolean;
  public user:boolean = false;
  loadBoard:boolean = false;
  create:boolean = false;
  loadRead:boolean = false;
  pickupLoad:boolean = false;
  userManagement:boolean = false;
  userManagementCreate:boolean = false;
  userManagementRead:boolean = false;
  roles:boolean = false;
  rolesCreate:boolean = false;
  rolesRead:boolean = false;
  customers:boolean = false;
  customersCreate:boolean = false;
  customersRead:boolean = false;
  shippers:boolean = false;
  shippersCreate:boolean = false;
  shippersRead:boolean = false;
  carriers:boolean = false;
  carriersCreate:boolean = false;
  carriersRead:boolean = false;
  assets:boolean = false;
  assetsCreate:boolean = false;
  assetsRead:boolean = false;
  assetGroups:boolean = false;
  assetGroupsCreate:boolean = false;
  assetGroupsRead:boolean = false;
  powerUnits:boolean = false;
  powerUnitsCreate:boolean = false;
  powerUnitsRead:boolean = false;
  trailers:boolean = false;
  trailersCreate:boolean = false;
  trailersRead:boolean = false;
  drivers:boolean = false;
  driversCreate:boolean = false;
  driversRead:boolean = false;
  location:boolean = false;
  locationCreate:boolean = false;
  locationRead:boolean = false;
  docManagement:boolean = false;
  docManagementCreate:boolean = false;
  docManagementRead:boolean = false;
  reporting:boolean = false;
  form:boolean = false;
 

  constructor(
    private loginComponent: LoginComponent,
    private readonly userManagementService: UserManagementService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
  ) {

}

  ngOnInit(): void {
    // setTimeout(()=>this.user=true, 1000);
    console.log(this.userData.userRole);
    if(this.userData.userRole == 1 || this.userData.userRole == null ){
    // this.ngxSpinnerService.show();

      // console.log(this.permissions.length);
      this.admin = true;
      this.loadBoard = true;
      this.create = true;
      this.loadRead = true;
      this.pickupLoad = true;
      this.userManagement = true;
      this.userManagementCreate = true;
      this.userManagementRead = true;
      this.roles = true;
      this.rolesCreate = true;
      this.rolesRead = true;
      this.customers = true;
      this.customersCreate = true;
      this.customersRead = true;
      this.shippers = true;
      this.shippersCreate = true;
      this.shippersRead = true;
      this.carriers = true;
      this.carriersCreate = true;
      this.carriersRead = true;
      this.assets = true;
      this.assetsCreate = true;
      this.assetsRead = true;
      this.assetGroups = true;
      this.assetGroupsCreate = true;
      this.assetGroupsRead = true;
      this.powerUnits = true;
      this.powerUnitsCreate = true;
      this.powerUnitsRead = true;
      this.trailers = true;
      this.trailersCreate = true;
      this.trailersRead = true;
      this.drivers = true;
      this.driversCreate = true;
      this.driversRead = true;
      this.location = true;
      this.locationCreate = true;
      this.locationRead = true;
      this.docManagement = true;
      this.docManagementCreate = true;
      this.docManagementRead = true;
      this.reporting = true;
      this.form = true;
      // this.ngxSpinnerService.hide();
      this.cdr.markForCheck();


     
    }else{
      this.onCheckPermission(this.userData.userRole);
      // this.user = true;
    }


  }

  public onCheckPermission(userRole:any){
    // this.ngxSpinnerService.show();
    this.userManagementService.checkRoles(userRole).subscribe((response: any) => {
      console.log(response);
      this.permissions = response;
      localStorage.setItem("permissions", JSON.stringify(this.permissions));
      

      for(let i=0; i < this.permissions.length; i++){
        if(this.permissions[i].name == "Load Board"){
          this.loadBoard = true;
          console.log(this.loadBoard);
          if(this.permissions[i].privilegeId == 1){
            this.create = true;
          }
          else if(this.permissions[i].privilegeId == 2){
            this.loadRead = true;
          }
          
        }
        if(this.permissions[i].name == "User Management"){
          this.userManagement = true;
          console.log(this.loadBoard);
          if(this.permissions[i].privilegeId == 1){
            this.userManagementCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.userManagementRead = true;
          }
   
        }
        if(this.permissions[i].name == "Roles"){
          this.roles = true;
          if(this.permissions[i].privilegeId == 1){
            this.rolesCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.rolesRead = true;
          }
          
        }
        if(this.permissions[i].name == "Customers"){
          this.customers = true;
          if(this.permissions[i].privilegeId == 1){
            this.customersCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.customersRead = true;
          }
   
        }
        if(this.permissions[i].name == "Shippers"){
          this.shippers = true;
          if(this.permissions[i].privilegeId == 1){
            this.shippersCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.shippersRead = true;
          }
          
        }
        if(this.permissions[i].name == "Carriers"){
          this.carriers = true;
          if(this.permissions[i].privilegeId == 1){
            this.carriersCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.carriersRead = true;
          }
          
        }
        if(this.permissions[i].name == "Assets"){
          this.assets = true;
          if(this.permissions[i].privilegeId == 1){
            this.assetsCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.assetsRead = true;
          }
          
        }
        if(this.permissions[i].name == "Asset Groups"){
          this.assets = true;
          this.assetGroups = true;
          if(this.permissions[i].privilegeId == 1){
            this.assetGroupsCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.assetGroupsRead = true;
          }
          
        }
        if(this.permissions[i].name == "Power Units"){
          this.assets = true;
          this.powerUnits = true;
          if(this.permissions[i].privilegeId == 1){
            this.powerUnitsCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.powerUnitsRead = true;
          }
          
        }
        if(this.permissions[i].name == "Trailers"){
          this.trailers = true;
          if(this.permissions[i].privilegeId == 1){
            this.trailersCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.trailersRead = true;
          }
   
        }
        if(this.permissions[i].name == "Drivers"){
          this.assets = true;
          this.drivers = true;
          if(this.permissions[i].privilegeId == 1){
            this.driversCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.driversRead = true;
          }
          
        }
        if(this.permissions[i].name == "Location"){
          this.location = true;
          if(this.permissions[i].privilegeId == 1){
            this.locationCreate = true;
          }
          if(this.permissions[i].privilegeId == 2){
            this.locationRead = true;
          }
          
        }
        if(this.permissions[i].name == "Doc Management"){
          this.docManagement = true;
          // if(this.permissions[i].privilegeId == 1){
            //   this.docManagementCreate = true;
            // }
            if(this.permissions[i].privilegeId == 2){
              this.docManagementRead = true;
            }
            
        }
        if(this.permissions[i].name == "Pickup Loads"){
          this.pickupLoad = true;
          // if(this.permissions[i].privilegeId == 1){
            //   this.locationCreate = true;
            // }
            // if(this.permissions[i].privilegeId == 2){
              //   this.locationRead = true;
              // }
              
        }
        if(this.permissions[i].name == "Form"){
          this.form = true;
    
        }
      }
      this.cdr.markForCheck();
      this.user = true;
      // this.ngxSpinnerService.hide();

  

      
      
    },
    (error: any) => {
      // this.messageService.add({
        //   severity: "error",
        //   summary: "Error",
        //   detail: error.error?.message,
      //   closable: true
      // });
    }, () => {
    });
  }

}
