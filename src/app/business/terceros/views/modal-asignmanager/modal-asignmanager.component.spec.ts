import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignmanagerComponent } from './modal-asignmanager.component';

describe('ModalAsignmanagerComponent', () => {
  let component: ModalAsignmanagerComponent;
  let fixture: ComponentFixture<ModalAsignmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
