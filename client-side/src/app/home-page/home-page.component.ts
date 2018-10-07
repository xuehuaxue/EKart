import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  // this is the home-page component, banner is stick on the top in the html file. 
  // All-product component is used to display all products, 
  // which can also be found on home-page-component.html
  constructor() { }

  ngOnInit() {
  }

}
