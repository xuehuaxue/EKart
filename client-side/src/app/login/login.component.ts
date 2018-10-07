import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthManagerService } from '../services/auth-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // login compnents, which handles both seller login and customer login

  constructor(private formBuilder: FormBuilder, private service: AuthManagerService, private router: Router) { }
  loginForm: FormGroup;  // form for login
  errorMessage: string;  // store error message
  successMessage: string;  // store successMessage

  onLogin() {

    // loginType is a radio option, used to check whether the user is a seller or a customer
    if (this.loginForm.value.loginType == "seller") { //user login as a seller

      this.service.sellerLogin(this.loginForm.value) // pass the form to sellerLogin(form) function,
      // which will make http request to fetch data in JSON format, then store the data to localStorage
        .subscribe(data => {
          console.log("you are succesfully login in!" + data);
          localStorage.setItem("userType", "seller");
          localStorage.setItem("loginSeller", JSON.stringify(data))  // store the user profile into the local storage
          localStorage.setItem("sellerProducts", JSON.stringify(data.product));  // store the user's product into local
          localStorage.setItem("username", data.name);
          this.successMessage = "welcome back, " + data.name;
          this.errorMessage = null;
          location.reload();
          this.router.navigate(['/']);  // return to home page after successfully sign in
        },
        () => {
            this.successMessage = null;
            this.errorMessage = "login fails, please try again"; // if error, show this message
          })

    } else { //user login as a customer
      this.service.customerLogin(this.loginForm.value) //pass the form to customerLogin(form) function
        .subscribe(data => {  // if login successfully, store the data into localStorage
          localStorage.setItem("loginCustomer", JSON.stringify(data));
          localStorage.setItem("userType", "customer");
          localStorage.setItem("username", data.name);
          location.reload();
          this.router.navigate(['/']) // return to home page
        },
        () => {
            this.successMessage = null;
            this.errorMessage = "login fails, please try again"; // if error, show this message
          })
    }
  }


  ngOnInit() { // reactive form is used to build the login form and validators are used to check input validity
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      loginType: ['seller', Validators.required]
    }
    )
  }
}
