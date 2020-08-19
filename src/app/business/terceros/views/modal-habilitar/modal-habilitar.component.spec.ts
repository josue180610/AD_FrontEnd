import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHabilitarComponent } from './modal-habilitar.component';

describe('ModalHabilitarComponent', () => {
  let component: ModalHabilitarComponent;
  let fixture: ComponentFixture<ModalHabilitarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHabilitarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHabilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
