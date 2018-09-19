import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  // home page component, banner is implement in the frontend. And all-product component is also used in this component to display all products
  constructor() { }

  ngOnInit() {
  }

}
