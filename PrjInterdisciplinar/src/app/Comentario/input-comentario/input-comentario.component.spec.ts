import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComentarioComponent } from './input-comentario.component';

describe('InputComentarioComponent', () => {
  let component: InputComentarioComponent;
  let fixture: ComponentFixture<InputComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComentarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
