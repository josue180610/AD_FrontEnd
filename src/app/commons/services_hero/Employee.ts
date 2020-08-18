import { StringMap } from '@angular/core/src/render3/jit/compiler_facade_interface';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Time } from '@angular/common';

 
  
export interface PageEmployee {
     content: Employee[];
     totalPages: number;
     totalElements: number;
     last: boolean;
     first: boolean;
     pageNumber: number;
     numberOfElements: number;
     empty: boolean;
  } 
export interface ResponseProcess{
    id: Number;
    end: Number;
    stepstatus: string;
    invoiceSize: Number;
    azureFail: Number;
    pdfFail: Number;
    mailSuccess: Number;
    executionDate: Date;
    timeinitTotal: Date;
    totalTime: Time;
    pdfSxF: String;
    azureSuccess: Number;
    excelName: String;
    company: String;
    adminUserID: String;
    timefinTotal: Date;
    mailFail: Number;
    azureSxF: String;
    adminUserName: String;
    mailAttempts: Number;
    mailSxF: String;
    adminUserCIP: String;
    pdfSuccess: 5438;
    pdfElapsedTime: Time;
    azureElapsedTime:Time;
    mailElapsedTime: Time;
    excelInvoiceRowsNum: Number;
    excelElapsedTime: Time;
    excelInvoiceColNum: Number
    
}
  export interface Employee { 
     id: number;
     categoryLabel:string;
     departmentName:string;
     cip: string;
     dni:string;
     nationaId: string;
     name: string;
     lastname1: string;
     lastname2: string;
     mail: string;
     gender: string;   
     process: string;
     activity: string;
     position: string;
     age: number;
     location: string;
     hiredate:Date; 
     subemployee: SubEmployee[];
  } 
  export interface SubEmployee{ 
    cip:string;
    dni:string;
    name:string;
    lastname1:string;
    lastname2:string;
  }
  export class Invoice {
    id:number;
    
    constructor(
       id: number,
       employeename: string,
       type: string,
       datemition:string,
       checked: boolean
    ){}

  } 

export class PageInvoice {
totalElements: number;
content: any;
constructor(
  content: Invoice[],
  totalPages: number,
  totalElements: number,
  last: boolean,
  first: boolean,
  pageNumber: number,
  numberOfElements: number,
  empty: boolean){}
} 

 