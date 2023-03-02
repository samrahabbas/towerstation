import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CountryCallingCodeDto } from "../../../../../../core/dto/country-calling-code.dto";
import { CoreHelperService } from "../../../../../../core/core-helper.service";

@Component({
  selector: "app-add-user-modal",
  templateUrl: "./add-user-modal.component.html",
  styleUrls: ["./add-user-modal.component.scss"]
})
export class AddUserModalComponent implements OnInit {

  public form: FormGroup;
  public isEditing: boolean = false;
  public contactNumberCountryCodes: CountryCallingCodeDto[] = CoreHelperService.countryCallingCodes;
  public contactNumberCountryCodeSelected: CountryCallingCodeDto = this.contactNumberCountryCodes[0];
  public userPermissions: string[] = [
    "Standard",
    "Accounting",
    "Administrator"
  ];
  public userBranches: string[] = [
    "Shared",
    "Branch 1",
    "Test Branch"
  ];
  public showPassword: boolean = false

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ngbActiveModal: NgbActiveModal
  ) {
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  public closeModal(): void {
    this.ngbActiveModal.close();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      username: [null, []],
      contactNumber: [null, []],
      password: [null, [Validators.required]],
      userPermissionGroups: [null, []],
      userBranches: [null, []]
    });

    if (this.isEditing) {
      this.form.patchValue({
        fullName: "John Doe",
        username: "johndoe",
        contactNumber: "09123456789",
        password: "password",
        userPermissionGroups: ["Standard"],
        userBranches: ["Shared"]
      });
    }
  }
}
