import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CustomerComponent } from "./customer.component";
import { CustomerCreateComponent } from "./customer-create/customer-create.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerBulkImportComponent } from "./customer-bulk-import/customer-bulk-import.component";
import { CustomerShipperDirectoryComponent } from "./customer-shipper-directory/customer-shipper-directory.component";
import { CustomerShipperCreateComponent } from "./customer-shipper-create/customer-shipper-create.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerComponent,
    children: [
      { path: "create", component: CustomerCreateComponent },
      { path: "edit/:id", component:CustomerEditComponent},
      { path: "list", component: CustomerListComponent },
      { path: "import", component: CustomerBulkImportComponent },
      { path: "shipper-directory", component: CustomerShipperDirectoryComponent },
      { path: "shipper-create", component: CustomerShipperCreateComponent },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
