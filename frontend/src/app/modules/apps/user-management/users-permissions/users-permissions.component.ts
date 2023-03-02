import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PermissionDto } from "../dto/permission.dto";
import { Subscription } from "rxjs";
// import { UserManagementService } from "../services/user-management.service";
import { UserManagementService } from "src/app/services/user-management.service";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import {CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
@Component({
  selector: "app-users-permissions",
  templateUrl: "./users-permissions.component.html",
  styleUrls: ["./users-permissions.component.scss"],
  providers: [MessageService]
})
export class UsersPermissionsComponent implements OnInit, OnDestroy {

  public permissions: PermissionDto[] = [];
  public searchInput: string;
  public newPermissionName: string;
  public selectedPermission: PermissionDto
  public permission_array:any = [];
  public success:boolean = false;
  public isLoading: boolean = false;


  private subs: Subscription = new Subscription();

  userId: any;
  userData: any;

  @ViewChild("AddPermissionModal")
  public addPermissionModal: TemplateRef<any>;

  @ViewChild("UpdatePermissionModal")
  public updatePermissionModal: TemplateRef<any>;

  @ViewChild('DeletePermissionSwal')
  public deletePermissionSwal: SwalComponent

  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly ngbModal: NgbModal,
    private readonly cdr: ChangeDetectorRef,
    private readonly messageService: MessageService,
    private router: Router,
    private readonly ngxSpinnerService: NgxSpinnerService,

  ) {
    // this.getPermissions();
  }
  
  ngOnInit(): void {
    this.getPermissions();
  }

  ngOnDestroy(): void {
    console.log("Unsubscribe");
    this.subs.unsubscribe();
  }

  public onAddPermission(): void {
    this.ngbModal.open(this.addPermissionModal, {
      centered: true,
      backdrop: "static"
    });
  }

  public onUpdatePermission(data: PermissionDto): void {
    this.selectedPermission = data;
    console.log(this.selectedPermission.id);
    this.ngbModal.open(this.updatePermissionModal, {
      centered: true,
      backdrop: "static"
    });
  }

  public confirmDeletePermission(): void {
    console.log("Delete permission");
    this.deleteModule()
  }

  public onDeletePermission(data: PermissionDto): void {
    // console.log({ data });
    this.selectedPermission = data
    this.deletePermissionSwal.update({
      title: `Delete ${data.name} permission`,
    })
    this.deletePermissionSwal.fire()
  }

  public addNewPermission(): void {
    if (this.newPermissionName) {
      this.addPermission();
      //  console.log(this.newPermissionName)
    }
  }

  public updatePermission(): void {
    if (this.newPermissionName) {
      this.updateModule()
    }
  }

  public dismissAllModals(): void {
    this.ngbModal.dismissAll();
  }

  // private getPermissions(): void {
  //   // this.subs.add(
  //   //   this.userManagementService.getModules()
  //   //     .subscribe(value => {
  //   //       if (value.data) {
  //   //         this.permissions = value.data;
  //   //         this.cdr.markForCheck();
  //   //         console.log(this.permissions);
  //   //       }
  //   //     }, error => {
  //   //       console.log(error);
  //   //       this.messageService.add({
  //   //         severity: "error",
  //   //         summary: "Error",
  //   //         detail: error.error?.message,
  //   //         closable: true
  //   //       });
  //   //     })
  //   // );
  // }

  // private addModule(): void {
  //   this.subs.add(
  //     this.userManagementService.addModule(this.newPermissionName)
  //       .subscribe(value => {
  //         this.getPermissions();
  //       }, error => {
  //         console.log(error);
  //         this.messageService.add({
  //           severity: "error",
  //           summary: "Error",
  //           detail: error.error?.message,
  //           closable: true
  //         });
  //       }, () => {
  //         this.dismissAllModals();
  //         this.newPermissionName = '';
  //       })
  //   );
  // }

  // CRUD DB
  private addPermission(): void{
    this.userData = JSON.parse(localStorage.getItem("user")  || '{}');

    // console.log(this.userData.id);
    this.userManagementService.addPermission(this.newPermissionName).subscribe((response: any) => {
      console.log(response);
      if(response.message == "Permission Added successfully"){
          this.dismissAllModals();
          this.newPermissionName = '';
          this.getPermissions();
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
          });
          this.router.navigate(['/apps/user-management/permissions'])
      }else{
        // this.error = true;
      }
      
    },
    (error: any) => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error?.message,
        closable: true
      });
    }, () => {
    });
  }

  
  private getPermissions(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.userManagementService.getPermission()
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.permission_array = res;
            console.log(this.permission_array = res);

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


  private deleteModule(): void {
    // console.log(this.selectedPermission);
    this.userManagementService.deletePermission(this.selectedPermission.id).subscribe((response: any) => {
      console.log(response);
      if(response.message == "Permission Deleted Successfully"){
          this.dismissAllModals();
          this.getPermissions();
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
          });
          this.router.navigate(['/apps/user-management/permissions'])
          // this.router.navigate(['/user-management/permissions']);
          // window.location.reload();
          // this.getPermissions();
        // this.success = true;
        // this.createLoadForm.reset({});
      }else{
        // this.error = true;
      }
    },
    (error: any) => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error?.message,
        closable: true
      });
    }, () => {
    });


    // this.subs.add(
    //   this.userManagementService.deleteModule(this.selectedPermission.id)
    //     .subscribe(value => {
    //       this.getPermissions();
    //     }, error => {
    //       console.log(error);
    //       this.messageService.add({
    //         severity: "error",
    //         summary: "Error",
    //         detail: error.error?.message,
    //         closable: true
    //       });
    //     }, () => {
    //       this.dismissAllModals();
    //     })
    // );
  }

  private updateModule(): void {

    this.userData = JSON.parse(localStorage.getItem("user")  || '{}');
  
    this.userManagementService.updatePermission(this.newPermissionName, this.selectedPermission.id).subscribe((response: any) => {
      // console.log(response);
      if(response.message == "Permission Updated Successfully"){
          this.dismissAllModals();
          this.newPermissionName = '';
          this.router.navigate(['/user-management/permissions']);
          this.getPermissions();
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
          });
          this.router.navigate(['/apps/user-management/permissions'])

        this.success = true;
      }else{
        // this.error = true;
      }
    },
    (error: any) => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error?.message,
        closable: true
      });
    }, () => {
    });


    // this.subs.add(
    //   this.userManagementService.updateModule(this.selectedPermission.id, this.newPermissionName)
    //     .subscribe(value => {
    //       this.getPermissions();
    //     }, error => {
    //       console.log(error);
    //       this.messageService.add({
    //         severity: "error",
    //         summary: "Error",
    //         detail: error.error?.message,
    //         closable: true
    //       });
    //     }, () => {
    //       this.dismissAllModals();
    //       this.newPermissionName = ''
    //     })
    // );
  }

}
