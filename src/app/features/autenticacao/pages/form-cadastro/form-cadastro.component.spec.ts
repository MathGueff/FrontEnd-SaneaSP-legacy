import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroComponent } from './form-cadastro.component';

describe('FormCadastroComponent', () => {
  let component: FormCadastroComponent;
  let fixture: ComponentFixture<FormCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadastroComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
