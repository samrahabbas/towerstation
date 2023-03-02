import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-permissions-group-modal",
  templateUrl: "./add-permissions-group-modal.component.html",
  styleUrls: ["./add-permissions-group-modal.component.scss"]
})
export class AddPermissionsGroupModalComponent implements OnInit {
  public permissionsForm: FormGroup;
  public copyPermissionsFrom: any = null;
  public permissions: {name: string, value: string | null}[] = [
    {
      name: "Start from scratch (don't copy permissions)",
      value: null
    },
    {
      name: "Accounting",
      value: "accounting"
    },
    {
      name: "Standard",
      value: "standard"
    },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ngbActiveModal: NgbActiveModal
  ) {
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.permissionsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  public closeModal(): void {
    this.ngbActiveModal.close();
  }

  private initForm(): void {
    this.permissionsForm = this.formBuilder.group({
      groupName: [null, [Validators.required]]
    });
  }
}
