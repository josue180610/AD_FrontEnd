import { TestBed, async } from '@angular/core/testing';
import { SearchInvoiceComponent } from './search-invoice.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import { RouterTestingModule } from '@angular/router/testing'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TDPDirectivesModule } from '@tdp/ng-commons';

describe('SearchInvoiceComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchInvoiceComponent 
      ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) ,
        MatTableModule,
        MatPaginatorModule
      ],
      providers:[
        TDPDirectivesModule
      ]
    }).compileComponents();
  }));
  it('should create Search Invoice', async(() => {
    const fixture = TestBed.createComponent(SearchInvoiceComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});