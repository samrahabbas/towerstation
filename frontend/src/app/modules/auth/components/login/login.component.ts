import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHTTPService } from '../../services/auth-http/auth-http.service';
import { UserManagementService } from 'src/app/services/user-management.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'test@darkarmystudios.com',
    password: 'test123',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  public permissions:any;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authHttpService: AuthHTTPService,
    private readonly userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.authService.isLoadingSubject.next(false);

    this.initForm();
    // get return url from route parameters or default to '/'
      this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .signIn(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((data: any) => {
        if (data.message == "Login successful") {
          console.log(data.result);
          // this.onCheckPermission(data.result.userRole);
          // if(data.result.userRole == null || data.result.userRole == undefined){
          // localStorage.setItem("user", JSON.stringify(data.result));

          // }
          // if(data.userRole == null){

          // }else{
          // }
          localStorage.setItem("user", JSON.stringify(data.result));
          this.router.navigate(["/"]);
        } else {
          this.hasError = true;
          this.authService.isLoadingSubject.next(false);
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  public onCheckPermission(userRole:any){
    this.userManagementService.checkRoles(userRole).subscribe((response: any) => {
      console.log(response);
      this.permissions = response;
      localStorage.setItem("permissions", JSON.stringify(this.permissions));


    },
    (error: any) => {
      // this.messageService.add({
      //   severity: "error",
      //   summary: "Error",
      //   detail: error.error?.message,
      //   closable: true
      // });
    }, () => {
    });
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
