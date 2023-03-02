import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { PermissionDto } from "../dto/permission.dto";
import { PrivilegeDto } from "../dto/privilege.dto";
import { forkJoin, Subscription } from "rxjs";
// import { UserManagementService } from "../services/user-management.service";
import { UserManagementService } from "src/app/services/user-management.service";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { AddRoleModalComponent } from "../modals/add-role-modal/add-role-modal.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-roles-list",
  templateUrl: "./roles-list.component.html",
  styleUrls: ["./roles-list.component.scss"],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class RolesListComponent implements OnInit, OnDestroy {

  public permissions: PermissionDto[] = [];
  public privileges: PrivilegeDto[] = [];
  public isLoading: boolean = true;
  // public isLoading: boolean = false;
  // public customers: CustomerDto[] = [];
  public roles: any  = [];
  rolesUpdate:boolean =false;
  rolesDelete:boolean = false;
  rolesCreate:boolean = false;

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissionData = JSON.parse(localStorage.getItem("permissions")  || '{}');


  @ViewChild("UpdateRoleModal")
  public updateRoleModal: TemplateRef<any>;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly ngbModal: NgbModal,
    private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly messageService: MessageService,
    private readonly userManagementService: UserManagementService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    // this.getPermissions();
    for(let i=0; i < this.permissionData.length; i++){

      if(this.permissionData[i].name == "Roles"){
        // this.userManagement = true;
        if(this.permissionData[i].privilegeId == 1){
          this.rolesCreate = true;
        }
        if(this.permissionData[i].privilegeId == 3){
          this.rolesUpdate = true;
        }
        if(this.permissionData[i].privilegeId == 4){
          this.rolesDelete = true;
        }
 
      }
    }
    this.getRoles();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onAddNewRole(): void {
    this.router.navigate(["/apps/user-management/roles/create"]);
    // const addRoleModal = this.ngbModal.open(AddRoleModalComponent, {
    //   centered: true,
    //   backdrop: "static",
    //   size: 'xl',
    //   scrollable: true,
    //   animation: true,
    // });
    //
    // (addRoleModal.componentInstance as AddRoleModalComponent).permissions = this.permissions;
    // (addRoleModal.componentInstance as AddRoleModalComponent).privileges = this.privileges;
  }

  public editRole(id:any): void {
    this.router.navigate(["/apps/user-management/roles/create"], {
      queryParams: {
        isEditing: true,
        id
      }
    });
    // const editRoleModal = this.ngbModal.open(AddRoleModalComponent, {
    //   centered: true,
    //   backdrop: "static",
    //   size: "xl",
    //   scrollable: true
    // });
    //
    // editRoleModal.componentInstance.isEditing = true;
    // (editRoleModal.componentInstance as AddRoleModalComponent).permissions = this.permissions;
    // (editRoleModal.componentInstance as AddRoleModalComponent).privileges = this.privileges;
  }

  public onUpdateRole(): void {
    this.ngbModal.open(this.updateRoleModal, {
      centered: true,
      backdrop: "static"
    });
  }

  public dismissAllModals(): void {
    this.ngbModal.dismissAll();
  }

  public viewRole(id:any, roleName:any){
    this.router.navigate(['/apps/user-management/roles/view'], {
      queryParams: {
        id, 
        roleName
      }
    });


  }

  // public submitNewRole(): void {
  //   console.log("submitNewRole");
  //   if (this.roleFormGroup.invalid) {
  //     return;
  //   }
  //   this.createNewRole();
  // }

  // private getPermissions(): void {
  //   this.isLoading = true;
  //   this.ngxSpinnerService.show();
  //   this.subs.add(forkJoin([
  //     this.userManagementService.getModules(),
  //     this.userManagementService.getPrivileges()
  //   ]).subscribe(([permissions, privileges]) => {
  //     if (permissions.data?.length > 0 && privileges.data?.length > 0) {
  //       this.permissions = permissions.data;
  //       this.privileges = privileges.data;
  //     }
  //     this.cdr.markForCheck();
  //   }, error => {
  //     console.log({ error });
  //     this.messageService.add({
  //       severity: "error",
  //       summary: "Error",
  //       detail: error.error?.message,
  //       closable: true
  //     });
  //     this.isLoading = false;
  //     this.ngxSpinnerService.hide();
  //   }, () => {
  //     this.isLoading = false;
  //     this.ngxSpinnerService.hide();
  //   }));
  //   // this.isLoading = true;
  //   // this.ngxSpinnerService.show()
  //   // this.subs.add(
  //   //   this.userManagementService.getModules()
  //   //     .subscribe(value => {
  //   //       if (value.data) {
  //   //         this.permissions = value.data;
  //   //         this.cdr.markForCheck();
  //   //       }
  //   //     }, error => {
  //   //       console.log(error);
  //   //       this.messageService.add({
  //   //         severity: "error",
  //   //         summary: "Error",
  //   //         detail: error.error?.message,
  //   //         closable: true
  //   //       });
  //   //     }, () => {
  //   //       this.isLoading = false;
  //   //       this.ngxSpinnerService.hide()
  //   //     })
  //   // );
  // }

  private createNewRole(value: any): void {
    // const value = this.roleFormGroup.value;
    const data = {
      roleName: value.roleName,
      permissions: value.permissions.map((permission: { moduleId: any; privileges: any[]; }) => {
        return {
          moduleId: permission.moduleId,
          privileges: permission.privileges.filter(privilege => privilege.isSelected)
            .map((privilege: { privilegeId: any; }) => {
              return {
                privilegeId: privilege.privilegeId
              };
            })
        };
      }).filter((permission: { privileges: string | any[]; }) => permission.privileges.length > 0)
    };

    console.log(data);
  }

  private getRoles(): void{
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.userManagementService.getRoles(this.userData.id)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.roles = res;
            console.log(this.roles);

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
