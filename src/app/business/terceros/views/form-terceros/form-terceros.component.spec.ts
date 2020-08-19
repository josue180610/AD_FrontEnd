import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTercerosComponent } from './form-terceros.component';

describe('FormTercerosComponent', () => {
  let component: FormTercerosComponent;
  let fixture: ComponentFixture<FormTercerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTercerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
