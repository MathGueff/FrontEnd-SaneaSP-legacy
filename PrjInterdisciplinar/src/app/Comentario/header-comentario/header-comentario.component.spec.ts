import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComentarioComponent } from './header-comentario.component';

describe('HeaderComentarioComponent', () => {
  let component: HeaderComentarioComponent;
  let fixture: ComponentFixture<HeaderComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComentarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
