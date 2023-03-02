import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-assign-user-role",
  templateUrl: "./assign-user-role.component.html",
  styleUrls: ["./assign-user-role.component.scss"]
})
export class AssignUserRoleComponent implements OnInit {

  public assignRoleForm: FormGroup;
  public isEditing: boolean = false;
  public commissionRateTypes: string[] = [
    "% of Gross Profit",
    "% of Gross Revenue",
    "Flat Rate per Load"
  ];
  public isCommissionableTypes: any[] = [
    {
      label: "Non-Commissionable",
      value: false
    },
    {
      label: "Commissionable",
      value: true
    }
  ];
  public users: string[] = [
    "User 1",
    "User 2",
    "User 3"
  ];
  public entities: string[] = [
    "Apply to all entities",
    "Entity 1",
    "Entity 2",
    "Entity 3"
  ];
  public roles: string[] = [
    "Role 1",
    "Role 2",
    "Role 3"
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;
  }

  ngOnInit(): void {
    this.initForm();
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.assignRoleForm.controls;
  }

  private initForm(): void {
    this.assignRoleForm = this.formBuilder.group({
      user: [null, [Validators.required]],
      entity: ['Apply to all entities', []],
      applicableRole: [null, []],
      isCommissionable: [false, []],
      defaultCommissionRateType: [null, []],
      defaultCommissionRateAmount: [null, []]
    });

    if (this.isEditing) {
      this.assignRoleForm.patchValue({
        user: "User 1",
        entity: "Entity 1",
        applicableRole: "Role 1",
        isCommissionable: true,
        defaultCommissionRateType: "% of Gross Profit",
        defaultCommissionRateAmount: "10"
      });
    }
  }
}
