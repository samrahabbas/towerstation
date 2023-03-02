import { Component, OnInit } from "@angular/core";
import { PermissionsGroupDto } from "../dto/permissions-group.dto";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddPermissionsGroupModalComponent } from "../modals/add-permissions-group-modal/add-permissions-group-modal.component";

@Component({
  selector: "app-manage-permission-groups",
  templateUrl: "./manage-permission-groups.component.html",
  styleUrls: ["./manage-permission-groups.component.scss"]
})
export class ManagePermissionGroupsComponent implements OnInit {

  public permissionsGroups: PermissionsGroupDto[] = [
    {
      group: "Dashboard",
      permissions: [
        "Allow user to View Financial Summary on the Dashboard"
      ]
    },
    {
      group: "Loads",
      permissions: [
        "Allow user to Create a new Load",
        "Allow user to Create a Load Template",
        "Allow user to Update an existing Load",
        "Allow user to Cancel a Load",
        "Allow user to Archive a Load",
        "Allow user to Unarchive a Load",
        "Allow user to Uncancel a Load",
        "Allow user to purchase cargo insurance",
        "Allow user to Post Loads to load boards",
        "Allow user to Tender load to carrier",
        "Allow user to Assign/Manage Load Roles on a load",
        "Allow user to assign Customer marked as \"Credit Hold Enabled\"",
        "Allow user to assign Carrier marked as \"Do Not Load\"",
        "Allow user to create check calls",
        "Allow user to view Financials tab & Income/Expense columns on Load Management and Load Searching/Reporting",
        "Allow user to Create a new Income/Budget line item on Load Financials",
        "Allow user to Update an existing Income/Budget line item on Load Financials",
        "Allow user to Delete an existing Income/Budget line item on Load Financials",
        "Allow user to Create a new Expense line item on Load Financials",
        "Allow user to Update an existing Expense line item on Load Financials",
        "Allow user to Delete an existing Expense line item on Load Financials",
        "Allow User to Send to Accounting Management"
      ]
    },
    {
      group: "EDI / Tenders",
      permissions: [
        "Allow user to accept or reject incoming tenders"
      ]
    },
    {
      group: "Customers",
      permissions: [
        "Allow user to Create a new Customer",
        "Allow user to Update an existing Customer",
        "Allow user to Delete an existing Customer",
        "Allow user to Bulk Import Customers",
        "Allow user to change Customer's Credit Limit, Credit Hold setting &/or Payment Terms"
      ]
    },
    {
      group: "Assets",
      permissions: [
        "Allow user to Create an Asset",
        "Allow user to Update an existing Asset",
        "Allow user to Delete an existing Asset",
        "Allow user to View Driver Pay Schedule on Driver Details page",
        "Allow user to Edit Driver Pay & Deduction Items"
      ]
    },
    {
      group: "Carriers",
      permissions: [
        "Allow user to Create a new Carrier",
        "Allow user to Update an existing Carrier",
        "Allow user to Delete an existing Carrier",
        "Allow user to Bulk Import Carriers",
        "Allow user to change Carrier's \"Do Not Load\" setting",
        "Allow user to invite/revoke carrier link to TowerStation"
      ]
    },
    {
      group: "Locations",
      permissions: [
        "Allow user to Create a new Location",
        "Allow user to Update an existing Location",
        "Allow user to Delete an existing Location",
        "Allow user to Bulk Import Locations"
      ]
    },
    {
      group: "Doc Management",
      permissions: [
        "Allow user to delete documents in Doc Management (Administrators only)"
      ]
    },
    {
      group: "Reporting",
      permissions: [
        "Allow user to View Commission Reports for themselves only",
        "Allow user to View Commission Reports for everyone",
        "Allow user to Search Loads / Run Load Reports",
        "Allow user to View Income & Gross Profit in Load Searching/Reporting Summary",
        "Allow user to Export Load Data from Load Searching/Reporting Results",
        "Allow user to Export Load Data with Charge Types as Columns from Load Searching/Reporting Results",
        "Allow user to Export Loads Summary to Excel from Financial Summary section on Load Searching/Reporting",
        "Allow user to View IFTA"
      ]
    },
    {
      group: "Accounting",
      permissions: [
        "Allow user to View AR/AP Reports",
        "Allow user to View Invoices/Bills",
        "Allow user to View Commissions Management",
        "Allow user to View Driver Pay Management",
        "Allow user to Configure and Export to QuickBooks"
      ]
    },
    {
      group: "Settings",
      permissions: [
        "Allow user to View Settings (Administrators only)"
      ]
    }
  ];

  constructor(
    private readonly ngbModal: NgbModal
  ) {
  }

  ngOnInit(): void {
  }

  public get permissions(): string[] {
    return this.permissionsGroups.reduce<string[]>((acc, group) => {
      return acc.concat([`$group|${group.group}`, ...group.permissions]);
    }, []);
  }


  public openAddPermissionsGroupModal(): void {
    this.ngbModal.open(AddPermissionsGroupModalComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false,
      animation: true,
      centered: true,
    });
  }

}
