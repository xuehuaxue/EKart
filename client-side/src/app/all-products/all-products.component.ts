import { Component, OnInit } from '@angular/core';
import { AllProductsService } from '../all-products.service'
import { Product } from '../classes/product'

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private service: AllProductsService) { }

  productList: Product[];
  errorMessage: string;
  showDetail: boolean = false;

  getProducts() {
    this.service.getProducts().subscribe(
      prod => {
        this.productList = prod;
        localStorage.setItem("productList", JSON.stringify(prod))
      },
      error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.productList = JSON.parse(localStorage.getItem("productList"));
    this.getProducts();
  }
}
