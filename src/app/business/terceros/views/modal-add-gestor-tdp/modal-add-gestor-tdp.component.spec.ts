import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddGestorTdpComponent } from './modal-add-gestor-tdp.component';

describe('ModalAddGestorTdpComponent', () => {
  let component: ModalAddGestorTdpComponent;
  let fixture: ComponentFixture<ModalAddGestorTdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddGestorTdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddGestorTdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
