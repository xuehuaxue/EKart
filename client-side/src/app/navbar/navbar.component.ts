import { Component, OnInit } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular-local-storage/dist/angular-local-storage.min.js";
import { AuthManagerService } from '../services/auth-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // navigation bar component, this should stick on top of the application all the time

  constructor(private authManager: AuthManagerService, private router:Router) { } // AuthManagerService checks user authentication
  // if a seller or a customer is login, "view profile" and "logout" button are displayed,
  // otherwise "register" and "login" are displayed.
  isSellerLogin:boolean = false;  // used to check seller login, intialized to false
  isCustomerLogin:boolean = false;  // use to check customer login
  userName = localStorage.getItem("username");  // get username from the localStorage, if no one has signed in, it will be empty

  checkLogin(){
    let status = this.authManager.checkLogin(); // check login status and set either sellerLogin or custLogin to true, or both to false
    this.isSellerLogin = status.sellerLogin
    this.isCustomerLogin = status.customerLogin;
  }

  logout(){  // function to log user out
    localStorage.clear();  // destory the localStorage will let user logout
    // console.log("the seller object is "+localStorage.isSellerLogin);
    this.checkLogin();  // update the navigation bar, both isSellerLogin and isCustomerLogin should be set to False
    this.router.navigate(["/home"]);  // after logout, return to home page
  }

  ngOnInit() {
    this.checkLogin();  // everytime the navbar is loaded, we check the login status and update the buttons accordingly
  }
}
