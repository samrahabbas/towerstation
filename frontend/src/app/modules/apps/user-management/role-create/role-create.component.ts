import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { PermissionDto } from "../dto/permission.dto";
import { PrivilegeDto } from "../dto/privilege.dto";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
// import { UserManagementService } from "../services/user-management.service";
import { UserManagementService } from "src/app/services/user-management.service";
import * as $ from 'jquery';



@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss'],
  providers: [MessageService]
})
export class RoleCreateComponent implements OnInit, OnDestroy {

  public permissions: any = [];
  public privileges: any = [];
  public permission: any;
  public isLoading: boolean = true;
  public isEditing: boolean = false
  public module_id: any;
  public privilege_id: any;
  public privilege_arr: any = [];
  public privileges_array:any = [];
  public permission_array:any = [];
  permissionList:any;
  public checkedPrivleges:any = [];
  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  companyId:any;


  public roleFormGroup = new FormGroup({
    roleName: new FormControl("", Validators.required)
  });

  private subs: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly messageService: MessageService,
    private readonly userManagementService: UserManagementService,
    private readonly router: Router

  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing
  }

  ngOnInit() {
    if (this.isEditing) {
      this.getRoles(this.activatedRoute.snapshot.queryParams.id);
    }
    this.getPermissions();
    // this.getPermission();
    // this.getPrivileges();
    this.initForm();
  
    

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private getRoles(id: string): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    // this.subs.add(
    //   this.customerService.getCustomerById(id).subscribe(
    //     (data:any) => {
    //       console.log(data);
        
    //       this.customerForm.patchValue({
    //         firstName: data.firstName,
    //         middleName: data.middleName,
    //         lastName: data.lastName,
    //         street1: data.street1,
    //         street2: data.street2,
    //         city: data.city,
    //         state: data.state,
    //         zipCode: data.zipcode,
    //         telephone: data.telephone,
    //         cellPhone: data.cellPhone,
    //         fax: data.fax,
    //         email: data.email,
    //         accountingCreditLimit: data.creditLimit,
    //         accountingIsCreditHold: data.isCreditHold,
    //         accountingAvailableCredit: data.availableCredit,
    //         accountingPaymentTerms: data.paymentTerms,
    //         operatingAuthorityNumber: data.mcNumber,
    //         operatingAuthorityUSDOTNumber: data.usdotNumber,
    //         weightUnit: data.weightUnit,
    //         distanceUnit: data.distanceUnit,
    //         temperatureUnit: data.temperatureUnit,
    //         privateNotes: data.privateNotes,
    //         // status: data.status,
    //       });
    //       this.selectedOperatingAuthorityNumberType = data?.mcNumberType ?? this.operatingAuthorityNumberTypes[0];
    //       this.f.zipCode.setValue(data.zipCode);
    //       this.f.zipCode.setErrors(null);
    //       this.cdr.markForCheck();
        
    //     },
    //     (error: any) => {
    //       this.isLoading = false;
    //       this.ngxSpinnerService.hide();
    //       this.messageService.add({
    //         severity: "error",
    //         summary: "Error",
    //         detail: error.error?.message,
    //         closable: true
    //       });
    //     }, () => {
    //       this.isLoading = false;
    //       this.ngxSpinnerService.hide();
    //     })
    // );
  }


  public get permissionsFormArray(): FormArray {
    // console.log(this.roleFormGroup)
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
    this.ngxSpinnerService.show();

        // console.log(this.roleFormGroup.value); 
    this.addRole(this.roleFormGroup.value);
    for(let i = 0; i < this.roleFormGroup.value.permissions.length; i++){
      this.module_id = this.roleFormGroup.value.permissions[i].moduleId;
      this.privilege_arr = this.roleFormGroup.value.permissions[i].privileges;
      // for(let i = 0; i < this.privilege_arr.length; i++){
      //   this.privilege_id = this.privilege_arr[i].privilegeId;
      //   if(this.privilege_arr[i].isSelected){
      //     console.log(this.module_id);
      //     console.log(this.privilege_id);
      //     // const data = {
      //     //   moduleId: this.module_id
      //     // }
      //     // this.addRole();
      //     // this.userManagementService.addRole(this.userData.id, this.roleFormGroup.value.roleName, this.module_id, this.privilege_id);
      //   }
      // }
    }

    
    // console.log(this.privilege_arr);
    
  }

  public addRole(data:any){
    // if(this.userData.userRole == null){
    //   this.companyId = this.userData.id;
    // }else{
    //   this.companyId = this.userData.companyId;
    // }
    this.userManagementService.addRole(data, this.userData.id).subscribe((response: any) => {
      console.log(response);
      if(response.message == "Role Added successfully"){
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: response.message,
          closable: true
          
        });
        this.isLoading = false;
        this.ngxSpinnerService.hide();
        this.router.navigate(['/apps/user-management/roles/list'])
        // console.log("aa");
        // this.success = true;
        // this.createLoadForm.reset({});
           
        //     window.scroll({ 
        //       top: 0, 
        //       left: 0, 
        //       behavior: 'smooth' 
        //     });
      }else{
        // this.error = true;
      }
    },
    (error: any) => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error?.message,
        closable: true
      });
      this.isLoading = false;
                this.ngxSpinnerService.hide();
    }, () => {
    });
  }

  private initForm(): void {
    this.roleFormGroup = this.formBuilder
      .group({
        roleName: [null, [Validators.required]],
        permissions: this.formBuilder.array([])
      });

      this.roleFormGroup = this.formBuilder
      .group({
        roleName: [null, [Validators.required]],
        permissions: this.formBuilder.array([])
      });

    this.permissions.forEach((permission: { id: any; name: any; }) => {
      const permissionFormGroup = this.formBuilder.group({
        moduleId: [permission.id, [Validators.required]],
        moduleName: [permission.name, [Validators.required]],
        privileges: this.formBuilder.array([])
      });
      this.privileges.forEach((privilege: { id: any; type: any; }) => {
        const privilegeFormGroup = this.formBuilder.group({
          privilegeId: [privilege.id, [Validators.required]],
          privilegeType: [privilege.type, [Validators.required]],
          isSelected: [false, [Validators.required]]
        });
        (permissionFormGroup?.get("privileges") as FormArray)?.push(privilegeFormGroup);
      });
      this.permissionsFormArray.push(permissionFormGroup);
    });

    // console.log(this.roleFormGroup);
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

  private getPermissions(): void {
  
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(forkJoin([
      this.userManagementService.getPermission(),
      this.userManagementService.getPrivileges()
    ]).subscribe(([permissions, privileges]) => {

        this.permissions = permissions;
        this.privileges = privileges;
        this.initForm();
        if (this.isEditing) {
          this.roleFormGroup.controls.roleName.setValue('Developer')
          document.getElementById('admin-access-checkbox')?.click()
        }
      
      this.cdr.markForCheck();
    }, error => {
      console.log({ error });
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error.error?.message,
        closable: true
      });
      this.isLoading = false;
      this.ngxSpinnerService.hide();
    }, () => {
      this.isLoading = false;
      this.ngxSpinnerService.hide();
    }));
    
  }
  private getPrivileges(): void {
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.userManagementService.getPrivileges().subscribe((response: any) => {
      if(response.length > 0){
        this.privileges_array = response;
        // console.log(this.privileges_array[0].name);
        // this.initForm();
        // this.isLoading = false;
        this.ngxSpinnerService.hide()
      }
  
    });
  }

  private getPermission(): void {
    // this.isLoading = true;
    // this.ngxSpinnerService.show();
    this.userManagementService.getPermission().subscribe((response: any) => {
      if(response.length > 0){
        this.permission_array = response;
        // console.log(this.permission_array);
        // console.log(this.privileges_array[0].name);
        // this.initForm();
        // this.isLoading = false;
        // this.ngxSpinnerService.hide()
      }
  
    });
  }

  
}

