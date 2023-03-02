import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  public addRoleForm: FormGroup
  public isEditing: boolean = false;
  public commissionRateTypes: string[] = [
    '% of Gross Profit',
    '% of Gross Revenue',
    'Flat Rate per Load'
  ]
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
    return this.addRoleForm.controls;
  }

  private initForm(): void {
    this.addRoleForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, []],
      isCommissionable: [false, []],
      defaultCommissionRateType: [null, []],
      defaultCommissionRateAmount: [null, []],
    })

    if (this.isEditing) {
      this.addRoleForm.patchValue({
        title: 'Admin',
        description: 'Admin',
        isCommissionable: true,
        defaultCommissionRateType: '% of Gross Profit',
        defaultCommissionRateAmount: 10
      })
    }
  }

}
