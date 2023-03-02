import { Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: 'app-assign-user-roles',
  templateUrl: './assign-user-roles.component.html',
  styleUrls: ['./assign-user-roles.component.scss']
})
export class AssignUserRolesComponent implements OnInit {

  @ViewChild('DisableRoleSwal')
  public disableRoleSwal: SwalComponent;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public editRole(): void {
    this.router.navigate(['apps/settings/add-role'], {
      queryParams: {
        isEditing: true
      }
    });
  }

  public disableRole(): void {
    this.disableRoleSwal.update({
      title: 'Disable role',
    })
    this.disableRoleSwal.fire()
  }

  public confirmDisableRole(): void {

  }
}
