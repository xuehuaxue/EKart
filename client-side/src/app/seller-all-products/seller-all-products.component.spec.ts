import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAllProductsComponent } from './seller-all-products.component';

describe('SellerAllProductsComponent', () => {
  let component: SellerAllProductsComponent;
  let fixture: ComponentFixture<SellerAllProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerAllProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
