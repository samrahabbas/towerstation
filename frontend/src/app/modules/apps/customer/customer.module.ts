import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerComponent } from './customer.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerShipperDirectoryComponent } from './customer-shipper-directory/customer-shipper-directory.component';
import { CustomerBulkImportComponent } from './customer-bulk-import/customer-bulk-import.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { CustomerService } from "./services/customer.service";
import { ToastModule } from "primeng/toast";
import { NgxSpinnerModule } from "ngx-spinner";
import { InlineSVGModule } from "ng-inline-svg";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxMaskModule } from "ngx-mask";
import { SelectButtonModule } from "primeng/selectbutton";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgbCollapseModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { FileSaverModule } from "ngx-filesaver";
import { NgxDropzoneModule } from "ngx-dropzone";
import { TooltipModule } from "primeng/tooltip";
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerShipperCreateComponent } from './customer-shipper-create/customer-shipper-create.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    CustomerShipperDirectoryComponent,
    CustomerBulkImportComponent,
    CustomerEditComponent,
    CustomerShipperCreateComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,
    NgxSpinnerModule,
    InlineSVGModule,
    NgSelectModule,
    FormsModule,
    NgxMaskModule.forChild(),
    SelectButtonModule,
    SweetAlert2Module,
    NgbCollapseModule,
    FileSaverModule,
    NgxDropzoneModule,
    TooltipModule,
    NgbTooltipModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }
