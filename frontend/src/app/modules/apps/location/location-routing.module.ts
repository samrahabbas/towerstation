import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LocationComponent } from "./location.component";
import { LocationCreateComponent } from "./location-create/location-create.component";
import { LocationListComponent } from "./location-list/location-list.component";
import { LocationBulkImportComponent } from "./location-bulk-import/location-bulk-import.component";

const routes: Routes = [
  {
    path: "",
    component: LocationComponent,
    children: [
      { path: "create", component: LocationCreateComponent },
      { path: "list", component: LocationListComponent },
      { path: "import", component: LocationBulkImportComponent },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
}
