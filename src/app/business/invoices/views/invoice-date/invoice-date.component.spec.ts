import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDateComponent } from './invoice-date.component';

describe('InvoiceDateComponent', () => {
  let component: InvoiceDateComponent;
  let fixture: ComponentFixture<InvoiceDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
