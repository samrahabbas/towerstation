import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WidgetsModule } from '../../_metronic/partials';
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: "/add",
        component: DashboardComponent,
      }
    ]),
    WidgetsModule,
  ],
})
export class DashboardModule {}
