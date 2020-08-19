import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccessResultComponent } from './modal-access-result.component';

describe('ModalAccessResultComponent', () => {
  let component: ModalAccessResultComponent;
  let fixture: ComponentFixture<ModalAccessResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAccessResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAccessResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
