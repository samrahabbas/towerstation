import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ReportingComponent } from "./reporting.component";
import { LoadReportsComponent } from "./load-reports/load-reports.component";
import { CommissionReportsComponent } from "./commission-reports/commission-reports.component";
import { AdditionalCargoInsuranceReportsComponent } from "./additional-cargo-insurance-reports/additional-cargo-insurance-reports.component";

const routes: Routes = [
  {
    path: "",
    component: ReportingComponent,
    children: [
      { path: "loads", component: LoadReportsComponent },
      { path: "commissions", component: CommissionReportsComponent },
      { path: "additional-cargo-insurance", component: AdditionalCargoInsuranceReportsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule {
}
