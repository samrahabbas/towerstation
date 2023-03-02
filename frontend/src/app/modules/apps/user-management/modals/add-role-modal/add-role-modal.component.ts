import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PermissionDto } from "../../dto/permission.dto";
import { PrivilegeDto } from "../../dto/privilege.dto";

@Component({
  selector: 'app-add-role-modal',
  templateUrl: './add-role-modal.component.html',
  styleUrls: ['./add-role-modal.component.scss']
})
export class AddRoleModalComponent implements OnInit {

  @Input()
  public permissions: PermissionDto[]
  @Input()
  public privileges: PrivilegeDto[]
  @Input()
  public isEditing: boolean = false

  public roleFormGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngbActiveModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.permissions, this.privileges);
    this.initForm();
    if (this.isEditing) {
      this.roleFormGroup.controls.roleName.setValue('Developer')
      document.getElementById('admin-access-checkbox')?.click()
    }
  }

  public get permissionsFormArray(): FormArray {
    return this.roleFormGroup.controls.permissions as FormArray;
  }

  public getPrivilegesFormArray(permissionControl: AbstractControl): FormArray {
    return permissionControl.get("privileges") as FormArray;
  }

  public getIsSelectedPrivilegeControl(privilegeControl: AbstractControl): FormControl {
    return privilegeControl.get("isSelected") as FormControl;
  }

  public onFullAccessChange(target: any): void {
    if (target.checked) {
      this.changePrivilegesCheckboxValues(true);
    } else {
      this.changePrivilegesCheckboxValues(false);
    }
  }

  public submitNewRole(): void {

  }

  public closeModal(): void {
    this.ngbActiveModal.close();
  }

  private initForm(): void {
    this.roleFormGroup = this.formBuilder
      .group({
        roleName: [null, [Validators.required]],
        permissions: this.formBuilder.array([])
      });

    this.permissions.forEach(permission => {
      const permissionFormGroup = this.formBuilder.group({
        moduleId: [permission.id, [Validators.required]],
        moduleName: [permission.name, [Validators.required]],
        privileges: this.formBuilder.array([])
      });
      this.privileges.forEach(privilege => {
        const privilegeFormGroup = this.formBuilder.group({
          privilegeId: [privilege.id, [Validators.required]],
          privilegeType: [privilege.type, [Validators.required]],
          isSelected: [false, [Validators.required]]
        });
        (permissionFormGroup?.get("privileges") as FormArray)?.push(privilegeFormGroup);
      });
      this.permissionsFormArray.push(permissionFormGroup);
    });

    console.log(this.roleFormGroup);
  }

  private changePrivilegesCheckboxValues(isAllChecked: boolean) {
    if (isAllChecked) {
      (this.roleFormGroup.get("permissions") as FormArray).controls.forEach(permission => {
        (permission.get("privileges") as FormArray).controls.forEach(privilege => {
          (privilege.get("isSelected") as FormControl).setValue(true);
          this.cdr.markForCheck();
        });
      });
    } else {
      (this.roleFormGroup.get("permissions") as FormArray).controls.forEach(permission => {
        (permission.get("privileges") as FormArray).controls.forEach(privilege => {
          (privilege.get("isSelected") as FormControl).setValue(false);
          this.cdr.markForCheck();
        });
      });
    }
  }

}
