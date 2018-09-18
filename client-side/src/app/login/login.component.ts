import { Component, OnInit } from '@angular/core';
import { LocalStorage, SessionStorage } from "angular-local-storage/dist/angular-local-storage.min.js";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthManagerService } from '../auth-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: AuthManagerService, private router: Router) { }
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  onLogin() {

    let sellerProfile = this.loginForm.value;

    if (this.loginForm.value.loginType == "seller") {

      this.service.sellerLogin(this.loginForm.value)
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

    } else {
      this.service.customerLogin(this.loginForm.value)
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


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      loginType: ['seller', Validators.required]
    }
    )
  }
}
