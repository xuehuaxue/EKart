import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do'
import { Product } from '../classes/product'

@Injectable()
export class AuthManagerService {

  constructor(private http: Http) { }
  private getAllUrl: string = "./assets/test.json";  // this is a test for GET, actual getAllProduct() is implement in all-product service

  private sellerloginUrl: string = "http://localhost:8081/EKart/SellerAPI/login";  // url for logging in
  private customerloginUrl: string = "http://localhost:8081/EKart/CustomerAPI/login";
  private sellerRegUrl: string = "http://localhost:8081/EKart/SellerAPI/register";
  private sellerUpdateUrl: string = "http://localhost:8081/EKart/SellerAPI/modifySellerDetails";  //update seller's account
  private customerRegisterUrl:string = "http://localhost:8081/EKart/CustomerAPI/register";


  // this function is used to check localstorage for login
  checkLogin(){
    let status = {customerLogin:false, sellerLogin:false};
    if (localStorage.loginSeller){
      status.sellerLogin = true;
    }

    if(localStorage.loginCustomer){
      status.customerLogin = true;
    }
    console.log(status);
    return status;
  }
  
  getProducts(): Observable<Product[]> {
    return this.http.get(this.getAllUrl)
      .map((response: Response) => response.json())
      .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  sellerLogin(data){
    return this.http.post(this.sellerloginUrl, data)
      .map((response: Response) => response.json())
      .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  customerLogin(data){
    return this.http.post(this.customerloginUrl, data)
      .map((response: Response) => response.json())
      // .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  customerRegister(data){
    data.address = null; //we skip the address Model
    return this.http.post(this.customerRegisterUrl, data)
    .map((response: Response) => response.json())
    // .do(data => console.log("All: " + JSON.stringify(data)))
    .catch(this.handleError);
  }

  sellerRegister(data){
    return this.http.post(this.sellerRegUrl, data)
      .map((response: Response) => response.json())
      // .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  sellerUpdateDetail(data){
    return this.http.post(this.sellerUpdateUrl, data)
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
