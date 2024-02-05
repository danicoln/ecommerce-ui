import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoDetailsComponent } from './carrinho-details.component';

describe('CarrinhoDetailsComponent', () => {
  let component: CarrinhoDetailsComponent;
  let fixture: ComponentFixture<CarrinhoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
