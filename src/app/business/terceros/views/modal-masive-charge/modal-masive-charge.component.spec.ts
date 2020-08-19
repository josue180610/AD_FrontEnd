import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMasiveChargeComponent } from './modal-masive-charge.component';

describe('ModalMasiveChargeComponent', () => {
  let component: ModalMasiveChargeComponent;
  let fixture: ComponentFixture<ModalMasiveChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMasiveChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMasiveChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
