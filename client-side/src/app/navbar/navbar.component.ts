import { Component, OnInit } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular-local-storage/dist/angular-local-storage.min.js";
import { AuthManagerService } from '../auth-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authManager: AuthManagerService, private router:Router) { }
  isSellerLogin:boolean = false;
  isCustomerLogin:boolean = false;
  userName = localStorage.getItem("username");

  checkLogin(){
    let status = this.authManager.checkLogin();
    this.isSellerLogin = status.sellerLogin
    this.isCustomerLogin = status.customerLogin;
  }

  logout(){
    localStorage.clear();
    console.log("the seller object is "+localStorage.isSellerLogin);
    this.checkLogin();
    this.router.navigate(["/home"]);
  }

  ngOnInit() {
    this.checkLogin();
  }
}
