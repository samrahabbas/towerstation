import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { EditCompanyContactInfoComponent } from "./edit-company-contact-info/edit-company-contact-info.component";
import { SettingsHomeComponent } from "./settings-home/settings-home.component";
import { ConfigureDropdownsListsComponent } from "./configure-dropdowns-lists/configure-dropdowns-lists.component";
import { ConfigureAutomatedAlertComponent } from "./configure-automated-alert/configure-automated-alert.component";
import { SettingsBillLadingDocumentsComponent } from "./settings-bill-lading-documents/settings-bill-lading-documents.component";
import { SettingsCarrierConfirmationDocumentsComponent } from "./settings-carrier-confirmation-documents/settings-carrier-confirmation-documents.component";
import { SettingsCustomerConfirmationDocumentsComponent } from "./settings-customer-confirmation-documents/settings-customer-confirmation-documents.component";
import { SettingsInvoiceDocumentsComponent } from "./settings-invoice-documents/settings-invoice-documents.component";
import { ManagePermissionGroupsComponent } from "./manage-permission-groups/manage-permission-groups.component";
import { ManageRolesComponent } from "./manage-roles/manage-roles.component";
import { AddRoleComponent } from "./add-role/add-role.component";
import { AssignUserRolesComponent } from "./assign-user-roles/assign-user-roles.component";
import { AssignUserRoleComponent } from "./assign-user-role/assign-user-role.component";
import { ManageBranchesComponent } from "./manage-branches/manage-branches.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { AutomatedWorkflowEngineComponent } from "./automated-workflow-engine/automated-workflow-engine.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [
      { path: "home", component: SettingsHomeComponent },
      { path: "edit-company-contact-info", component: EditCompanyContactInfoComponent },
      { path: "configure-dropdowns-lists", component: ConfigureDropdownsListsComponent },
      { path: "configure-automated-alerts", component: ConfigureAutomatedAlertComponent },
      { path: "bill-lading-documents", component: SettingsBillLadingDocumentsComponent },
      { path: "carrier-confirmation-documents", component: SettingsCarrierConfirmationDocumentsComponent },
      { path: "customer-confirmation-documents", component: SettingsCustomerConfirmationDocumentsComponent },
      { path: "invoice-documents", component: SettingsInvoiceDocumentsComponent },
      { path: "manage-permission-groups", component: ManagePermissionGroupsComponent },
      { path: "manage-roles", component: ManageRolesComponent },
      { path: "add-role", component: AddRoleComponent },
      { path: "assign-user-roles", component: AssignUserRolesComponent },
      { path: "assign-user-role", component: AssignUserRoleComponent },
      { path: "manage-branches", component: ManageBranchesComponent },
      { path: "manage-users", component: ManageUsersComponent },
      { path: "automated-workflow-engine", component: AutomatedWorkflowEngineComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
}
