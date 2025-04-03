import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioMensagemComponent } from './comentario-mensagem.component';

describe('ComentarioMensagemComponent', () => {
  let component: ComentarioMensagemComponent;
  let fixture: ComponentFixture<ComentarioMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioMensagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
