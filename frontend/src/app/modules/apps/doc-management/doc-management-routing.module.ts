import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DocManagementComponent } from "./doc-management.component";
import { DocProcessingComponent } from "./doc-processing/doc-processing.component";
import { DocManagementSearchComponent } from "./doc-management-search/doc-management-search.component";

const routes: Routes = [
  {
    path: "",
    component: DocManagementComponent,
    children: [
      { path: "doc-processing", component: DocProcessingComponent },
      { path: "doc-management-search", component: DocManagementSearchComponent },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocManagementRoutingModule {
}
