import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsRegisterComponent } from './symptoms-register.component';

describe('SymptomsRegisterComponent', () => {
  let component: SymptomsRegisterComponent;
  let fixture: ComponentFixture<SymptomsRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomsRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
