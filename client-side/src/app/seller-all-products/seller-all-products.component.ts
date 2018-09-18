import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product'
import { Router } from '@angular/router';
import { SellerProductService } from '../seller-product.service'

@Component({
  selector: 'app-seller-all-products',
  templateUrl: './seller-all-products.component.html',
  styleUrls: ['./seller-all-products.component.css']
})
export class SellerAllProductsComponent implements OnInit {

  constructor(private router:Router, private service:SellerProductService) { }
  productList = null;

  // render the change form with info corresponding to the product detail
  modifyProduct(productId:string) {
    this.router.navigate(['/modifyProduct', productId]);
  }
  // modifyProduct(product:Product) {
  //   this.router.navigate(['/modifyProduct', product.productId]);
  // }
  getAllProduct(){
    let sellDetailForm = JSON.parse(localStorage.getItem("loginSeller"));
    this.service.getSellerProd(sellDetailForm)
    .subscribe(data => {
      this.productList = data;
      localStorage.setItem("sellerProducts", JSON.stringify(data));
    });
  }

  ngOnInit() {
    if(localStorage.getItem("sellerProducts")){
      this.productList = JSON.parse(localStorage.getItem("sellerProducts"));
    }
    this.getAllProduct();
  }
}
