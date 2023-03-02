import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocManagementComponent } from './doc-management.component';
import { DocProcessingComponent } from './doc-processing/doc-processing.component';
import { DocManagementSearchComponent } from './doc-management-search/doc-management-search.component';
import { UploadDocModalComponent } from './modals/upload-doc-modal/upload-doc-modal.component';
import { DocManagementRoutingModule } from "./doc-management-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxFilesizeModule } from "ngx-filesize";
import { NgbModalModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { FlatpickrModule } from "angularx-flatpickr";
import { ToastModule } from "primeng/toast";
import { NgxSpinnerModule } from "ngx-spinner";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";




@NgModule({
  declarations: [
    DocManagementComponent,
    DocProcessingComponent,
    DocManagementSearchComponent,
    UploadDocModalComponent
  ],
  imports: [
    CommonModule,
    DocManagementRoutingModule,
    ReactiveFormsModule,
    NgxFilesizeModule,
    NgbModalModule,
    NgSelectModule,
    NgbTooltipModule,
    FlatpickrModule,
    ToastModule,
    NgxSpinnerModule,
    SweetAlert2Module,

  ]
})
export class DocManagementModule { }
