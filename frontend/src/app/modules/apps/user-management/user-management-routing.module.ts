import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserManagementComponent } from "./user-management.component";
import { UsersPermissionsComponent } from "./users-permissions/users-permissions.component";
import { RolesListComponent } from "./roles-list/roles-list.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { OverviewComponent } from "../../account/overview/overview.component";
import { SettingsComponent } from "../../account/settings/settings.component";
import { RoleViewComponent } from "./role-view/role-view.component";
import { RoleCreateComponent } from "./role-create/role-create.component";
import { UserCreateComponent } from "./user-create/user-create.component";

const routes: Routes = [
  {
    path: "",
    component: UserManagementComponent,
    children: [
      { path: "permissions", component: UsersPermissionsComponent },
      { path: "roles/list", component: RolesListComponent },
      { path: "roles/view", component: RoleViewComponent },
      { path: "roles/create", component: RoleCreateComponent },
      { path: "users/list", component: UsersListComponent },
      { path: "users/create", component: UserCreateComponent },
      {
        path: "users/view", component: UserProfileComponent,
        children: [
          { path: "overview", component: OverviewComponent },
          { path: "settings", component: SettingsComponent },
          { path: "", redirectTo: "overview", pathMatch: "full" },
          { path: "**", redirectTo: "overview", pathMatch: "full" }
        ]
      },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {
}
