import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do'
import { Product } from '../classes/product'

@Injectable()
export class AllProductsService {

  constructor(private http: Http) { }
  private getAllUrl: string = "http://localhost:8081/EKart/SellerAPI/getAllProducts";

  // this is the REAL function used to make http request and get all products from the database
  // getProducts(): Observable<Product[]> {
  //   return this.http.get(this.getAllUrl)
  //     .map((response: Response) => <Product[]>response.json())
  //     // .do(data => console.log("All: " + JSON.stringify(data)))
  //     .catch(this.handleError);
  // }

  // this is the replicate getProducts() that uses dummy data from "./assets/test.json"
  // since the backend is missing from this repo. This is ONLY FOR DEMONSTRATION PURPOSE! 
  getProducts(): Observable<Product[]> {
    return this.http.get("./assets/dummyProducts.json")
      .map((response: Response) => <Product[]>response.json())
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
