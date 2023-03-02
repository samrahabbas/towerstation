import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(localStorage.getItem("user")){
      return true;
    }else{
      this.router.navigate(['/auth/login']);
      return false;
    }
    // const currentUser = this.authService.currentUserValue;
    // if (currentUser) {
    //   // logged in so return true
    // }
    // return true;

    // not logged in so redirect to login page with the return url
    // this.authService.logout();
    // return false;
  }
}
