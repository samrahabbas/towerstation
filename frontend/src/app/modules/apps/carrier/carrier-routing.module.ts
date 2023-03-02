import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CarrierComponent } from "./carrier.component";
import { CarrierCreateComponent } from "./carrier-create/carrier-create.component";
import { CarrierListComponent } from "./carrier-list/carrier-list.component";
import { CarrierBulkImportComponent } from "./carrier-bulk-import/carrier-bulk-import.component";

const routes: Routes = [
  {
    path: "",
    component: CarrierComponent,
    children: [
      { path: "create", component: CarrierCreateComponent },
      { path: "list", component: CarrierListComponent },
      { path: "import", component: CarrierBulkImportComponent },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarrierRoutingModule {
}
