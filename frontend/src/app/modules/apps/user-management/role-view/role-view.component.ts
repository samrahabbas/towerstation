import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AddUserModalComponent } from "../modals/add-user-modal/add-user-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { AddRoleModalComponent } from "../modals/add-role-modal/add-role-modal.component";
import { forkJoin, Subscription } from "rxjs";
import { PermissionDto } from "../dto/permission.dto";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
// import { UserManagementService } from "../services/user-management.service";
import { PrivilegeDto } from "../dto/privilege.dto";
import { Router, ActivatedRoute} from "@angular/router";
import { UserManagementService } from "src/app/services/user-management.service";

@Component({
  selector: "app-role-view",
  templateUrl: "./role-view.component.html",
  styleUrls: ["./role-view.component.scss"],
  providers: [MessageService]
})
export class RoleViewComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  public permissions: PermissionDto[] = [];
  public privileges: PrivilegeDto[] = [];
  public users: any  = [];
  public countRoles: any = '0';
  public userRoleName:any = this.activatedRoute.snapshot.queryParams.roleName;


  @ViewChild("DeleteUserSwal")
  public deleteUserSwal: SwalComponent;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly ngbModal: NgbModal,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly userManagementService: UserManagementService,
    private readonly messageService: MessageService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    // this.getPermissions();
    this.getUserRole();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onAddUser(isEditing: boolean): void {
    this.router.navigate(["/apps/user-management/users/create"], { queryParams: { isEditing } });
    // const addUserModal = this.ngbModal.open(AddUserModalComponent, {
    //   centered: true,
    //   backdrop: "static",
    //   size: "lg",
    //   scrollable: true
    // });
    //
    // addUserModal.componentInstance.isEditing = isEditing;
  }

  public deleteUser(): void {
    this.deleteUserSwal.update({
      title: "Delete User"
    });
    this.deleteUserSwal.fire();
  }

  public confirmDeleteUser(): void {

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

  
  private getUserRole(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.userManagementService.getUserByRole(this.activatedRoute.snapshot.queryParams.id)
        .subscribe((res:any) => {
          console.log(res);
          if (res.length > 0) {
            this.users = res;
            this.userRoleName = res[0].roleName;
            this.countRoles = res.length;
            console.log(this.users);

            this.cdr.markForCheck();
          }else{
            this.countRoles = '0';
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
}
