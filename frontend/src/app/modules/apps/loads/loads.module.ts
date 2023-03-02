import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadsComponent } from './loads.component';
import { LoadsRoutingModule } from "./loads-routing.module";
import { SearchLoadsComponent } from './search-loads/search-loads.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastModule } from "primeng/toast";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { FlatpickrModule } from "angularx-flatpickr";
import { TableModule } from "primeng/table";
import { CreateLoadComponent } from './create-load/create-load.component';
import { PickupLoadsComponent } from './pickup-loads/pickup-loads.component';
import { LoadDocumentComponent } from './load-document/load-document.component';
import { WebcamModule } from 'ngx-webcam';
import { LoadPdfComponent } from './load-pdf/load-pdf.component';





@NgModule({
  declarations: [
    LoadsComponent,
    SearchLoadsComponent,
    CreateLoadComponent,
    PickupLoadsComponent,
    LoadDocumentComponent,
    LoadPdfComponent
  ],
  imports: [
    CommonModule,
    LoadsRoutingModule,
    NgxSpinnerModule,
    ToastModule,
    ReactiveFormsModule,
    NgSelectModule,
    FlatpickrModule,
    TableModule,
    WebcamModule
  ]
})
export class LoadsModule { }
