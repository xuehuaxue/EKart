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

  errorMessage: string;
  successMessage: string;
  prodList: Product[];
  addProductForm: FormGroup;
  categoryList = ["Clothing - Kids", "Clothing - Men", "Clothing - Women", "Electronics - Camera",
    "Electronics - Desktop", "Electronics - Laptop", "Electronics - Mobile", "Electronics - Other Appliances",
    "Home - Decor", "Home - Furniture", "Home - Kitchen", "Sports"];

  constructor(private formBuilder: FormBuilder, private service: SellerProductService) { }

  // on submit is gonna add new products to the db
  onSubmit() {
    let form = this.addProductForm.value;
    form.emailId = JSON.parse(localStorage.getItem("loginSeller")).emailId;
    this.service.addProduct(form)
      .subscribe(data => {
        this.successMessage = "Successfully added the product!"
        this.addProductForm.reset();
      },
      error => {
        this.errorMessage = "Please try again!"
      })
  }

  cancel() {
    window.history.back();
  }

  ngOnInit() {
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
