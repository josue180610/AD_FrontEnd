import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewterceroComponent } from './modal-newtercero.component';

describe('ModalNewterceroComponent', () => {
  let component: ModalNewterceroComponent;
  let fixture: ComponentFixture<ModalNewterceroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewterceroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewterceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
