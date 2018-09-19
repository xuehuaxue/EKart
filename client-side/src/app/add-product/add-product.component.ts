import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pdValidator } from '../validators/validators.module';
import { SellerProductService } from '../seller-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  // this component is used for seller to add new product
  errorMessage: string;
  successMessage: string;
  prodList: Product[];  // product list
  addProductForm: FormGroup;  // add product form
  categoryList = ["Clothing - Kids", "Clothing - Men", "Clothing - Women", "Electronics - Camera",
    "Electronics - Desktop", "Electronics - Laptop", "Electronics - Mobile", "Electronics - Other Appliances",
    "Home - Decor", "Home - Furniture", "Home - Kitchen", "Sports"];  // all category list

  constructor(private formBuilder: FormBuilder, private service: SellerProductService) { }

  // this is gonna be called when the form is submitted
  onSubmit() {
    let form = this.addProductForm.value;  // get the form value
    form.emailId = JSON.parse(localStorage.getItem("loginSeller")).emailId;  // get the authenticated seller's email id from the localStorage
    this.service.addProduct(form) // call addProduct(form) to call addProduct(form), whiich will add the new product to db
      .subscribe(data => {
        this.successMessage = "Successfully added the product!"  // if succeed show the message
        this.addProductForm.reset();
      },
      error => {
        this.errorMessage = "Please try again!"
      })
  }

  cancel() {  // go back to previous page
    window.history.back();
  }

  ngOnInit() {  // reactive form is used to build the add product form, validators are used to check inputted values
    this.addProductForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*[A-Za-z]$')]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      category: ["", Validators.required],
      brand: ["", [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z][A-Za-z ]+[A-Za-z]$')]],
      price: ["", [Validators.required, Validators.min(1)]],
      discount: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      quantity: ["", [Validators.required, Validators.min(1)]]
    });
  }
}
