import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../classes/product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SellerProductService } from '../services/seller-product.service'
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-seller-change-product',
  templateUrl: './seller-change-product.component.html',
  styleUrls: ['./seller-change-product.component.css']
})
export class SellerChangeProductComponent implements OnInit {

  // component to handle product details change
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
      this.productId = params['id']; //fetch the product ID from the url
      this.product = JSON.parse(localStorage.sellerProducts).filter(prod => prod.productId == this.productId)[0];
      // search through the localStorage to find product that has matched productId. A list with only ONE result will be returned.
    });

    // reactive form is used for form of changing product details
    this.modProdForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z0-9 ]*[A-Za-z0-9]$')]],
      description: [this.product.description, [Validators.required, Validators.minLength(10)]],
      category: [this.product.category, Validators.required],
      brand: [this.product.brand],
      price: [this.product.price, [Validators.required, Validators.min(1)]],
      discount: [this.product.discount, [Validators.required, Validators.min(0), Validators.max(100)]],
      quantity: [this.product.quantity, [Validators.required, Validators.min(1)]],
      productId: [this.product.productId, Validators.required]
    });
  }


  onSubmit() {  // call on form submit
    let form = this.modProdForm.value;
    form.emailId = JSON.parse(localStorage.getItem("loginSeller")).emailId;  // get login seller's emailId
    console.log(form);
    this.service.modifyProduct(form)  // call modifyProduct(form), which will call apis to perform product update in the db.
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
