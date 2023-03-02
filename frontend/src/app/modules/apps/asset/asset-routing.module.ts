import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AssetComponent } from "./asset.component";
import { AssetGroupsListComponent } from "./asset-groups-list/asset-groups-list.component";
import { AssetPowerUnitsListComponent } from "./asset-power-units-list/asset-power-units-list.component";
import { AssetTrailersListComponent } from "./asset-trailers-list/asset-trailers-list.component";
import { AssetDriversListComponent } from "./asset-drivers-list/asset-drivers-list.component";
import { AssetDriverCreateComponent } from "./asset-driver-create/asset-driver-create.component";
import { AssetDriverPayItemsListComponent } from "./asset-driver-pay-items-list/asset-driver-pay-items-list.component";
import { AssetDriverViolationCreateComponent } from "./asset-driver-violation-create/asset-driver-violation-create.component";
import { AssetDriverViolationListComponent } from "./asset-driver-violation-list/asset-driver-violation-list.component";
import { AssetDriverPayItemCreateComponent } from "./asset-driver-pay-item-create/asset-driver-pay-item-create.component";
import { AssetDriverDeductionItemsListComponent } from "./asset-driver-deduction-items-list/asset-driver-deduction-items-list.component";
import { AssetDriverDeductionItemCreateComponent } from "./asset-driver-deduction-item-create/asset-driver-deduction-item-create.component";
import { AssetTrailerCreateComponent } from "./asset-trailer-create/asset-trailer-create.component";
import { AssetPowerUnitCreateComponent } from "./asset-power-unit-create/asset-power-unit-create.component";
import { AssetGroupCreateComponent } from "./asset-group-create/asset-group-create.component";

const routes: Routes = [
  {
    path: "",
    component: AssetComponent,
    children: [
      { path: "groups", component: AssetGroupsListComponent },
      { path: "groups/create", component: AssetGroupCreateComponent },
      { path: "power-units", component: AssetPowerUnitsListComponent },
      { path: "power-units/create", component: AssetPowerUnitCreateComponent },
      { path: "trailers", component: AssetTrailersListComponent },
      { path: "trailers/create", component: AssetTrailerCreateComponent },
      { path: "drivers", component: AssetDriversListComponent },
      { path: "drivers/create", component: AssetDriverCreateComponent },
      { path: "drivers/pay-items/list", component: AssetDriverPayItemsListComponent },
      { path: "drivers/pay-items/create", component: AssetDriverPayItemCreateComponent },
      { path: "drivers/deduction-items/list", component: AssetDriverDeductionItemsListComponent },
      { path: "drivers/deduction-items/create", component: AssetDriverDeductionItemCreateComponent },
      { path: "drivers/violations/list", component: AssetDriverViolationListComponent },
      { path: "drivers/violations/create", component: AssetDriverViolationCreateComponent },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule {
}
