import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../classes/product';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do'

@Injectable()
export class SellerProductService {

  constructor(private http: Http) { }
  sellerId: string = JSON.parse(localStorage.getItem("loginSeller")).userId;
  addProductUrl: string = "http://localhost:8081/EKart/SellerAPI/addItem";
  getProductUrl: string = "http://localhost:8081/EKart/SellerAPI/getProductBySeller";
  modProductUrl: string = "http://localhost:8081/EKart/SellerAPI/modifyProductDetail";

  addProduct(data) {
    return this.http.post(this.addProductUrl, data)
      .map((response: Response) => response.json())
      // .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // // this is the function to fetch all product under the seller's account
  // // for demonstration purpose, I will use a DUMMY DATA since the backend is missing 
  // getSellerProd(data) {
  //   return this.http.post(this.getProductUrl, data)
  //     .map((response: Response) => response.json())
  //     // .do(data => console.log("All: " + JSON.stringify(data)))
  //     .catch(this.handleError);
  // }

  // this IS NOT THE REAL function that make POST request to the backend and fetch all product under the 
  // seller's account. It is simply for demonstration purpose ONLY! 
  getSellerProd(data) {
    return this.http.get("./assets/dummySellerProducts.json")
      .map((response: Response) => response.json())
      // .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  modifyProduct(data) {
    return this.http.post(this.modProductUrl, data)
      .map((response: Response) => response.json())
      // .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
