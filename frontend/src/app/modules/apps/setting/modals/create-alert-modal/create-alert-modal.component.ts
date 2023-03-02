import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";

@Component({
  selector: "app-create-alert-modal",
  templateUrl: "./create-alert-modal.component.html",
  styleUrls: ["./create-alert-modal.component.scss"]
})
export class CreateAlertModalComponent implements OnInit, OnDestroy {

  public alertForm: FormGroup;
  public events: { group: string, value: string }[] = [];
  private rawEvents: { group: string, values: string[] }[] = [
    {
      group: "EDI",
      values: [
        "Receipt of Incoming Tender",
        "Receipt of Incoming 816",
        "Receipt of Incoming 824"
      ]
    },
    {
      group: "TowerStation",
      values: [
        "Receipt of Incoming Information Data ( Tender accepted, Truck update, Document update, etc )",
        "Receipt of Incoming Actionable Data ( Tender rejected, stop updated )",
        "Expiration of outgoing tender"
      ]
    }
  ];
  public users: string[] = [
    "John Doe",
    "Jane Doe",
    "Jack Doe",
    "Jill Doe",
    "Custom Email Address"
  ];

  private subs: Subscription = new Subscription();

  @Input()
  public isEditing: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ngbActiveModal: NgbActiveModal
  ) {
    this.rawEvents.forEach(group => {
      group.values.forEach(name => {
        this.events.push({
          value: name,
          group: group.group
        });
      });
    });
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.alertForm.controls;
  }

  public get alertPeopleFormArray(): FormArray {
    return this.f.alertPeople as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public closeModal(): void {
    this.ngbActiveModal.close();
  }

  public onIsEmailChange(index: number): void {
    const alertPersonFormGroup: FormGroup = this.alertPeopleFormArray.controls[index] as FormGroup;
    if (!alertPersonFormGroup.controls.isEmail.value) {
      alertPersonFormGroup.controls.isAlert.disable();
    } else {
      alertPersonFormGroup.controls.isAlert.enable();
    }
  }

  public onIsAlertChange(index: number): void {
    const alertPersonFormGroup: FormGroup = this.alertPeopleFormArray.controls[index] as FormGroup;
    if (!alertPersonFormGroup.controls.isAlert.value) {
      alertPersonFormGroup.controls.isEmail.disable();
    } else {
      alertPersonFormGroup.controls.isEmail.enable();
    }
  }

  private initForm(): void {
    this.alertForm = this.formBuilder.group({
      description: [null, [Validators.required]],
      alertOn: [null, [Validators.required]],
      alertPeople: this.formBuilder.array([this.createAlertPeopleFormGroup()]),
      message: [null, [Validators.required]]
    });

    if (this.isEditing) {
      this.alertForm.patchValue({
        description: "Alert 1",
        alertOn: "Receipt of Incoming Tender",
        message: "Test Message"
      });
    }
  }

  private createAlertPeopleFormGroup(): FormGroup {
    return this.formBuilder.group({
      user: [null, [Validators.required]],
      isEmail: [true],
      isAlert: [true],
      email: [null, [Validators.email]]
    });
  }
}
