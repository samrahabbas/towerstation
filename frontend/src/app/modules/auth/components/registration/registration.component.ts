import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthHTTPService } from '../../services/auth-http/auth-http.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel } from '../../models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hasError: boolean;
  hasUserError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if  already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        fullName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  submit() {


    // this.crudService.AddUser(this.userForm.value)
    // .subscribe(() => {
    //     console.log('User added successfully!')
    //     this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
    //   }, (err) => {
    //     console.log(err);
    // });
  


    this.hasError = false;
    this.hasUserError = false
    // let temp: any = [];
    // temp.fullName = this.registrationForm.controls.fullName.value;
    // temp.email = this.registrationForm.controls.email.value;
    // temp.password = this.registrationForm.controls.password.value;
    // this.authHttpService.SignUp(temp).subscribe((data)=>{
    //   // console.log(data);
    // });
    // console.log(temp);
    const result: {
      [key: string]: string;
    } = {};
    Object.keys(this.f).forEach((key) => {
      result[key] = this.f[key].value;
    });
    const newUser = new UserModel();
    newUser.setUser(result);
    const registrationSubscr = this.authService
      .SignUp(newUser)
      .pipe(first())
      .subscribe((data: any) => {
        console.log(data);
        // console.log(data);
        if (data.message == "User already exists") {
          // console.log(data);
          this.hasUserError = true;
          this.authService.isLoadingSubject.next(false);
        }else if(data.message == "Registerd successfully"){
          this.router.navigate(['/auth/login']);

        } else {
          this.hasError = true;
          this.authService.isLoadingSubject.next(false);
        }
      });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
