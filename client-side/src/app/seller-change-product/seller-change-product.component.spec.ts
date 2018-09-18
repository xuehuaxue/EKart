import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerChangeProductComponent } from './seller-change-product.component';

describe('SellerChangeProductComponent', () => {
  let component: SellerChangeProductComponent;
  let fixture: ComponentFixture<SellerChangeProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerChangeProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerChangeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
