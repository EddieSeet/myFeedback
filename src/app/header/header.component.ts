import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //a boolean to check if the user is logged in or not. Display html accordingly with this
  isAuthenticated: Observable<boolean>


  constructor(private authService: AuthService) { }


  ngOnInit() {

    //when the componenet is created, first thing to do is to
    //check the state of the user via the property 'isLoggedin' in authservice class 
    this.isAuthenticated = this.authService.isLoggedIn;
    
  }



  logging() {
    console.log("this.isauthenticated" + this.isAuthenticated)
    console.log(this.isAuthenticated)



  }

  logout() {
    console.log("logout")
    //calls the method that exist in the authService class
    this.authService.logout()

  }

}
