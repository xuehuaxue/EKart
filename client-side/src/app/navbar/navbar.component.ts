import { Component, OnInit } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular-local-storage/dist/angular-local-storage.min.js";
import { AuthManagerService } from '../Services/auth-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // navigation bar component

  constructor(private authManager: AuthManagerService, private router:Router) { }
  // if sellerLogin or customerLogin, "view profile" and "logout" options are displayed,
  // otherwise "register" and "login" are displayed.
  isSellerLogin:boolean = false;  // used to check user login, intialized to false
  isCustomerLogin:boolean = false;
  userName = localStorage.getItem("username");

  checkLogin(){
    let status = this.authManager.checkLogin(); // check if anyone login and set either sellerLogin or custLogin to true, or both to false
    this.isSellerLogin = status.sellerLogin
    this.isCustomerLogin = status.customerLogin;
  }

  logout(){
    localStorage.clear();  // destory the localStorage makes user logout
    console.log("the seller object is "+localStorage.isSellerLogin);
    this.checkLogin();  // update the navigation bar
    this.router.navigate(["/home"]);
  }

  ngOnInit() {
    this.checkLogin();
  }
}
