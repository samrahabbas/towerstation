import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingRoutingModule } from "./setting-routing.module";
import { EditCompanyContactInfoComponent } from './edit-company-contact-info/edit-company-contact-info.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SettingsService } from "./services/settings.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { NgxMaskModule } from "ngx-mask";
import { NgSelectModule } from "@ng-select/ng-select";
import { InlineSVGModule } from "ng-inline-svg";
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { SelectButtonModule } from "primeng/selectbutton";
import { ImagePreloadDirective } from "../../../../core/directives/image-preload.directive";
import { ConfigureDropdownsListsComponent } from './configure-dropdowns-lists/configure-dropdowns-lists.component';
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { ColorPickerModule } from "primeng/colorpicker";
import { CheckboxModule } from "primeng/checkbox";
import { InputNumberModule } from "primeng/inputnumber";
import { DropdownModule } from "primeng/dropdown";
import { UploadCompanyLogoModalComponent } from './modals/upload-company-logo-modal/upload-company-logo-modal.component';
import { NgxFilesizeModule } from "ngx-filesize";
import { CustomizeInternationalCustomizationComponent } from './modals/customize-international-customization/customize-international-customization.component';
import { NgbModalModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { RadioButtonModule } from "primeng/radiobutton";
import { ConfigureAutomatedAlertComponent } from './configure-automated-alert/configure-automated-alert.component';
import { CreateAlertModalComponent } from './modals/create-alert-modal/create-alert-modal.component';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { SettingsCarrierConfirmationDocumentsComponent } from './settings-carrier-confirmation-documents/settings-carrier-confirmation-documents.component';
import { SettingsInvoiceDocumentsComponent } from './settings-invoice-documents/settings-invoice-documents.component';
import { SettingsCustomerConfirmationDocumentsComponent } from './settings-customer-confirmation-documents/settings-customer-confirmation-documents.component';
import { SettingsBillLadingDocumentsComponent } from './settings-bill-lading-documents/settings-bill-lading-documents.component';
import { EditorModule } from "primeng/editor";
import { EditStartingLoadNumberComponent } from './modals/edit-starting-load-number/edit-starting-load-number.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageBranchesComponent } from './manage-branches/manage-branches.component';
import { ManagePermissionGroupsComponent } from './manage-permission-groups/manage-permission-groups.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { AssignUserRolesComponent } from './assign-user-roles/assign-user-roles.component';
import { AddPermissionsGroupModalComponent } from './modals/add-permissions-group-modal/add-permissions-group-modal.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AssignUserRoleComponent } from './assign-user-role/assign-user-role.component';
import { AddBranchModalComponent } from './modals/add-branch-modal/add-branch-modal.component';
import { AddUserModalComponent } from './modals/add-user-modal/add-user-modal.component';
import { AutomatedWorkflowEngineComponent } from './automated-workflow-engine/automated-workflow-engine.component';


@NgModule({
  declarations: [
    SettingsComponent,
    EditCompanyContactInfoComponent,
    SettingsHomeComponent,
    ImagePreloadDirective,
    ConfigureDropdownsListsComponent,
    UploadCompanyLogoModalComponent,
    CustomizeInternationalCustomizationComponent,
    ConfigureAutomatedAlertComponent,
    CreateAlertModalComponent,
    SettingsCarrierConfirmationDocumentsComponent,
    SettingsInvoiceDocumentsComponent,
    SettingsCustomerConfirmationDocumentsComponent,
    SettingsBillLadingDocumentsComponent,
    EditStartingLoadNumberComponent,
    ManageUsersComponent,
    ManageBranchesComponent,
    ManagePermissionGroupsComponent,
    ManageRolesComponent,
    AssignUserRolesComponent,
    AddPermissionsGroupModalComponent,
    AddRoleComponent,
    AssignUserRoleComponent,
    AddBranchModalComponent,
    AddUserModalComponent,
    AutomatedWorkflowEngineComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ToastModule,
    NgxMaskModule,
    NgSelectModule,
    FormsModule,
    InlineSVGModule,
    SelectButtonModule,
    TableModule,
    InputTextModule,
    ColorPickerModule,
    CheckboxModule,
    InputNumberModule,
    DropdownModule,
    NgxFilesizeModule,
    NgbModalModule,
    RadioButtonModule,
    SweetAlert2Module,
    NgbTooltipModule,
    EditorModule
  ],
  providers: [
    SettingsService
  ]
})
export class SettingModule { }
