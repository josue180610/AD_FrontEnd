import { TestBed, async } from '@angular/core/testing';
import { ListInvoiceComponent } from './list-invoice.component';

import {  MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListInvoiceComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListInvoiceComponent 
      ],
      imports:[
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        NgxPaginationModule,
        RouterTestingModule.withRoutes([])
      
      ]
    }).compileComponents();
  }));
  it('should create the List Invoice', async(() => {
    const fixture = TestBed.createComponent(ListInvoiceComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});