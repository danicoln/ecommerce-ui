import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaProdutoMenuComponent } from './categoria-produto-menu.component';

describe('CategoriaProdutoMenuComponent', () => {
  let component: CategoriaProdutoMenuComponent;
  let fixture: ComponentFixture<CategoriaProdutoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaProdutoMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaProdutoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
