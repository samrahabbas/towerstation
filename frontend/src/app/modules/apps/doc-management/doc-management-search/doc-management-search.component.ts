import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { DocTypeDto } from "../dto/doc-type.dto";
import { FlatpickrDefaultsInterface } from "angularx-flatpickr/flatpickr-defaults.service";

@Component({
  selector: 'app-doc-management-search',
  templateUrl: './doc-management-search.component.html',
  styleUrls: ['./doc-management-search.component.scss']
})
export class DocManagementSearchComponent implements OnInit {

  public searchForm: FormGroup;
  public attachedToItems: string[] = [
    "Carrier 1", "Carrier 2", "Carrier 3",
    "Load 1", "Load 2", "Load 3",
    "Location 1", "Location 2", "Location 3",
    "Customer 1", "Customer 2", "Customer 3"
  ]
  public rawDocTypes: {group: string, names: string[]}[] = [
    {
      group: "Most Common Load Document Types",
      names: [
        "All Documents Are Combined",
        "POD (Proof of Delivery)",
        "BOL (Bill of Lading)",
        "Driver Load Confirmation (Signed)",
        "Carrier Load Confirmation (Signed)",
        "Client Rate Confirmation (Signed)",
        "Bill / Invoice",
        "Carrier Invoice",
        "Packing List / Slip",
        "Load Tender"
      ]
    },
    {
      group: 'Other Load Document Types',
      names: [
        'Fuel Receipt',
        'Toll Receipt',
        'Lumper Receipt',
        'Detention Receipt',
        'Meal Receipt',
        'Maintenance / Repair',
        'Claim / OS&D',
        'DOT Fine / Notice',
        'Scale Ticket',
        'Carrier Payment',
        'Due Diligence Certificate',
        'Advance',
        'Other / Miscellaneous'
      ]
    },
    {
      group: 'Your Company / Shared Document Types',
      names: [
        'Carrier Packet (Full)',
        'Customer Packet (Full)',
        'Broker Contract',
        'Customer Contract',
        'Driver Contract',
        'Carrier Contract',
        'Insurance (COI) Request',
        'Insurance (Proof Of)',
        'Equipment / Lane Request',
        'DOT / MC / FF / URS Number',
        'Billing Instructions',
        'Quick Pay / Settlement Form',
        'W9 Form',
        'Credit Application',
        'Claim Form',
        'Driver Application',
        'Sales Packet',
        'Marketing Packet',
        'Freight Export Docs.',
        'Freight Import Docs.',
        'Other / Miscellaneous'
      ]
    }
  ];
  public docTypes: DocTypeDto[] = []
  public dateRangeOptions: FlatpickrDefaultsInterface = {

  }

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
    this.rawDocTypes.forEach(group => {
      group.names.forEach(name => {
        this.docTypes.push({
          name: name,
          group: group.group
        })
      })
    })
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.searchForm = this.formBuilder.group({
      attachedTo: [null, []],
      documentTypes: [null, []],
      dateRange: [null, []],
      isUploadDate: [false, []],
      isModifiedDate: [false, []],
      isDocumentProcessed: [false, []],
      isDocumentUnProcessed: [false, []],
      isSearchOnlyForCompanyDocs: [false, []],
    })
  }

}
