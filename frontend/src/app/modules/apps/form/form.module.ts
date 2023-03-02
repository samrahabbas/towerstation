import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { DropdownModule } from "primeng/dropdown";
import { ToastModule } from "primeng/toast";
import { NgxSpinnerModule } from "ngx-spinner";
import { InlineSVGModule } from "ng-inline-svg";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UploadUserDocComponent } from './upload-user-doc/upload-user-doc.component';
import { UserDocComponent } from './user-doc/user-doc.component';



@NgModule({
  declarations: [
    FormComponent,
    CreateFormComponent,
    UploadUserDocComponent,
    UserDocComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    DropdownModule,
    ToastModule,
    NgxSpinnerModule,
    InlineSVGModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class FormModule { }
