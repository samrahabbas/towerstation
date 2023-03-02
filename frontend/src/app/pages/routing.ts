import { Routes } from "@angular/router";
import { SignedDocModule } from "../modules/apps/signed-documents/customer.module";

const Routing: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule)
  },

  {
    path: "builder",
    loadChildren: () =>
      import("./builder/builder.module").then((m) => m.BuilderModule)
  },
  {
    path: "crafted/pages/profile",
    loadChildren: () =>
      import("../modules/profile/profile.module").then((m) => m.ProfileModule)
  },
  {
    path: "crafted/account",
    loadChildren: () =>
      import("../modules/account/account.module").then((m) => m.AccountModule)
  },
  {
    path: "crafted/pages/wizards",
    loadChildren: () =>
      import("../modules/wizards/wizards.module").then((m) => m.WizardsModule)
  },
  {
    path: "crafted/widgets",
    loadChildren: () =>
      import("../modules/widgets-examples/widgets-examples.module").then(
        (m) => m.WidgetsExamplesModule
      )
  },
  {
    path: "apps/chat",
    loadChildren: () =>
      import("../modules/apps/chat/chat.module").then((m) => m.ChatModule)
  },
  {
    path: "apps/user-management",
    loadChildren: () => import("../modules/apps/user-management/user-management.module").then(um => um.UserManagementModule)
  },
  {
    path: "apps/customer",
    loadChildren: () => import("../modules/apps/customer/customer.module").then(c => c.CustomerModule)
  },
  {
    path: "apps/carrier",
    loadChildren: () => import("../modules/apps/carrier/carrier.module").then(c => c.CarrierModule)
  },
  {
    path: "apps/location",
    loadChildren: () => import ("../modules/apps/location/location.module").then(l => l.LocationModule)
  },
  {
    path: "apps/form",
    loadChildren: () => import ("../modules/apps/form/form.module").then(f => f.FormModule)
  },
  {
    path: "apps/asset",
    loadChildren: () => import("../modules/apps/asset/asset.module").then(a => a.AssetModule)
  },
  {
    path: "apps/settings",
    loadChildren: () => import("../modules/apps/setting/setting.module").then(s => s.SettingModule)
  },
  {
    path: "apps/signed-documents",
    loadChildren: () => import("../modules/apps/signed-documents/customer.module").then(s => s.SignedDocModule)
  },
  {
    path: "apps/doc-management",
    loadChildren: () => import("../modules/apps/doc-management/doc-management.module").then(d => d.DocManagementModule)
  },
  {
    path: "apps/accounting",
    loadChildren: () => import("../modules/apps/accounting/accounting.module").then(a => a.AccountingModule)
  },
  {
    path: 'apps/reporting',
    loadChildren: () => import("../modules/apps/reporting/reporting.module").then(r => r.ReportingModule)
  },
  {
    path: 'apps/loads',
    loadChildren: () => import("../modules/apps/loads/loads.module").then(l => l.LoadsModule)
  },
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "error/404"
  }
];

export { Routing };
