import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pdValidator } from '../validators/validators.module';
import { SellerProductService } from '../services/seller-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  // this component is used for seller to add new product into the system
  errorMessage: string;   // message to display if there is error
  successMessage: string;  // message to display if successfully add the product to the database
  prodList: Product[];  // product list, contains all products selling by the seller
  addProductForm: FormGroup;  // form for entering product details
  categoryList = ["Clothing - Kids", "Clothing - Men", "Clothing - Women", "Electronics - Camera",
    "Electronics - Desktop", "Electronics - Laptop", "Electronics - Mobile", "Electronics - Other Appliances",
    "Home - Decor", "Home - Furniture", "Home - Kitchen", "Sports"];  // category list for goods

  constructor(private formBuilder: FormBuilder, private service: SellerProductService) { }

  // when the user click the submit button, this function will be called
  onSubmit() {
    let form = this.addProductForm.value;  // get the form value
    form.emailId = JSON.parse(localStorage.getItem("loginSeller")).emailId;  // get the authenticated seller's email id from the localStorage
    this.service.addProduct(form) // call addProduct(form), which will make api request to add the new product to database
      .subscribe(data => {
        this.successMessage = "Successfully added the product!"  // if succeed show the message
        this.addProductForm.reset();   // if succeed then clear the form, so user can use it to add another product
      },
      error => {
        this.errorMessage = "Please try again!"  // if there is error, ask users to try again
      })
  }

  cancel() {  // go back to previous page
    window.history.back();
  }

  ngOnInit() {  // reactive form is used to build the add-product-form, validators are used to check inputted values
    this.addProductForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z0-9 ]*[A-Za-z0-9]$')]], // use regex to check name format
      description: ["", [Validators.required, Validators.minLength(10)]],  // description has to be greater than 10 chars
      category: ["", Validators.required],
      brand: ["", [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z][A-Za-z ]+[A-Za-z]$')]],
      price: ["", [Validators.required, Validators.min(1)]],  // minimum price is 1 dollar
      discount: ["", [Validators.required, Validators.min(0), Validators.max(100)]],  // discount can be 0-100
      quantity: ["", [Validators.required, Validators.min(1)]]  // there should be at least one in stock
    });
  }
}
