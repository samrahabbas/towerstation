import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { CommodityDropdownDto } from "../dto/commodity-dropdown.dto";
import { LoadStatusDropdownDto } from "../dto/load-status-dropdown.dto";
import { PayItemDropdownDto } from "../dto/pay-item-dropdown.dto";
import { TruckLengthDropdownDto } from "../dto/truck-length-dropdown.dto";
import { TruckStatusDropdownDto } from "../dto/truck-status-dropdown.dto";
import { TruckTypeDropdownDto } from "../dto/truck-type-dropdown.dto";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-configure-dropdowns-lists",
  templateUrl: "./configure-dropdowns-lists.component.html",
  styleUrls: ["./configure-dropdowns-lists.component.scss"]
})
export class ConfigureDropdownsListsComponent implements OnInit, AfterViewInit {

  public lists: string[] = [
    "Commodity", "Load Status", "Pay Items",
    "Truck Length", "Truck Status", "Truck Type"
  ];
  public selectedList: string | null = null;

  public commodities: CommodityDropdownDto[] = [
    {
      id: 1,
      value: "Cargo",
      grouping: "Cargo"
    },
    {
      id: 2,
      value: "Container",
      grouping: "Container"
    },
    {
      id: 3,
      value: "Equipment",
      grouping: "Equipment"
    },
    {
      id: 4,
      value: "Fuel",
      grouping: "Fuel"
    },
    {
      id: 5,
      value: "Handling",
      grouping: "Handling"
    },
    {
      id: 6,
      value: "Haulage",
      grouping: "Haulage"
    },
    {
      id: 7,
      value: "LTL",
      grouping: "LTL"
    },
    {
      id: 8,
      value: "Other",
      grouping: "Other"
    },
    {
      id: 9,
      value: "Packing",
      grouping: "Packing"
    },
    {
      id: 10,
      value: "Rail",
      grouping: "Rail"
    },
    {
      id: 11,
      value: "Reefer",
      grouping: "Reefer"
    },
    {
      id: 12,
      value: "Truck",
      grouping: "Truck"
    },
    {
      id: 13,
      value: "Vehicle",
      grouping: "Vehicle"
    },
    {
      id: 14,
      value: "Yard",
      grouping: "Yard"
    }
  ];
  public loadStatuses: LoadStatusDropdownDto[] = [
    {
      id: 1,
      value: "Active",
      grouping: "Active",
      color: "#00FF00",
      isActive: true,
      isMisc: false,
      isPlanning: true,
      isReadyForAccounting: false
    },
    {
      id: 2,
      value: "Cancelled",
      grouping: "Cancelled",
      color: "#FF0000",
      isActive: false,
      isMisc: false,
      isPlanning: false,
      isReadyForAccounting: false
    },
    {
      id: 3,
      value: "Closed",
      grouping: "Closed",
      color: "#0000FF",
      isActive: false,
      isMisc: false,
      isPlanning: false,
      isReadyForAccounting: false
    },
    {
      id: 4,
      value: "Inactive",
      grouping: "Inactive",
      color: "#FFFF00",
      isActive: false,
      isMisc: false,
      isPlanning: false,
      isReadyForAccounting: false
    },
    {
      id: 5,
      value: "Misc",
      grouping: "Misc",
      color: "#000000",
      isActive: false,
      isMisc: true,
      isPlanning: false,
      isReadyForAccounting: false
    },
    {
      id: 6,
      value: "Planning",
      grouping: "Planning",
      color: "#FFFFFF",
      isActive: false,
      isMisc: false,
      isPlanning: true,
      isReadyForAccounting: false
    },
    {
      id: 7,
      value: "Ready for Accounting",
      grouping: "Ready for Accounting",
      color: "#FF00FF",
      isActive: false,
      isMisc: false,
      isPlanning: false,
      isReadyForAccounting: true
    }
  ];
  public payItems: PayItemDropdownDto[] = [
    {
      id: 1,
      value: "Advance",
      grouping: "Advance",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 2,
      value: "Bail",
      grouping: "Bail",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 3,
      value: "Bond",
      grouping: "Bond",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 4,
      value: "Brokerage",
      grouping: "Brokerage",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 5,
      value: "Brokerage",
      grouping: "Brokerage",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 6,
      value: "Brokerage",
      grouping: "Brokerage",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 7,
      value: "Brokerage",
      grouping: "Brokerage",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 8,
      value: "Brokerage",
      grouping: "Brokerage",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 9,
      value: "Brokerage",
      grouping: "Brokerage",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 10,
      value: "Brokerage",
      grouping: "Brokerage",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 11,
      value: "Brokerage",
      grouping: "Brokerage",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    },
    {
      id: 12,
      value: "Brokerage",
      grouping: "Brokerage",
      defaultQuantity: "Extra Stops",
      defaultRate: 10
    }
  ];
  public truckLengths: TruckLengthDropdownDto[] = [
    {
      id: 1,
      value: "20'",
      grouping: "20'"
    },
    {
      id: 2,
      value: "40'",
      grouping: "40'"
    },
    {
      id: 3,
      value: "45'",
      grouping: "45'"
    },
    {
      id: 4,
      value: "48'",
      grouping: "48'"
    },
    {
      id: 5,
      value: "53'",
      grouping: "53'"
    },
    {
      id: 6,
      value: "55'",
      grouping: "55'"
    },
    {
      id: 7,
      value: "60'",
      grouping: "60'"
    },
    {
      id: 8,
      value: "65'",
      grouping: "65'"
    },
    {
      id: 9,
      value: "70'",
      grouping: "70'"
    },
    {
      id: 10,
      value: "75'",
      grouping: "75'"
    },
    {
      id: 11,
      value: "80'",
      grouping: "80'"
    },
    {
      id: 12,
      value: "85'",
      grouping: "85'"
    },
    {
      id: 13,
      value: "90'",
      grouping: "90'"
    },
    {
      id: 14,
      value: "95'",
      grouping: "95'"
    },
    {
      id: 15,
      value: "100'",
      grouping: "100'"
    },
    {
      id: 16,
      value: "105'",
      grouping: "105'"
    },
    {
      id: 17,
      value: "110'",
      grouping: "110'"
    },
    {
      id: 18,
      value: "115'",
      grouping: "115'"
    },
    {
      id: 19,
      value: "120'",
      grouping: "120'"
    }
  ];
  public truckStatuses: TruckStatusDropdownDto[] = [
    {
      id: 1,
      value: "Available",
      grouping: "Available"
    },
    {
      id: 2,
      value: "In Use",
      grouping: "In Use"
    },
    {
      id: 3,
      value: "In Maintenance",
      grouping: "In Maintenance"
    },
    {
      id: 4,
      value: "In Repair",
      grouping: "In Repair"
    },
    {
      id: 5,
      value: "In Service",
      grouping: "In Service"
    },
    {
      id: 6,
      value: "In Storage",
      grouping: "In Storage"
    },
    {
      id: 7,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 8,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 9,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 10,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 11,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 12,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 13,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 14,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 15,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 16,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 17,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 18,
      value: "Inactive",
      grouping: "Inactive"
    },
    {
      id: 19,
      value: "Inactive",
      grouping: "Inactive"
    }
  ];
  public truckTypes: TruckTypeDropdownDto[] = [
    {
      id: 1,
      value: "Flatbed",
      grouping: "Flatbed"
    },
    {
      id: 2,
      value: "Lowboy",
      grouping: "Lowboy"
    },
    {
      id: 3,
      value: "Reefer",
      grouping: "Reefer"
    },
    {
      id: 4,
      value: "Refrigerated",
      grouping: "Refrigerated"
    },
    {
      id: 5,
      value: "Tanker",
      grouping: "Tanker"
    },
    {
      id: 6,
      value: "Tipper",
      grouping: "Tipper"
    },
    {
      id: 7,
      value: "Tractor",
      grouping: "Tractor"
    },
    {
      id: 8,
      value: "Trailer",
      grouping: "Trailer"
    },
    {
      id: 9,
      value: "Truck",
      grouping: "Truck"
    },
    {
      id: 10,
      value: "Van",
      grouping: "Van"
    },
    {
      id: 11,
      value: "Other",
      grouping: "Other"
    }
  ];

  public defaultQuantities: string[] = [
    "",
    "Extra Stops",
    "Load Mileage (Kilometers)",
    "Load Mileage (Miles)"
  ];

  public selectedTableTemplateRef: TemplateRef<any> | null = null;
  @ViewChild("commodityTableTemplate")
  commodityTableTemplateRef: TemplateRef<any>;
  @ViewChild("loadStatusTableTemplate")
  loadStatusTableTemplateRef: TemplateRef<any>;
  @ViewChild("payItemTableTemplate")
  payItemTableTemplateRef: TemplateRef<any>;
  @ViewChild("truckLengthTableTemplate")
  truckLengthTableTemplateRef: TemplateRef<any>;
  @ViewChild("truckStatusTableTemplate")
  truckStatusTableTemplateRef: TemplateRef<any>;
  @ViewChild("truckTypeTableTemplate")
  truckTypeTableTemplateRef: TemplateRef<any>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if(this.activatedRoute.snapshot.queryParams.isLoad) {
      this.selectedList = 'Load Status';
      this.onListChange();
    }
  }

  public onAddValue(): void {
    if (this.selectedList === "Commodity") {
      this.commodities.push({
        id: this.commodities.length + 1,
        value: "New Commodity",
        grouping: "New Commodity"
      });
    } else if (this.selectedList === "Load Status") {
      this.loadStatuses.push({
        id: this.loadStatuses.length + 1,
        value: "New Load Status",
        grouping: "New Load Status",
        color: "#FFFFFF",
        isActive: false,
        isMisc: false,
        isPlanning: false,
        isReadyForAccounting: false
      });
    } else if (this.selectedList === "Pay Items") {
      this.payItems.push({
        id: this.payItems.length + 1,
        value: "New Pay Item",
        grouping: "New Pay Item",
        defaultQuantity: "Extra Stops",
        defaultRate: 10
      });
    } else if (this.selectedList === "Truck Length") {
      this.truckLengths.push({
        id: this.truckLengths.length + 1,
        value: "New Truck Length",
        grouping: "New Truck Length"
      });
    } else if (this.selectedList === "Truck Status") {
      this.truckStatuses.push({
        id: this.truckStatuses.length + 1,
        value: "New Truck Status",
        grouping: "New Truck Status"
      });
    } else if (this.selectedList === "Truck Type") {
      this.truckTypes.push({
        id: this.truckTypes.length + 1,
        value: "New Truck Type",
        grouping: "New Truck Type"
      });
    }
  }

  public onSortByName(): void {
    if (this.selectedList === "Commodity") {
      this.commodities.sort((a, b) => {
        if (a.value.toLowerCase() < b.value.toLowerCase()) {
          return -1;
        }
        if (a.value.toLowerCase() > b.value.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (this.selectedList === "Load Status") {
      this.loadStatuses.sort((a, b) => {
        if (a.value.toLowerCase() < b.value.toLowerCase()) {
          return -1;
        }
        if (a.value.toLowerCase() > b.value.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (this.selectedList === "Pay Items") {
      this.payItems.sort((a, b) => {
        if (a.value.toLowerCase() < b.value.toLowerCase()) {
          return -1;
        }
        if (a.value.toLowerCase() > b.value.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (this.selectedList === "Truck Length") {
      this.truckLengths.sort((a, b) => {
        if (a.value.toLowerCase() < b.value.toLowerCase()) {
          return -1;
        }
        if (a.value.toLowerCase() > b.value.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (this.selectedList === "Truck Status") {
      this.truckStatuses.sort((a, b) => {
        if (a.value.toLowerCase() < b.value.toLowerCase()) {
          return -1;
        }
        if (a.value.toLowerCase() > b.value.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (this.selectedList === "Truck Type") {
      this.truckTypes.sort((a, b) => {
        if (a.value.toLowerCase() < b.value.toLowerCase()) {
          return -1;
        }
        if (a.value.toLowerCase() > b.value.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }
  }

  public onListChange(): void {
    console.log('change');
    switch (this.selectedList) {
      case "Commodity":
        this.selectedTableTemplateRef = this.commodityTableTemplateRef;
        break;
      case "Load Status":
        this.selectedTableTemplateRef = this.loadStatusTableTemplateRef;
        break;
      case "Pay Items":
        this.selectedTableTemplateRef = this.payItemTableTemplateRef;
        break;
      case "Truck Length":
        this.selectedTableTemplateRef = this.truckLengthTableTemplateRef;
        break;
      case "Truck Status":
        this.selectedTableTemplateRef = this.truckStatusTableTemplateRef;
        break;
      case "Truck Type":
        this.selectedTableTemplateRef = this.truckTypeTableTemplateRef;
        break;
      default:
        this.selectedTableTemplateRef = null;
        break;
    }
  }

  public onDeleteValue(index: number): void {
    if (this.selectedList === "Commodity") {
      this.commodities.splice(index, 1);
    } else if (this.selectedList === "Load Status") {
      this.loadStatuses.splice(index, 1);
    } else if (this.selectedList === "Pay Items") {
      this.payItems.splice(index, 1);
    } else if (this.selectedList === "Truck Length") {
      this.truckLengths.splice(index, 1);
    } else if (this.selectedList === "Truck Status") {
      this.truckStatuses.splice(index, 1);
    } else if (this.selectedList === "Truck Type") {
      this.truckTypes.splice(index, 1);
    }
  }

}
