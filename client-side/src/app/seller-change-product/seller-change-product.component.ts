import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../classes/product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SellerProductService } from '../seller-product.service'
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-seller-change-product',
  templateUrl: './seller-change-product.component.html',
  styleUrls: ['./seller-change-product.component.css']
})
export class SellerChangeProductComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: SellerProductService, private formBuilder: FormBuilder) { }

  error: any;
  productId: number;
  product;

  modProdForm: FormGroup
  errorMessage: string;
  successMessage: string;
  prodList: Product[];


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id']; //fetch the value of id
      this.product = JSON.parse(localStorage.sellerProducts).filter(prod => prod.productId == this.productId)[0];

      // this.product = localStorage.sellerProducts.filter(prod => prod.productId == this.productId);
      // console.log(this.product);
    });

    this.modProdForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*[A-Za-z]$')]],
      description: [this.product.description, [Validators.required, Validators.minLength(10)]],
      category: [this.product.category, Validators.required],
      brand: [this.product.brand, [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z][A-Za-z ]+[A-Za-z]$')]],
      price: [this.product.price, [Validators.required, Validators.min(1)]],
      discount: [this.product.discount, [Validators.required, Validators.min(0), Validators.max(100)]],
      quantity: [this.product.quantity, [Validators.required, Validators.min(1)]],
      productId: [this.product.productId, Validators.required]
    });
  }


  onSubmit() {  // call to change product detail
    let form = this.modProdForm.value;
    form.emailId = JSON.parse(localStorage.getItem("loginSeller")).emailId;
    console.log(form);
    this.service.modifyProduct(form)
      .subscribe(data => {
        this.successMessage = "Successfully updated the product!"
        this.cancel(); //even though the name is cancel, it is actually go back
      }
      , error => this.errorMessage = "Please try again!"
      )
  }



  cancel() {
    window.history.back();
  }
}
