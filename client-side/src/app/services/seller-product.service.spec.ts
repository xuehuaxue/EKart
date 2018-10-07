import { TestBed, inject } from '@angular/core/testing';

import { SellerProductService } from './seller-product.service';

describe('SellerProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerProductService]
    });
  });

  it('should be created', inject([SellerProductService], (service: SellerProductService) => {
    expect(service).toBeTruthy();
  }));
});
