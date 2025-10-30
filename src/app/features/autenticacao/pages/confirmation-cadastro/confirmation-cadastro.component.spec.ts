import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCadastroComponent } from './confirmation-cadastro.component';

describe('ConfirmationCadastroComponent', () => {
  let component: ConfirmationCadastroComponent;
  let fixture: ComponentFixture<ConfirmationCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
