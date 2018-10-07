import { Component, OnInit } from '@angular/core';
import { LocalStorage, SessionStorage } from "angular-local-storage/dist/angular-local-storage.min.js";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthManagerService } from '../Services/auth-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // login compnents

  constructor(private formBuilder: FormBuilder, private service: AuthManagerService, private router: Router) { }
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  onLogin() {

    let sellerProfile = this.loginForm.value;

    if (this.loginForm.value.loginType == "seller") { //user login as a seller

      this.service.sellerLogin(this.loginForm.value) // pass the form to sellerLogin(form) function
        .subscribe(data => {
          console.log("you are succesfully login in!" + data);
          localStorage.setItem("userType", "seller");
          localStorage.setItem("loginSeller", JSON.stringify(data))  // store the user profile into the local storage
          localStorage.setItem("sellerProducts", JSON.stringify(data.product));  // store the user's product into local
          localStorage.setItem("username", data.name);
          this.successMessage = "welcome back, " + data.name;
          this.errorMessage = null;
          location.reload();
          this.router.navigate(['/']);
        },
        error => {
          this.successMessage = null;
          this.errorMessage = "login fails, please try again";
        })

    } else { //user login as a customer
      this.service.customerLogin(this.loginForm.value) //pass the form to customerLogin() function
        .subscribe(data => {
          localStorage.setItem("loginCustomer", JSON.stringify(data));
          localStorage.setItem("userType", "customer");
          localStorage.setItem("username", data.name);
          location.reload();
          this.router.navigate(['/'])
        },
        error => {
          this.successMessage = null;
          this.errorMessage = "login fails, please try again";
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
