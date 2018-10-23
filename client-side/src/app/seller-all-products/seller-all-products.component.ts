import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product'
import { Router } from '@angular/router';
import { SellerProductService } from '../services/seller-product.service'

@Component({
  selector: 'app-seller-all-products',
  templateUrl: './seller-all-products.component.html',
  styleUrls: ['./seller-all-products.component.css']
})
export class SellerAllProductsComponent implements OnInit {
  // display all products under the seller's account

  constructor(private router:Router, private service:SellerProductService) { }
  productList = null;

  // render the modify-detail-form for a specific product in format of /modifyProduct/{{ productId }}
  // if user click a product with id 1001, then /modifyProduct/1001 will be called
  modifyProduct(productId:string) {
    this.router.navigate(['/modifyProduct', productId]);
  }

  getAllProduct(){
    let sellDetailForm = JSON.parse(localStorage.getItem("loginSeller")); 
    this.service.getSellerProd(sellDetailForm)  // functin to get all products under seller's account
    .subscribe(data => {
      this.productList = data;
      localStorage.setItem("sellerProducts", JSON.stringify(data));
    });
  }

  ngOnInit() {
    if(localStorage.getItem("sellerProducts") != "undefined"){
      this.productList = JSON.parse(localStorage.getItem("sellerProducts"));
    }
    this.getAllProduct();
  }
}
