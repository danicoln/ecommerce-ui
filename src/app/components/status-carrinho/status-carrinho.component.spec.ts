import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCarrinhoComponent } from './status-carrinho.component';

describe('StatusCarrinhoComponent', () => {
  let component: StatusCarrinhoComponent;
  let fixture: ComponentFixture<StatusCarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCarrinhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
