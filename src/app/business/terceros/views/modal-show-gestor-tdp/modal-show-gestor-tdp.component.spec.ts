import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShowGestorTdpComponent } from './modal-show-gestor-tdp.component';

describe('ModalShowGestorTdpComponent', () => {
  let component: ModalShowGestorTdpComponent;
  let fixture: ComponentFixture<ModalShowGestorTdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShowGestorTdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowGestorTdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
