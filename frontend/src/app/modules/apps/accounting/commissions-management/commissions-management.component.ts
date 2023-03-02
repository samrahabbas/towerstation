import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-commissions-management",
  templateUrl: "./commissions-management.component.html",
  styleUrls: ["./commissions-management.component.scss"]
})
export class CommissionsManagementComponent implements OnInit {

  public roles: { text: string, value: string | null }[] = [
    {
      text: "Show All Roles",
      value: null
    },
    {
      text: "Test Role 1",
      value: "TestRole1"
    }
  ];
  public users: { text: string, value: string | null }[] = [
    {
      text: "Show All Users",
      value: null
    },
    {
      text: "Test User 1",
      value: "TestUser1"
    }
  ];
  public statuses: { text: string, value: string | null }[] = [
    {
      text: "Show All Statuses",
      value: null
    },
    {
      text: "Pending Approval",
      value: "pending"
    },
    {
      text: "Approved",
      value: "approved"
    },
    {
      text: "Paid",
      value: "paid"
    },
    {
      text: "Do Not Pay",
      value: "do-not-pay"
    }
  ];
  public invoiceStatuses: { text: string, value: string | null }[] = [
    {
      text: "Show All Invoice Statuses",
      value: null
    },
    {
      text: "Unsent",
      value: "unsent"
    },
    {
      text: "Sent",
      value: "sent"
    },
    {
      text: "Paid",
      value: "paid"
    }
  ];

  public searchFilters = {
    role: null,
    user: null,
    status: null,
    invoiceStatus: null
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
