import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormsComponent } from './forms.component';


const routes: Routes = [
  {
    path: "",
    component: FormsComponent,
    children: [
      { path: "create", component: CreateFormComponent },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
