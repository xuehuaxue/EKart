import { Component, OnInit, Injectable } from '@angular/core';
import { User } from '../classes/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pdValidator } from '../validators/validators.module';
import { AuthManagerService } from '../auth-manager.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  enableEdit: boolean = false;
  randNum: number = Math.random(); // used for head image
  updateDetailForm: FormGroup;
  user; // user object either Seller or Customer 
  successMessage: string;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private service: AuthManagerService) { }

  getUser(userType: string) {
    if (userType == "seller") {
      this.user = JSON.parse(localStorage.getItem("loginSeller"));
    }
    else if (userType == "customer") {
      this.user = JSON.parse(localStorage.getItem("loginCustomer"));
    }
  }

  changeDetails() {
    console.log(this.updateDetailForm.value);
    if (this.enableEdit) {
      console.log("lets update the user profile");
      this.service.sellerUpdateDetail(this.updateDetailForm.value)
        .subscribe(data => { 
          this.successMessage = "update successfully!"; this.errorMessage = null;
          localStorage.setItem("loginSeller", JSON.stringify(this.updateDetailForm.value));
          location.reload();
         }
        , error => { this.errorMessage = "please try again!"; this.successMessage = null })
    }
    this.enableEdit = !this.enableEdit;
  }

  ngOnInit() {
    this.getUser(localStorage.getItem("userType"));  // usd to set userType
    this.updateDetailForm = this.formBuilder.group({   // initialize a group form
      emailId: [this.user.emailId, Validators.required],
      password: [this.user.password, Validators.required],
      name: [this.user.name, [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*[A-Za-z]$')]],
      phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.user.address, [Validators.required, Validators.minLength(10)]],
      registerType: [localStorage.getItem("userType"), Validators.required]  // this is sell, we don't do customer
    })
  }
}
