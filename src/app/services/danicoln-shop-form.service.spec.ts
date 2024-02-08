import { TestBed } from '@angular/core/testing';

import { DanicolnShopFormService } from './danicoln-shop-form.service';

describe('DanicolnShopFormService', () => {
  let service: DanicolnShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanicolnShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
