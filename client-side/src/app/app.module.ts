import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { PwPipePipe } from './Pipes/pw-pipe.pipe';
import { ValidatorsModule } from './validators/validators.module'
import { AuthManagerService } from './services/auth-manager.service';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AllProductsComponent } from './all-products/all-products.component'
import { HttpModule }     from '@angular/http';
import { AllProductsService } from './services/all-products.service';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerAllProductsComponent } from './seller-all-products/seller-all-products.component';
import { SellerChangeProductComponent } from './seller-change-product/seller-change-product.component'
import { SellerProductService } from './services/seller-product.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomePageComponent,
    UserProfileComponent,
    SellerProfileComponent,
    PwPipePipe,
    CustomerProfileComponent,
    AllProductsComponent,
    AddProductComponent,
    SellerAllProductsComponent,
    SellerChangeProductComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatorsModule,
    HttpModule
  ],
  providers: [AuthManagerService, AllProductsService, SellerProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }