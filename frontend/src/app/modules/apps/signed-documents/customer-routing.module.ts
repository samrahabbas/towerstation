import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CustomerComponent } from "./customer.component";
import { CustomerCreateComponent } from "./customer-create/customer-create.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerBulkImportComponent } from "./customer-bulk-import/customer-bulk-import.component";
import { CustomerShipperDirectoryComponent } from "./customer-shipper-directory/customer-shipper-directory.component";
import { CustomerShipperCreateComponent } from "./customer-shipper-create/customer-shipper-create.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { MenuComponent } from "src/app/_metronic/kt/components";

const routes: Routes = [
  {
    path: "",
    component: CustomerComponent,
    children: [
      { path: "", component: CustomerListComponent },
      { path: "list", component: CustomerListComponent },
      { path: "create", component: CustomerCreateComponent },
      { path: "edit/:id", component:CustomerEditComponent},
      { path: "signed-documents/:id", component:  CustomerShipperDirectoryComponent},
      { path: "sign", component: CustomerBulkImportComponent },
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
