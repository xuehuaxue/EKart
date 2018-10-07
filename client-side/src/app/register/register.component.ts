import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pdValidator } from '../validators/validators.module';
import { AuthManagerService } from '../services/auth-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  // this component is used to manage seller or customer registration

  constructor(private formBuilder: FormBuilder, private service: AuthManagerService, private router: Router) { }
  // feed in formBuilder, AuthManagerService and Router to the constructor, and set to each attribute

  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  onRegister() {  // the function will be called when users click the register button
    if (this.registerForm.value.registerType == "seller") {  // registerType is seller
      this.service.sellerRegister(this.registerForm.value)  // call sellerRegister(form), which makes HTTP request to insert new seller entity to the database
        .subscribe(data => {  // process the response
          this.successMessage = "Account is successfully registered!";  // set the success message
          this.router.navigate(['/']);  // return to home page after successfully registered
        },
        error => { // if error display error message
          this.errorMessage = "Registered failed, please again!";
        })
    } else {  // registerType is customer
      this.service.customerRegister(this.registerForm.value) // call customerRegister(form), which makes HTTP request to insert new cust entity to the database
        .subscribe(data => {
          this.successMessage = "Account is successfully registered!";
          this.router.navigate(['/']);
        },
        error => {
          this.errorMessage = "Registered failed, please again!";
        })
    }

  }

  ngOnInit() {
    // reactive form is used to build the sign up form, and validators are used to check input formats.
    // pdValidator is a custom validator used to check password format(see validators.module.ts for detail)
    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, pdValidator]],
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*[A-Za-z]$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      registerType: ["seller", Validators.required]
    })
  }
}

