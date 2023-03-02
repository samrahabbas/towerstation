import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingComponent } from './accounting.component';
import { AccountingRoutingModule } from "./accounting-routing.module";
import { DriverPayManagementComponent } from './driver-pay-management/driver-pay-management.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlatpickrModule } from "angularx-flatpickr";
import { NgSelectModule } from "@ng-select/ng-select";
import { CommissionsManagementComponent } from './commissions-management/commissions-management.component';
import { AccountingManagementComponent } from './accounting-management/accounting-management.component';
import { AccountingInvoicesComponent } from './components/accounting-invoices/accounting-invoices.component';
import { AccountingBillsComponent } from './components/accounting-bills/accounting-bills.component';
import { AccountingReconcileArchiveComponent } from './components/accounting-reconcile-archive/accounting-reconcile-archive.component';
import { AccountingArchivedLoadsComponent } from './components/accounting-archived-loads/accounting-archived-loads.component';
import { SelectButtonModule } from "primeng/selectbutton";
import { AccountingReportsComponent } from './accounting-reports/accounting-reports.component';
import { TableModule } from "primeng/table";



@NgModule({
  declarations: [
    AccountingComponent,
    DriverPayManagementComponent,
    CommissionsManagementComponent,
    AccountingManagementComponent,
    AccountingInvoicesComponent,
    AccountingBillsComponent,
    AccountingReconcileArchiveComponent,
    AccountingArchivedLoadsComponent,
    AccountingReportsComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    ReactiveFormsModule,
    FlatpickrModule,
    NgSelectModule,
    FormsModule,
    SelectButtonModule,
    TableModule
  ]
})
export class AccountingModule { }
