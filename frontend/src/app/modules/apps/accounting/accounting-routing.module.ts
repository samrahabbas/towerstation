import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AccountingComponent } from "./accounting.component";
import { DriverPayManagementComponent } from "./driver-pay-management/driver-pay-management.component";
import { CommissionsManagementComponent } from "./commissions-management/commissions-management.component";
import { AccountingManagementComponent } from "./accounting-management/accounting-management.component";
import { AccountingInvoicesComponent } from "./components/accounting-invoices/accounting-invoices.component";
import { AccountingBillsComponent } from "./components/accounting-bills/accounting-bills.component";
import { AccountingReconcileArchiveComponent } from "./components/accounting-reconcile-archive/accounting-reconcile-archive.component";
import { AccountingArchivedLoadsComponent } from "./components/accounting-archived-loads/accounting-archived-loads.component";
import { AccountingReportsComponent } from "./accounting-reports/accounting-reports.component";

const routes: Routes = [
  {
    path: "",
    component: AccountingComponent,
    children: [
      { path: "driver-pay-management", component: DriverPayManagementComponent },
      { path: "commissions-management", component: CommissionsManagementComponent },
      {
        path: "management", component: AccountingManagementComponent, children: [
          { path: "invoices", component: AccountingInvoicesComponent },
          { path: "bills", component: AccountingBillsComponent },
          { path: "reconcile-archive", component: AccountingReconcileArchiveComponent },
          { path: "archived-loads", component: AccountingArchivedLoadsComponent }
        ]
      },
      { path: "reports", component: AccountingReportsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule {
}
