import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  name:string = JSON.parse(localStorage.getItem("loginSeller")).name;
  constructor() { }

  ngOnInit() {
  }

}
