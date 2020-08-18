import { TestBed, async } from '@angular/core/testing';
import { InvoiceHomeComponent } from './invoice-home.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';

 describe('InvoiceHomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InvoiceHomeComponent 
      ],
      imports:[
        MatCardModule,
        MatDividerModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      
    }).compileComponents();
  }));
  it('should create Invoice Home', async(() => {
    const fixture = TestBed.createComponent(InvoiceHomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});