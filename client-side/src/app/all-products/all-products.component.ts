import { Component, OnInit } from '@angular/core';
import { AllProductsService } from '../services/all-products.service'
import { Product } from '../classes/product'

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  // this component is used to display all products from the system
  constructor(private service: AllProductsService) { }  // import AllProductsService, which contains getProducts()
  // it makes http request to the server and get all products from the system

  productList: Product[];  // list that contains all products, initialize to an empty list that contains Product objects
  errorMessage: string;  // string for error message
  showDetail: boolean = false;  // this is used with a button, click to show or hide product description

  getProducts() {
    this.service.getProducts().subscribe(  // call getProducts() and set JSON to this.productList, which will display in the frontend
      prod => {
        this.productList = prod;
        localStorage.setItem("productList", JSON.stringify(prod))  // store product-list to localStorage in string format
      },
      error => this.errorMessage = <any>error);  // if error, set the error message to errorMessage
  }

  ngOnInit() {
    this.productList = JSON.parse(localStorage.getItem("productList")); // display old productList, then call the function to get new list
    // from the database. This fixs the problem of showing empty list while loading the product lists from the server
    this.getProducts();
  }
}
