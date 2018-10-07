import { Component, OnInit } from '@angular/core';
import { AllProductsService } from '../Services/all-products.service'
import { Product } from '../classes/product'

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  // this component is used to display all products from the system
  constructor(private service: AllProductsService) { }

  productList: Product[];  // list that contains all products, initialize to an empty list for type of Product
  errorMessage: string;
  showDetail: boolean = false;  // this is used to show or hide product description

  getProducts() {
    this.service.getProducts().subscribe(  // call getProducts() and set response to this.productList, which will display in the frontend
      prod => {
        this.productList = prod;
        localStorage.setItem("productList", JSON.stringify(prod))  // store the response to localStorage in string format
      },
      error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.productList = JSON.parse(localStorage.getItem("productList")); // display old productList, then call the function to get new list
                                                                        // this way there won't be empty list
    this.getProducts();
  }
}
