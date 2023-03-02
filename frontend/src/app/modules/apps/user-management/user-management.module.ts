import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserManagementComponent } from "./user-management.component";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { UsersListComponent } from './users-list/users-list.component';
import { UsersPermissionsComponent } from './users-permissions/users-permissions.component';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { UserManagementService } from "./services/user-management.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ToastModule } from "primeng/toast";
import { RolesListComponent } from './roles-list/roles-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AddRoleModalComponent } from './modals/add-role-modal/add-role-modal.component';
import { InlineSVGModule } from "ng-inline-svg";
import { AddUserModalComponent } from './modals/add-user-modal/add-user-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DropdownMenusModule, WidgetsModule } from "../../../_metronic/partials";
import { RoleViewComponent } from './role-view/role-view.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    UsersListComponent,
    UsersPermissionsComponent,
    RolesListComponent,
    AddRoleModalComponent,
    AddUserModalComponent,
    UserProfileComponent,
    RoleViewComponent,
    RoleCreateComponent,
    UserCreateComponent,

    // Profile Overview components
    // AccountComponent,
    // OverviewComponent,
    // SettingsComponent,
    // ProfileDetailsComponent,
    // ConnectedAccountsComponent,
    // DeactivateAccountComponent,
    // EmailPreferencesComponent,
    // NotificationsComponent,
    // SignInMethodComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    SweetAlert2Module.forChild(),
    InlineSVGModule,
    ToastModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    WidgetsModule,
    DropdownMenusModule
  ],
  providers: [
    UserManagementService
  ]
})
export class UserManagementModule {}
