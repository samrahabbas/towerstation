import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrierService } from "./services/carrier.service";
import { CarrierCreateComponent } from './carrier-create/carrier-create.component';
import { CarrierListComponent } from './carrier-list/carrier-list.component';
import { CarrierBulkImportComponent } from './carrier-bulk-import/carrier-bulk-import.component';
import { CarrierComponent } from './carrier.component';
import { CarrierRoutingModule } from "./carrier-routing.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastModule } from "primeng/toast";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectButtonModule } from "primeng/selectbutton";
import { NgSelectModule } from "@ng-select/ng-select";
import { InlineSVGModule } from "ng-inline-svg";
import { NgxMaskModule } from "ngx-mask";
import { FlatpickrModule } from "angularx-flatpickr";
import { NgxDropzoneModule } from "ngx-dropzone";
import { FileSaverModule } from "ngx-filesaver";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { CarrierContactComponent } from './components/carrier-contact/carrier-contact.component';
import { CarrierFactoringAddressComponent } from './components/carrier-factoring-address/carrier-factoring-address.component';
import { CarrierMailingAddressComponent } from './components/carrier-mailing-address/carrier-mailing-address.component';
import { CarrierRemitAddressComponent } from './components/carrier-remit-address/carrier-remit-address.component';
import { CarrierAddressComponent } from './components/carrier-address/carrier-address.component';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    CarrierCreateComponent,
    CarrierListComponent,
    CarrierBulkImportComponent,
    CarrierComponent,
    CarrierContactComponent,
    CarrierFactoringAddressComponent,
    CarrierMailingAddressComponent,
    CarrierRemitAddressComponent,
    CarrierAddressComponent
  ],
  imports: [
    CommonModule,
    CarrierRoutingModule,
    NgxSpinnerModule,
    ToastModule,
    ReactiveFormsModule,
    SelectButtonModule,
    NgSelectModule,
    FormsModule,
    InlineSVGModule,
    NgxMaskModule.forChild(),
    FlatpickrModule,
    NgxDropzoneModule,
    FileSaverModule,
    SweetAlert2Module,
    NgbTooltipModule
  ],
  providers: [CarrierService]
})
export class CarrierModule { }
