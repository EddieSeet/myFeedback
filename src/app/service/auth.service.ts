import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subscription, of, throwError } from 'rxjs';
import { shareReplay, tap, catchError, delay } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private router: Router,
    private httpClient: HttpClient,
    //this JwtHelperService is a library from auth0/angular-jwt. It have some useful functions
    //which will help in login and JWT controls.
    private jwtHelper: JwtHelperService
  ) { }

  //private so it can only be set by other methods in this class only
  private loggedIn = new BehaviorSubject<boolean>(false);

  //for other componenet to get the 'status' of user
  get isLoggedIn(): Observable<boolean> {


    console.log("'getloggedin': check if JWT expired")


    //check if the token is expired
    //if not expired:
    if (this.jwtHelper.isTokenExpired() == false) {
      console.log("JWT not expired yet")

      //calculate the time(milli-seconds) til it expires 
      var timeout = this.jwtHelper.getTokenExpirationDate().valueOf() - new Date().valueOf();
      console.log("timeout?")
      console.log(timeout)

      //set expirationCounter to automatically log user out & redirect them to login page
      // after the JWT expires
      this.expirationCounter(timeout)

      //change the behavioursubject to true. as user is still logged in
      this.loggedIn.next(true);
      return this.loggedIn.asObservable();

    }
    
    //if expired
    else if (this.jwtHelper.isTokenExpired() == true) {
    
      //change behavioursubject to false as user's token expired and not valid. 
      //Set user to not logged in, hence false. 
      this.loggedIn.next(false);
    
      //calls the removesession method to remove token stored in localstorage
      this.removeSession()
      return this.loggedIn.asObservable();

    }

  }




  loginUrl = '/api/auth/login'

  //when the user log in
  async login(username: string, password: string) {



    let user = {
      email: username,
      password: password
    }


    //setting http headers
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    });

    const options = {
      headers: httpHeaders
    }


     return this.httpClient.post<User>(
       "http://localhost:3000/api/auth/login",
        user, options)
      .pipe(

        //authorized. No error
        tap(
          {
            next: data => {
              //data returned from http post. 
              //  console.log(data)
              //seet session which is to store the token in localstorage
              this.setSession(data)
            }
          }


 
        ),
      
        //if any errors
        catchError(this.handleError),


        //call shareReplay to prevent the receiver of this Observable from
        // accidentally triggering multiple POST requests due to multiple subscriptions.
        shareReplay()


      )
  }

//set session is to store token in user's web browser's local storage
  private setSession(authResult) {


    console.log("setsession")
 
    //Normally, you will only return the base64 string which contains 
    //all the information required. 
        localStorage.setItem('id_token', authResult.id);

 



    //toberemove as these are not really required. 
    //just easier to see when the token expires when in development 
    localStorage.setItem("role", authResult.role);
    localStorage.setItem("expiry", authResult.validTo);
    localStorage.setItem("expiry2", authResult.expiresIn);


    //calculate the time (milliseconds)
    var timeout = this.jwtHelper.getTokenExpirationDate(authResult.id).valueOf() - new Date().valueOf();
    console.log(timeout)
    //count down to token expire
    this.expirationCounter(timeout);

  }


  //tokenSubscription & expirationCounter is used to automatically log user out after token expire
  tokenSubscription = new Subscription()

  //expirationCounter make use of tokenSubscription to 
  expirationCounter(timeout) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      console.log('EXPIRED!!');

      this.logout();
      this.router.navigate(["/login"]);
    });
  }


  private removeSession() {
    console.log("remove JWT from localstorage")
    localStorage.removeItem('id_token');
    localStorage.removeItem('expiry');

    //TobeRemoved
    localStorage.removeItem('expiry2');

  }




//method to log user out.
  logout() {

    console.log('logout method of authentication service has executed.');
    console.log('token information in the localStorage is removed');
    
    // Remove user from local storage to log user out

    localStorage.removeItem('id_token');
    localStorage.removeItem('expiry');

    this.loggedIn.next(false);
    this.router.navigate(["/login"]);

  }

//if any errors in the http post
  private handleError(res: HttpErrorResponse) {
    console.error(res);
    return throwError(res.error || 'Server error');
  }




  //check auth
  isAuthenticated() {
    console.log("isAuthenticated function")
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.isLoggedIn)
        }, 1000);
      }
    )
    return promise
  }


}
