import { Component, OnInit, Injectable } from '@angular/core';
import { User } from '../classes/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pdValidator } from '../validators/validators.module';
import { AuthManagerService } from '../services/auth-manager.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

// used to handle user-profile, for both customer and seller
export class UserProfileComponent implements OnInit {
  enableEdit: boolean = false;  // used to show/hide the change-user-profile form
  randNum: number = Math.random(); // used for head image
  updateDetailForm: FormGroup;
  user; // user object either Seller or Customer, use to display the profile
  successMessage: string;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private service: AuthManagerService) { }

  getUser(userType: string) {  // get user detail
    if (userType == "seller") {  // if userType is seller, get loginSeller from localStorage and set it to user variable
      this.user = JSON.parse(localStorage.getItem("loginSeller"));
    }
    else if (userType == "customer") {  //otherwise get loginCustomer from the localStorage and set it to user variable
      this.user = JSON.parse(localStorage.getItem("loginCustomer"));
    }
  }

  changeDetails() {
    console.log(this.updateDetailForm.value);
    if (this.enableEdit) {  // if user click edit button
      console.log("lets update the user profile");
      this.service.sellerUpdateDetail(this.updateDetailForm.value)  // get the form value and update the db
        .subscribe(data => { 
          this.successMessage = "update successfully!"; this.errorMessage = null;
          localStorage.setItem("loginSeller", JSON.stringify(this.updateDetailForm.value));
          location.reload();
         }
        , error => { this.errorMessage = "please try again!"; this.successMessage = null })
    }
    this.enableEdit = !this.enableEdit;  // hide the form 
  }

  ngOnInit() {
    this.getUser(localStorage.getItem("userType"));  // check userType, then set either customer or seller to the user variable
    this.updateDetailForm = this.formBuilder.group({   // initialize a reactive form, validators are used here to check inputted value validity
      emailId: [this.user.emailId, Validators.required],
      password: [this.user.password, [Validators.required, pdValidator]],
      name: [this.user.name, [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*[A-Za-z]$')]],
      phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.user.address, [Validators.required, Validators.minLength(10)]],
      registerType: [localStorage.getItem("userType"), Validators.required]  // this is sell, we don't do customer
    })
  }
}
