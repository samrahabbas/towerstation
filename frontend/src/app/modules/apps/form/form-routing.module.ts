import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { UploadUserDocComponent } from './upload-user-doc/upload-user-doc.component';
import { UserDocComponent } from './user-doc/user-doc.component';
import { FormComponent } from './form.component';

const routes: Routes = [
  {
    path: "",
    component: FormComponent,
    children: [
      { path: "create", component: CreateFormComponent },
      { path: "list", component: UploadUserDocComponent },
      { path: "upload", component: UserDocComponent },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
