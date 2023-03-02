import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-automated-workflow-engine',
  templateUrl: './automated-workflow-engine.component.html',
  styleUrls: ['./automated-workflow-engine.component.scss']
})
export class AutomatedWorkflowEngineComponent implements OnInit {
  public userAssignmentRules: any[] = [
    {
      role: null,
      disabled: false
    }
  ];
  public checkCallStatusRules: any[] = [
    {
      checkCallStatus: null,
      stopType: 'Apply to All Check Calls',
      loadStatus: null,
      truckStatus: null,
    }
  ]
  public carrierChangeTriggerRules: any[] = [
    {
      carrierAction: null,
      loadStatus: null,
      truckStatus: null,
    }
  ]
  public carrierAssignmentRules: any[] = [
    {
      carrierCondition: null,
    }
  ]
  public financialItemsCheckRules: any[] = [
    {
      loadStatuses: null,
      incomeCondition: null,
      incomeOperator: null,
      incomeValue: null,
    }
  ]
  public creditHoldCheckRule = {
    rule: null
  }
  public availableCreditRule = {
    rule: null
  }
  public noActivityRules: any[] = [
    {
      hours: null,
      loadStatus: null,
      loadStatusConditions: null
    }
  ]
  public roles: string[] = [
    'Administrator',
    'Manager',
    'User',
    'Guest'
  ]
  public checkCallStatuses: string[] = [
    "Arrived at Customs",
    "Arrived at Delivery Location",
    "Arrived at Delivery Location Loading Dock",
    "Arrived at Pick-up Location",
    "Arrived at Pick-up Location Loading Dock",
    "Arrived at Terminal Location",
    "Attempted Delivery",
    "Available for Delivery",
    "Carrier Departed Delivery Location",
    "Carrier Departed Pick-up Location with Shipment",
    "Completed Loading at Pick-up Location",
    "Completed Unloading at Delivery Location",
    "Connecting Line or Cartage Pick-up",
    "Delivered to Connecting Line",
    "Delivery Not Completed",
    "Departed Terminal Location",
    "Diverted to Air Carrier",
    "En Route to Delivery Location",
    "Estimated Date and/or Time of Arrival at Consignee's Location",
    "Estimated Delivery",
    "Estimated to Arrive at Carrier Terminal",
    "Estimated to Depart Terminal Location",
    "In-Gate",
    "Loaded on Truck",
    "Loading",
    "Out-Gate",
    "Paperwork Received - Did not Receive Shipment or Equipment",
    "Rail Arrival at Destination Intermodal Ramp",
    "Rail Departure from Origin Intermodal Ramp",
    "Received from Prior Carrier",
    "Refused by Consignee",
    "Shipment Acknowledged",
    "Shipment Cancelled",
    "Shipment Damaged",
    "Shipment Delayed",
    "Shipment Returned to Shipper",
    "Shipment has been Reconsigned",
    "Storage in Transit",
    "Tendered for Delivery",
    "Trailer Closed Out",
    "Trailer Spotted at Consignee's Location",
    "U.S. Customs Hold at In-Bond Location"
  ]
  public stopTypes: string[] = [
    "Apply to All Check Calls",
    "All Pickups",
    "First Pickup",
    "Last Pickup",
    "All Deliveries",
    "First Delivery",
    "Last Delivery"
  ]
  public loadStatuses = [
    {
      "group": "1. Planning",
      "text": "Booked - Awaiting Confirmation"
    },
    {
      "group": "1. Planning",
      "text": "Needs Carrier"
    },
    {
      "group": "1. Planning",
      "text": "Needs Driver"
    },
    {
      "group": "1. Planning",
      "text": "Pending"
    },
    {
      "group": "2. Active Load",
      "text": "Delivered"
    },
    {
      "group": "2. Active Load",
      "text": "Dispatched"
    },
    {
      "group": "2. Active Load",
      "text": "Driver Assigned"
    },
    {
      "group": "2. Active Load",
      "text": "In Transit"
    },
    {
      "group": "2. Active Load",
      "text": "Possible Claim"
    },
    {
      "group": "2. Active Load",
      "text": "Ready - Confirmation Signed"
    },
    {
      "group": "2. Active Load",
      "text": "Watch"
    },
    {
      "group": "3. Load Completed",
      "text": "Actual Claim"
    },
    {
      "group": "3. Load Completed",
      "text": "Completed"
    },
    {
      "group": "3. Load Completed",
      "text": "To Be Billed"
    }
  ]
  public truckStatuses = [
    {
      "group": "1. Carrier Setup",
      "text": "Carrier Needs Setup"
    },
    {
      "group": "1. Carrier Setup",
      "text": "Setup Packet Sent To Carrier"
    },
    {
      "group": "1. Carrier Setup",
      "text": "Insurance Verification Needed"
    },
    {
      "group": "1. Carrier Setup",
      "text": "Carrier Setup Not Complete"
    },
    {
      "group": "1. Carrier Setup",
      "text": "Carrier Setup Complete"
    },
    {
      "group": "2. Before Your Load",
      "text": "At Prior Load"
    },
    {
      "group": "2. Before Your Load",
      "text": "Dispatched"
    },
    {
      "group": "3. During Your Load",
      "text": "At Pickup - Waiting"
    },
    {
      "group": "3. During Your Load",
      "text": "At Pickup - Loading"
    },
    {
      "group": "3. During Your Load",
      "text": "On Time"
    },
    {
      "group": "3. During Your Load",
      "text": "Running Late"
    },
    {
      "group": "3. During Your Load",
      "text": "At Delivery - Waiting"
    },
    {
      "group": "3. During Your Load",
      "text": "At Delivery - Unloading"
    },
    {
      "group": "3. During Your Load",
      "text": "Broken Down"
    },
    {
      "group": "3. During Your Load",
      "text": "In Accident"
    },
    {
      "group": "4. After Your Load",
      "text": "Empty"
    },
    {
      "group": "4. After Your Load",
      "text": "Driver Paid"
    }
  ]
  public carrierActions: string[] = [
    'Assigned to a load',
    'Removed from a load',
    'Replaced on a load'
  ]
  public preventCarrierConditions: string[] = [
    "\"Do Not Load\" Status is set to DO NOT LOAD",
    "\"Do Not Load\" Status is not set to OK TO LOAD",
    "Primary Insurance has not been entered",
    "Primary Insurance has expired",
    "Cargo Insurance has not been entered",
    "Cargo Insurance has expired"
  ]
  public loadsIncomeConditions: string[] = [
    'total income',
    'total expenses'
  ]
  public loadsIncomeOperators: string[] = [
    'is less than',
    'is greater than',
    'equals'
  ]
  public creditHoldCheckConditions: string[] = [
    'is CREDIT HOLD ENABLED'
  ]

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  public addNewUserAssignmentRule(): void {
    this.userAssignmentRules.push({
      role: null,
    });
  }

  public removeUserAssignmentRule(index: number): void {
    this.userAssignmentRules.splice(index, 1);
  }

  public addNewCheckCallStatusRule(): void {
    this.checkCallStatusRules.push({
      checkCallStatus: null,
      stopType: 'Apply to All Check Calls',
      loadStatus: null,
      truckStatus: null,
    })
  }

  public removeCheckCallStatusRule(index: number): void {
    this.checkCallStatusRules.splice(index, 1);
  }

  public addNewCarrierChangeTriggerRule(): void {
    this.carrierChangeTriggerRules.push({
      carrierAction: null,
      loadStatus: null,
      truckStatus: null,
    })
  }

  public removeCarrierChangeTriggerRule(index: number): void {
    this.carrierChangeTriggerRules.splice(index, 1);
  }

  public addNewCarrierAssignmentRule(): void {
    this.carrierAssignmentRules.push({
      carrierCondition: null,
    })
  }

  public removeCarrierAssignmentRule(index: number): void {
    this.carrierAssignmentRules.splice(index, 1);
  }

  public addNewFinancialItemCheckRule(): void {
    this.financialItemsCheckRules.push({
      loadStatuses: null,
      incomeCondition: null,
      incomeOperator: null,
      incomeValue: null,
    })
  }

  public removeFinancialItemCheckRule(index: number): void {
    this.financialItemsCheckRules.splice(index, 1);
  }

  public addNewNoActivityRule(): void {
    this.noActivityRules.push({
      hours: null,
      loadStatus: null,
      loadStatusConditions: null,
    })
  }

  public removeNoActivityRule(index: number): void {
    this.noActivityRules.splice(index, 1);
  }

}
