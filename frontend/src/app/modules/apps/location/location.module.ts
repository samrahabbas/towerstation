import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { LocationRoutingModule } from "./location-routing.module";
import { LocationCreateComponent } from './location-create/location-create.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationBulkImportComponent } from './location-bulk-import/location-bulk-import.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastModule } from "primeng/toast";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LocationService } from "./services/location.service";
import { NgSelectModule } from "@ng-select/ng-select";
import { InlineSVGModule } from "ng-inline-svg";
import { NgxMaskModule } from "ngx-mask";
import { LocationContactComponent } from './components/location-contact/location-contact.component';
import { ChipsModule } from "primeng/chips";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { FileSaverModule } from "ngx-filesaver";
import { NgxDropzoneModule } from "ngx-dropzone";



@NgModule({
  declarations: [
    LocationComponent,
    LocationCreateComponent,
    LocationListComponent,
    LocationBulkImportComponent,
    LocationContactComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    NgxSpinnerModule,
    ToastModule,
    ReactiveFormsModule,
    NgSelectModule,
    InlineSVGModule,
    FormsModule,
    NgxMaskModule,
    ChipsModule,
    SweetAlert2Module,
    NgbTooltipModule,
    FileSaverModule,
    NgxDropzoneModule
  ],
  providers: [
    LocationService
  ]
})
export class LocationModule { }
