import { Injectable } from '@angular/core';

import { Observable, of, fromEventPattern } from 'rxjs';

import { Employee,PageEmployee } from './Employee';
import { HEROES } from  '../../business/invoices/views/search-invoice/search-invoice.component';
import {HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private baseUrl = 'http://192.168.43.42:8081/invoiceservice/v1/invoice/';
  constructor(private http: HttpClient) { }
 

  getEmployees(): Observable<any> { 
  return null;
  }


} 