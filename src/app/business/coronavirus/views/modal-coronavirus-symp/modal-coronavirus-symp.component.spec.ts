import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoronavirusSympComponent } from './modal-coronavirus-symp.component';

describe('ModalCoronavirusSympComponent', () => {
  let component: ModalCoronavirusSympComponent;
  let fixture: ComponentFixture<ModalCoronavirusSympComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCoronavirusSympComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCoronavirusSympComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
