import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from "./asset.component";
import { AssetDriversListComponent } from './asset-drivers-list/asset-drivers-list.component';
import { AssetPowerUnitsListComponent } from './asset-power-units-list/asset-power-units-list.component';
import { AssetTrailersListComponent } from './asset-trailers-list/asset-trailers-list.component';
import { AssetGroupsListComponent } from './asset-groups-list/asset-groups-list.component';
import { AssetRoutingModule } from "./asset-routing.module";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { InlineSVGModule } from "ng-inline-svg";
import { NgbModalModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AssetDriverCreateComponent } from './asset-driver-create/asset-driver-create.component';
import { ToastModule } from "primeng/toast";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { FlatpickrModule } from "angularx-flatpickr";
import { AssetService } from "./services/asset.service";
import { DriverViolationLogModalComponent } from './modals/driver-violation-log-modal/driver-violation-log-modal.component';
import { CalendarModule } from "primeng/calendar";
import { AssetDriverPayItemsListComponent } from './asset-driver-pay-items-list/asset-driver-pay-items-list.component';
import { AssetDriverPayItemCreateComponent } from './asset-driver-pay-item-create/asset-driver-pay-item-create.component';
import { AssetDriverDeductionItemsListComponent } from './asset-driver-deduction-items-list/asset-driver-deduction-items-list.component';
import { AssetDriverDeductionItemCreateComponent } from './asset-driver-deduction-item-create/asset-driver-deduction-item-create.component';
import { AssetTrailerCreateComponent } from './asset-trailer-create/asset-trailer-create.component';
import { AssetPowerUnitCreateComponent } from './asset-power-unit-create/asset-power-unit-create.component';
import { AssetGroupCreateComponent } from './asset-group-create/asset-group-create.component';
import { TrailerMaintenanceLogModalComponent } from './modals/trailer-maintenance-log-modal/trailer-maintenance-log-modal.component';
import { PowerUnitMaintenanceLogModalComponent } from './modals/power-unit-maintenance-log-modal/power-unit-maintenance-log-modal.component';
import { AssetDriverViolationListComponent } from './asset-driver-violation-list/asset-driver-violation-list.component';
import { AssetDriverViolationCreateComponent } from './asset-driver-violation-create/asset-driver-violation-create.component';


@NgModule({
  declarations: [
    AssetComponent,
    AssetDriversListComponent,
    AssetPowerUnitsListComponent,
    AssetTrailersListComponent,
    AssetGroupsListComponent,
    AssetDriverCreateComponent,
    DriverViolationLogModalComponent,
    AssetDriverPayItemsListComponent,
    AssetDriverPayItemCreateComponent,
    AssetDriverDeductionItemsListComponent,
    AssetDriverDeductionItemCreateComponent,
    AssetTrailerCreateComponent,
    AssetPowerUnitCreateComponent,
    AssetGroupCreateComponent,
    TrailerMaintenanceLogModalComponent,
    PowerUnitMaintenanceLogModalComponent,
    AssetDriverViolationListComponent,
    AssetDriverViolationCreateComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
    SweetAlert2Module,
    InlineSVGModule,
    NgbTooltipModule,
    ToastModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgxMaskModule,
    NgxSpinnerModule,
    FlatpickrModule,
    NgbModalModule,
    CalendarModule
  ],
  providers: [
    AssetService
  ],
})
export class AssetModule { }
