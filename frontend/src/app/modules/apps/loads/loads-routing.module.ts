import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoadsComponent } from "./loads.component";
import { SearchLoadsComponent } from "./search-loads/search-loads.component";
import { CreateLoadComponent } from "./create-load/create-load.component";
import { PickupLoadsComponent } from "./pickup-loads/pickup-loads.component";
import { LoadDocumentComponent } from "./load-document/load-document.component";
import { LoadPdfComponent } from "./load-pdf/load-pdf.component";

const routes: Routes = [
  {
    path: "",
    component: LoadsComponent,
    children: [
      { path: "search", component: SearchLoadsComponent },
      { path: "create", component: CreateLoadComponent },
      { path: "pickup", component: PickupLoadsComponent },
      { path: "document", component: LoadDocumentComponent },
      { path: "pdf", component: LoadPdfComponent },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadsRoutingModule {
}
