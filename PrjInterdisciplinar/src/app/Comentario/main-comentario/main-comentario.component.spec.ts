import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComentarioComponent } from './main-comentario.component';

describe('MainComentarioComponent', () => {
  let component: MainComentarioComponent;
  let fixture: ComponentFixture<MainComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComentarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
