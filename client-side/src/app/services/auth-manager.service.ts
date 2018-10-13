import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do'
import { Product } from '../classes/product'

@Injectable()
export class AuthManagerService {

  // this service is used to manage the authentication of seller and customers,
  // including seller login, customer login, seller register, customer registers,
  // and seller update details.
  constructor(private http: Http) { }

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

  // use for seller login, make a http request
  sellerLogin(data){
    return this.http.post(this.sellerloginUrl, data)
      .map((response: Response) => response.json())
      .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // use for customer login
  customerLogin(data){
    return this.http.post(this.customerloginUrl, data)
      .map((response: Response) => response.json())
      // .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // use for custome register
  customerRegister(data){
    data.address = null; //we skip the address Model
    return this.http.post(this.customerRegisterUrl, data)
    .map((response: Response) => response.json())
    // .do(data => console.log("All: " + JSON.stringify(data)))
    .catch(this.handleError);
  }

  // use for seller register
  sellerRegister(data){
    return this.http.post(this.sellerRegUrl, data)
      .map((response: Response) => response.json())
      // .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  // use to update details
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
