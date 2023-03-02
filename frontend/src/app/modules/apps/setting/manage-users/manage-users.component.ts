import { Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddUserModalComponent } from "../modals/add-user-modal/add-user-modal.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.scss"]
})
export class ManageUsersComponent implements OnInit {

  @ViewChild("DeleteUserSwal")
  public deleteUserSwal: SwalComponent;

  constructor(
    private readonly ngbModal: NgbModal,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public editUser(): void {
    this.router.navigate(["/apps/setting/users/create"], {
      queryParams: {
        isEditing: true
      }
    });
    // const modalRef = this.ngbModal.open(AddUserModalComponent, {
    //   centered: true,
    //   size: "xl",
    //   animation: true,
    //   keyboard: false,
    //   backdrop: "static"
    // });
    //
    // modalRef.componentInstance.isEditing = true;
  }

  public openAddUserModal(): void {
    this.router.navigate(['/apps/user-management/users/create'])
    // this.ngbModal.open(AddUserModalComponent, {
    //   centered: true,
    //   size: "xl",
    //   animation: true,
    //   keyboard: false,
    //   backdrop: "static"
    // });
  }

  public deleteUser(): void {
    this.deleteUserSwal.update({
      title: "Delete user"
    });
    this.deleteUserSwal.fire();
  }

  public assignUserRoles(): void {
    this.router.navigate(['/apps/settings/assign-user-roles']);
  }

  public confirmDeleteUser(): void {

  }
}
