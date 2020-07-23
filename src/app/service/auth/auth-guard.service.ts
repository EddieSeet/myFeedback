//Guard link

import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, public auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    //   console.log("auth-guard1")

    if (this.auth.isLoggedIn) {
      //   console.log("auth-guard2")
      // logged in so return true
      //    return true;

      console.log("this.authisloggedin")
      console.log(this.auth.isLoggedIn)

      return this.auth.isLoggedIn


    }
    else {

      console.log("else")
      console.log(this.auth.isLoggedIn)


      return this.auth.isLoggedIn
      //      return false;
    }

    // Not logged in so redirect to login page with the return url
    //The following command should not be inside the canActivate.
    //The original author Jason Watmore some how had this command in his project at Github
    //https://github.com/cornflourblue/angular-6-registration-login-example-cli/blob/master/src/app/_guards/auth.guard.ts
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //  return false;
  }
}