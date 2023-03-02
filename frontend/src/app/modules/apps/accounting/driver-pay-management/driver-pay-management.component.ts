import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-driver-pay-management",
  templateUrl: "./driver-pay-management.component.html",
  styleUrls: ["./driver-pay-management.component.scss"]
})
export class DriverPayManagementComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public drivers: string[] = [
    "Driver 1",
    "Driver 2",
    "Driver 3"
  ];

  private readonly subs: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      dateRange: [null, []],
      isPickupDate: [true, []],
      isDeliveryDate: [false, []],
      drivers: [null, []]
    });
  }
}
