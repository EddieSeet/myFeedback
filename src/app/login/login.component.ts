import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = "hi"

  //forgroup for login purposes
  Aform: FormGroup;

  //fileld up the fields.
  Aformfields = {
    username: 'ali@gmail.com',
    password: 'alibaba'
  }

  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {

    //calls the method to initialize login form
    this.createform()
  }


  //initialize the login form
  createform(): void {
    this.Aform = new FormGroup({
      'username': new FormControl(this.Aformfields.username,
        [Validators.email]
      ),
      'password': new FormControl(this.Aformfields.password,
        [Validators.required]
      )
    });
  }


  async ngOnInit() {
  }

  //when the user submits the login form
  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    //  check if the form is valid or not. (With the Validators specified when initializing the form)
    if (this.Aform.valid) {
      try {
        //retrieve the 'username' and password
        const username = this.Aform.get('username').value;
        const password = this.Aform.get('password').value;

        //set into a object
        // let user = {
        //   email: username,
        //   password: password
        // };


        //calls the method login in authservice and pass in the aguments username and password.
        (await this.authService.login(username, password))
          .pipe(first())
          .subscribe(
            //if logged in successfully.
            data => {
              console.log(data)

              //route the user to feedback
              this.router.navigate(['/feedback']);

            },
            error => {
              //if did not logged in successfully, log the error
              console.log(error)
            });



      }
      catch (err) {
        //if did not manage to login, set the boolean and make changes to the ui
        this.loginInvalid = true;
      }
    }
    else {
      
      this.formSubmitAttempt = true;
    }
  }

}
