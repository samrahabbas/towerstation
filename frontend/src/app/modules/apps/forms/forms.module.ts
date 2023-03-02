import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormsComponent } from './forms.component';
import { DropdownModule } from "primeng/dropdown";
import { ToastModule } from "primeng/toast";
import { NgxSpinnerModule } from "ngx-spinner";
import { InlineSVGModule } from "ng-inline-svg";
import { NgSelectModule } from "@ng-select/ng-select";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    CreateFormComponent,
    FormsComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    DropdownModule,
    ToastModule,
    NgxSpinnerModule,
    InlineSVGModule,
    NgSelectModule,
    // ReactiveFormsModule,
    // FormsModule,
  ]
})
export class FormsModule { }
