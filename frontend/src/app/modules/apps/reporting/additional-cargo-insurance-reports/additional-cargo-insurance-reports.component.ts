import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-additional-cargo-insurance-reports',
  templateUrl: './additional-cargo-insurance-reports.component.html',
  styleUrls: ['./additional-cargo-insurance-reports.component.scss']
})
export class AdditionalCargoInsuranceReportsComponent implements OnInit {
  public form: FormGroup
  public savedReports: string[] = [
    'Report 1',
    'Report 2',
    'Report 3',
  ]
  public origins = [
    {
      "text": "All Origins",
      "value": "All Origins"
    },
    {
      "text": "Alabama",
      "value": "AL"
    },
    {
      "text": "Alaska",
      "value": "AK"
    },
    {
      "text": "Arizona",
      "value": "AZ"
    },
    {
      "text": "Arkansas",
      "value": "AR"
    },
    {
      "text": "California",
      "value": "CA"
    },
    {
      "text": "Colorado",
      "value": "CO"
    },
    {
      "text": "Connecticut",
      "value": "CT"
    },
    {
      "text": "Delaware",
      "value": "DE"
    },
    {
      "text": "District Of Columbia",
      "value": "DC"
    },
    {
      "text": "Florida",
      "value": "FL"
    },
    {
      "text": "Georgia",
      "value": "GA"
    },
    {
      "text": "Hawaii",
      "value": "HI"
    },
    {
      "text": "Idaho",
      "value": "ID"
    },
    {
      "text": "Illinois",
      "value": "IL"
    },
    {
      "text": "Indiana",
      "value": "IN"
    },
    {
      "text": "Iowa",
      "value": "IA"
    },
    {
      "text": "Kansas",
      "value": "KS"
    },
    {
      "text": "Kentucky",
      "value": "KY"
    },
    {
      "text": "Louisiana",
      "value": "LA"
    },
    {
      "text": "Maine",
      "value": "ME"
    },
    {
      "text": "Maryland",
      "value": "MD"
    },
    {
      "text": "Massachusetts",
      "value": "MA"
    },
    {
      "text": "Michigan",
      "value": "MI"
    },
    {
      "text": "Minnesota",
      "value": "MN"
    },
    {
      "text": "Mississippi",
      "value": "MS"
    },
    {
      "text": "Missouri",
      "value": "MO"
    },
    {
      "text": "Montana",
      "value": "MT"
    },
    {
      "text": "Nebraska",
      "value": "NE"
    },
    {
      "text": "Nevada",
      "value": "NV"
    },
    {
      "text": "New Hampshire",
      "value": "NH"
    },
    {
      "text": "New Jersey",
      "value": "NJ"
    },
    {
      "text": "New Mexico",
      "value": "NM"
    },
    {
      "text": "New York",
      "value": "NY"
    },
    {
      "text": "North Carolina",
      "value": "NC"
    },
    {
      "text": "North Dakota",
      "value": "ND"
    },
    {
      "text": "Ohio",
      "value": "OH"
    },
    {
      "text": "Oklahoma",
      "value": "OK"
    },
    {
      "text": "Oregon",
      "value": "OR"
    },
    {
      "text": "Pennsylvania",
      "value": "PA"
    },
    {
      "text": "Rhode Island",
      "value": "RI"
    },
    {
      "text": "South Carolina",
      "value": "SC"
    },
    {
      "text": "South Dakota",
      "value": "SD"
    },
    {
      "text": "Tennessee",
      "value": "TN"
    },
    {
      "text": "Texas",
      "value": "TX"
    },
    {
      "text": "Utah",
      "value": "UT"
    },
    {
      "text": "Vermont",
      "value": "VT"
    },
    {
      "text": "Virginia",
      "value": "VA"
    },
    {
      "text": "Washington",
      "value": "WA"
    },
    {
      "text": "West Virginia",
      "value": "WV"
    },
    {
      "text": "Wisconsin",
      "value": "WI"
    },
    {
      "text": "Wyoming",
      "value": "WY"
    },
    {
      "text": "Alberta",
      "value": "AB"
    },
    {
      "text": "British Columbia",
      "value": "BC"
    },
    {
      "text": "Manitoba",
      "value": "MB"
    },
    {
      "text": "New Brunswick",
      "value": "NB"
    },
    {
      "text": "Newfoundland and Labrador",
      "value": "NL"
    },
    {
      "text": "Nova Scotia",
      "value": "NS"
    },
    {
      "text": "Northwest Territories",
      "value": "NT"
    },
    {
      "text": "Nunavut",
      "value": "NU"
    },
    {
      "text": "Ontario",
      "value": "ON"
    },
    {
      "text": "Prince Edward Island",
      "value": "PE"
    },
    {
      "text": "Quebec",
      "value": "QC"
    },
    {
      "text": "Saskatchewan",
      "value": "SK"
    },
    {
      "text": "Yukon",
      "value": "YT"
    }
  ]
  public destinations = [
    {
      "text": "All Destinations",
      "value": "All Destination"
    },
    {
      "text": "Alabama",
      "value": "AL"
    },
    {
      "text": "Alaska",
      "value": "AK"
    },
    {
      "text": "Arizona",
      "value": "AZ"
    },
    {
      "text": "Arkansas",
      "value": "AR"
    },
    {
      "text": "California",
      "value": "CA"
    },
    {
      "text": "Colorado",
      "value": "CO"
    },
    {
      "text": "Connecticut",
      "value": "CT"
    },
    {
      "text": "Delaware",
      "value": "DE"
    },
    {
      "text": "District Of Columbia",
      "value": "DC"
    },
    {
      "text": "Florida",
      "value": "FL"
    },
    {
      "text": "Georgia",
      "value": "GA"
    },
    {
      "text": "Hawaii",
      "value": "HI"
    },
    {
      "text": "Idaho",
      "value": "ID"
    },
    {
      "text": "Illinois",
      "value": "IL"
    },
    {
      "text": "Indiana",
      "value": "IN"
    },
    {
      "text": "Iowa",
      "value": "IA"
    },
    {
      "text": "Kansas",
      "value": "KS"
    },
    {
      "text": "Kentucky",
      "value": "KY"
    },
    {
      "text": "Louisiana",
      "value": "LA"
    },
    {
      "text": "Maine",
      "value": "ME"
    },
    {
      "text": "Maryland",
      "value": "MD"
    },
    {
      "text": "Massachusetts",
      "value": "MA"
    },
    {
      "text": "Michigan",
      "value": "MI"
    },
    {
      "text": "Minnesota",
      "value": "MN"
    },
    {
      "text": "Mississippi",
      "value": "MS"
    },
    {
      "text": "Missouri",
      "value": "MO"
    },
    {
      "text": "Montana",
      "value": "MT"
    },
    {
      "text": "Nebraska",
      "value": "NE"
    },
    {
      "text": "Nevada",
      "value": "NV"
    },
    {
      "text": "New Hampshire",
      "value": "NH"
    },
    {
      "text": "New Jersey",
      "value": "NJ"
    },
    {
      "text": "New Mexico",
      "value": "NM"
    },
    {
      "text": "New York",
      "value": "NY"
    },
    {
      "text": "North Carolina",
      "value": "NC"
    },
    {
      "text": "North Dakota",
      "value": "ND"
    },
    {
      "text": "Ohio",
      "value": "OH"
    },
    {
      "text": "Oklahoma",
      "value": "OK"
    },
    {
      "text": "Oregon",
      "value": "OR"
    },
    {
      "text": "Pennsylvania",
      "value": "PA"
    },
    {
      "text": "Rhode Island",
      "value": "RI"
    },
    {
      "text": "South Carolina",
      "value": "SC"
    },
    {
      "text": "South Dakota",
      "value": "SD"
    },
    {
      "text": "Tennessee",
      "value": "TN"
    },
    {
      "text": "Texas",
      "value": "TX"
    },
    {
      "text": "Utah",
      "value": "UT"
    },
    {
      "text": "Vermont",
      "value": "VT"
    },
    {
      "text": "Virginia",
      "value": "VA"
    },
    {
      "text": "Washington",
      "value": "WA"
    },
    {
      "text": "West Virginia",
      "value": "WV"
    },
    {
      "text": "Wisconsin",
      "value": "WI"
    },
    {
      "text": "Wyoming",
      "value": "WY"
    },
    {
      "text": "Alberta",
      "value": "AB"
    },
    {
      "text": "British Columbia",
      "value": "BC"
    },
    {
      "text": "Manitoba",
      "value": "MB"
    },
    {
      "text": "New Brunswick",
      "value": "NB"
    },
    {
      "text": "Newfoundland and Labrador",
      "value": "NL"
    },
    {
      "text": "Nova Scotia",
      "value": "NS"
    },
    {
      "text": "Northwest Territories",
      "value": "NT"
    },
    {
      "text": "Nunavut",
      "value": "NU"
    },
    {
      "text": "Ontario",
      "value": "ON"
    },
    {
      "text": "Prince Edward Island",
      "value": "PE"
    },
    {
      "text": "Quebec",
      "value": "QC"
    },
    {
      "text": "Saskatchewan",
      "value": "SK"
    },
    {
      "text": "Yukon",
      "value": "YT"
    }
  ]
  public searchByFilters = [
    {
      text: 'First Pickup Date',
      value: 'firstPickupDate'
    },
    {
      text: 'Last Delivery Date',
      value: 'lastDeliveryDate'
    },
    {
      text: 'Invoice Date',
      value: 'invoiceDate'
    },
    {
      text: 'Bill Date',
      value: 'billDate'
    },
    {
      text: 'Archived Date',
      value: 'archivedDate'
    },
    {
      text: 'Load Creation Date',
      value: 'loadCreationDate'
    }
  ]
  public loadEntities: string[] = [
    'Carrier 1', 'Carrier 2',
    'Location 1', 'Location 2',
    'Customer 1', 'Customer 2',
    'Driver 1', 'Driver 2',
  ]
  public users: string[] = [
    'User 1', 'User 2',
  ]
  public branches: string[] = [
    'Branch 1', 'Branch 2',
  ]
  public loadStatuses: string[] = [
    "Booked - Awaiting Confirmation",
    "Needs Carrier",
    "Needs Driver",
    "Pending",
    "Delivered",
    "Dispatched",
    "Driver Assigned",
    "In Transit",
    "Possible Claim",
    "Ready - Confirmation Signed",
    "Watch",
    "Actual Claim",
    "Completed",
    "To Be Billed",
  ]
  public columnLayouts: string[] = [
    'Standard Layout',
    'Extended - Charge Types in Columns'
  ]

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      savedReports: [null, []],
      searchTerms: [null, []],
      originState: [null, []],
      destinationState: [null, []],
      dateRange: [null, []],
      searchBy: ['firstPickupDate', []],
      loadEntities: [null, []],
      userAssignments: [null, []],
      branches: [null, []],
      loadStatuses: [null, []],
      columnLayout: [null, []],
      isLive: [false, []],
      isCancelled: [false, []],
      isArchived: [false, []],
    })
  }

}
