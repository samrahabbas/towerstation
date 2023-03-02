import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddUserModalComponent } from "../modals/add-user-modal/add-user-modal.component";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { UserManagementService } from "src/app/services/user-management.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
  providers: [MessageService]

})
export class UsersListComponent implements OnInit {

  public isLoading: boolean = false;
  // public customers: CustomerDto[] = [];
  public users: any  = [];
  myDate = "2021-04-17T17:19:19.831Z";

  @ViewChild("DeleteUserSwal")
  private deleteUserSwal: SwalComponent;

  private subs: Subscription = new Subscription();
  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  permissions = JSON.parse(localStorage.getItem("permissions")  || '{}');
  userManagementUpdate:boolean = false;
  userManagementDelete:boolean = false;
  userManagementCreate:boolean = false;



  constructor(
    private readonly ngbModal: NgbModal,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly userManagementService: UserManagementService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

    if(this.userData.userRole == 1  || this.userData.userRole == null ){
      this.userManagementUpdate =true;
      this.userManagementDelete = true;
      this.userManagementCreate = true;
    }else{
      for(let i=0; i < this.permissions.length; i++){
  
        if(this.permissions[i].name == "User Management"){
          // this.userManagement = true;
          if(this.permissions[i].privilegeId == 1){
            this.userManagementCreate = true;
          }
          if(this.permissions[i].privilegeId == 3){
            this.userManagementUpdate = true;
          }
          if(this.permissions[i].privilegeId == 4){
            this.userManagementDelete = true;
          }
   
        }
      }
    }

    this.getAllUsers();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onAddUser(isEditing: boolean): void {
    this.router.navigate(['/apps/user-management/users/create'], {
      queryParams: {
        isEditing
      }
    })
    // const addUserModal = this.ngbModal.open(AddUserModalComponent, {
    //   centered: true,
    //   backdrop: "static",
    //   size: "lg",
    //   scrollable: true
    // });
    //
    // addUserModal.componentInstance.isEditing = isEditing;
  }

  public editUser(id:any){
    this.router.navigate(["/apps/user-management/users/create"], {
      queryParams: {
        isEditing: true,
        id
      }
    });
  }

  public async deleteUser(id:any): Promise<void> {
    this.deleteUserSwal.update({
      title: "Delete User"
    });
    const swalResult = await this.deleteUserSwal.fire();
    if (swalResult.value) {
      this.delete(id);
    }
  }

  public confirmDeleteUser(): void {

  }


  private delete(id: string): void {
    // console.log(id);
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.userManagementService.deleteUser(id).subscribe(
        (data:any) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: data.message,
            closable: true
          });
          this.getAllUsers();
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

  private getAllUsers(): void {
    this.ngxSpinnerService.show();
    this.isLoading = true;
    this.subs.add(
      this.userManagementService.getUsers(this.userData.userRole)
        .subscribe((res:any) => {
          console.log(res);
          if (res.length > 0) {
            this.users = res;
            console.log(this.users);
            this.ngxSpinnerService.hide();
            this.cdr.markForCheck();
          }else if(res.message == "Only admin access"){
            
          }
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

}
