import { ChangeDetectorRef,Component, Input, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserManagementService } from "src/app/services/user-management.service";



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [MessageService]

})
export class UserCreateComponent implements OnInit {

  public fullName: string
  public email: string
  public isLoading: boolean = false;
  public userForm: FormGroup;
  public isEditing;
  public roles: any  = [];

  userData = JSON.parse(localStorage.getItem("user")  || '{}');
  companyId:any;


  private readonly subs: Subscription = new Subscription();



  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly userManagementService: UserManagementService,
    private readonly messageService: MessageService,
    private readonly ngxSpinnerService: NgxSpinnerService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {
    this.isEditing = this.activatedRoute.snapshot.queryParams.isEditing;
  }

  public get f(): { [p: string]: AbstractControl } {
    return this.userForm.controls;
  }

  ngOnInit(): void {
    
    this.initForm();
    this.getRoles();
    
    if (this.isEditing == 'true') {
      this.getUserById(this.activatedRoute.snapshot.queryParams.id);
    }else{
      this.userForm = new FormGroup({
        fullName: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        userRole: new FormControl(),
      })
    }
  }

  private initForm() {

    this.userForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      userRole: new FormControl(),
    })

  }


  private getRoles(): void{
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.userManagementService.getRoles(this.userData.id)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.length > 0) {
            this.roles = res;
            // console.log(this.roles);
            this.ngxSpinnerService.hide();

            this.cdr.markForCheck();
          }
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
        })
    );
  }
  public createUser(): void {
    console.log(this.isEditing)
    // if(this.userData.userRole == null){
    //   this.companyId = this.userData.id;
    // }else{
    //   this.companyId = this.userData.companyId;
    // }
    if (this.isEditing == "true") {
      this.isLoading = true;
      this.ngxSpinnerService.show();
      this.userManagementService.updateUser(this.userForm.value, this.activatedRoute.snapshot.queryParams.id).subscribe((response: any) => {
        console.log(response.message);
        if(response.message == "User Updated Successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "User Updated successfully",
            closable: true
            
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/user-management/users/list'])
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
          closable: true
        });
        this.isLoading = false;
                  this.ngxSpinnerService.hide();
      }, () => {
      });
    }else{
      this.isLoading = true;
      this.ngxSpinnerService.show();
      this.userManagementService.addUser(this.userForm.value, this.userData.id).subscribe((response: any) => {
        console.log(response);
        if(response.message == "User Added successfully"){
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
            closable: true
            
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.router.navigate(['/apps/user-management/users/list'])
        }else if(response.message == "User already exists"){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: response.message,
            closable: true
          });
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
          closable: true
        });
        this.isLoading = false;
                  this.ngxSpinnerService.hide();
      }, () => {
      });
    }

  }

  public getUserById(id: string): void {
    console.log(id);
    this.isLoading = true;
    this.ngxSpinnerService.show();
    this.subs.add(
      this.userManagementService.getUserById(id).subscribe(
        (data:any) => {
          console.log(data);
        
          // this.userForm = new FormGroup({
          //   fullName: new FormControl(),
          //   email: new FormControl(),
          //   password: new FormControl(),
          //   userRole: new FormControl(),
          // })
          this.userForm.patchValue({
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            userRole: data.userRole,

          });
          this.ngxSpinnerService.show();
          this.cdr.markForCheck();
        
        },
        (error: any) => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error?.message,
            closable: true
          });
        }, () => {
          this.isLoading = false;
          this.ngxSpinnerService.hide();
        })
    );
  }


}
