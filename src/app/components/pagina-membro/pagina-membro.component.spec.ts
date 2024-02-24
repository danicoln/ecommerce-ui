import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMembroComponent } from './pagina-membro.component';

describe('PaginaMembroComponent', () => {
  let component: PaginaMembroComponent;
  let fixture: ComponentFixture<PaginaMembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaMembroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
