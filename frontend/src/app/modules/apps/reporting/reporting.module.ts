import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadReportsComponent } from "./load-reports/load-reports.component";
import { CommissionReportsComponent } from "./commission-reports/commission-reports.component";
import { AdditionalCargoInsuranceReportsComponent } from "./additional-cargo-insurance-reports/additional-cargo-insurance-reports.component";
import { ReportingComponent } from "./reporting.component";
import { ReportingRoutingModule } from "./reporting-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { FlatpickrModule } from "angularx-flatpickr";
import { TableModule } from "primeng/table";


@NgModule({
  declarations: [
    LoadReportsComponent,
    CommissionReportsComponent,
    AdditionalCargoInsuranceReportsComponent,
    ReportingComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FlatpickrModule,
    TableModule,
    FormsModule
  ]
})
export class ReportingModule {
}
