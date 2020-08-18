
import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Hero } from '../../../../commons/services_hero/hero';
import { HeroService } from '../../../../commons/services_hero/hero.service';


import { ModuleConfigService } from 'src/app/services/module-config.service';
import { Router, NavigationEnd } from '@angular/router';
import { PageEmployee, Employee, PageInvoice,Invoice,SubEmployee } from 'src/app/commons/services_hero/Employee';
import { merge, Observable, of as observableOf, from} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
 
import Swal from 'sweetalert2';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import moment_ from 'moment';
import { URL_PROCESS_EXCEL } from '../../../../../app/services/url.constants';

const moment = moment_;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
 

 @Component({
  selector: 'tdp-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
 
export class ListInvoiceComponent implements OnInit {
  private SERVER_URL = 'http://192.168.1.9:8080/invoiceservice/v1/invoice/'; 
  private uploadForm: FormGroup;

  displayedColumns: string[] = ['cip', 'nationaId', 'name', 'find'];

  employeesData: HttpConn | null;
  data: Employee[];

  data2: Invoice[];

  @ViewChild('paginator1') paginator: MatPaginator;
  @ViewChild('matSort2') sort: MatSort;

  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('matSort2') sort2: MatSort;

  resultsLength2 = 0;
  isLoadingResults2 = true;
  isRateLimitReached2 = false;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  date = new FormControl(moment());
  dat = new FormControl(moment());

  access: Array<Object> = [];
 

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }
 

  constructor(private heroService: HeroService, private router: Router,
    private accessControl: ModuleConfigService, private formBuilder: FormBuilder,
    private httpClient: HttpClient,private http: HttpClient , private cdr : ChangeDetectorRef) {

    this.access = accessControl.getAccess(router.url).access;
    console.log(this.access)

  }
  datas; 
  datax;
  cip; 
  gender;
  banderola=false;

  getEmployees(){
    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers };

     this.http.get( `${URL_PROCESS_EXCEL}try3?page=0&name=${this.cip}` ,options).subscribe(data => {
      console.log(`${URL_PROCESS_EXCEL}try3?page=0&name=${this.cip}` )
      console.log(data[0].content);
      this.datas=data[0].content; 
      console.log(this.datas[0]); 
      this.datax = this.datas[0].subemployee as SubEmployee ;
      console.log(this.datax);
      this.banderola=true;
      });  
  }
  //formateo de las fechas a solo mes y año
  chosenYearHandler(normalizedYear: moment_.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: moment_.Moment, datepicker: MatDatepicker<moment_.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  chosenYearHandler1(normalizedYear: moment_.Moment) {
    const ctrlValues = this.dat.value;
    ctrlValues.year(normalizedYear.year());
    this.dat.setValue(ctrlValues);
  }

  chosenMonthHandler1(normalizedMonth: moment_.Moment, datepicker: MatDatepicker<moment_.Moment>) {
    const ctrlValues = this.dat.value;
    ctrlValues.month(normalizedMonth.month());
    this.dat.setValue(ctrlValues);
    datepicker.close();
  }


  searchString: String = ''; 
  
  //traemos la data del jefe por get
  ngOnInit() {
    console.log( localStorage.getItem("cip").replace(/['"]+/g, '') + " LLEGO ")
    this.cip = localStorage.getItem("cip").replace(/['"]+/g, '');
    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers };

     this.http.get( `${URL_PROCESS_EXCEL}try3?page=0&name=${this.cip}` ,options).subscribe(data => {
      console.log(`${URL_PROCESS_EXCEL}try3?page=0&name=${this.cip}` )
      console.log(data[0].content);
      this.datas=data[0].content; 
      console.log(this.datas[0]); 
      this.datax = this.datas[0].subemployee as SubEmployee ;
      console.log(this.datax);
      this.banderola=true;
      });   
  }

 
 
  bpageSizeLen = 5;
  bresultsLength = 0;
  bisLoadingResults = true;
  bisRateLimitReached = false;
  selectedUser;

  invoiceData: HttpConnBol | null;
  invoiceDataSe: HttpConnBolSe | null;
  date1=this.fromDate ;
  date2=this.toDate;
 
  displayedColumnsInvo: string[] = ['select', 'type', 'emition', 'actions'];
  oculto= 'no-active';
  //manda la data de persona (boletas) a una nueva mattable
  showUser(persona) {
    this.oculto = 'active';
    this.selectedUser = persona;
     
    this.invoiceData = new HttpConnBol(this.httpClient);
    this.sort2.sortChange.subscribe(() => this.paginator2.pageIndex = 0);
    /*name: string, page: number, size: number, order: string  */
    /* merge(this.sort2.sortChange, this.paginator2.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults2 = true;
          return this.invoiceData!.getInvo(
            this.selectedUser.cip,
            this.date1, this.date2, this.paginator2.pageIndex, this.paginator2.pageSize, this.sort2.direction);
        }),
        map(data2 => {
          this.isLoadingResults2 = false;
          this.isRateLimitReached2 = false;
          this.resultsLength2 = data2.totalElements;
          console.log(data2);
          return data2.content;
        }),
        catchError(e => {
          console.log("error " + e)
          this.isLoadingResults2 = false;
          this.isRateLimitReached2 = true;
          return observableOf([]);
        })
      ).subscribe(data2 => {
        if (data2) {
          this.data2 = data2;
          console.log(data2 + " asd" + this.data2)
        }
      }); */
    return this.selectedUser;
  }
  //transforma la fecha de los datepickers a nuestro formato local
  getDateRange(value ) {
    // getting date from calendar 
    const fromDate = value.fromDate
    const toDate = value.toDate
    console.log(fromDate,toDate);
    console.log( fromDate._d); 
    console.log( fromDate.format('MM/DD/YYYY') );
    console.log(toDate.format('MM/DD/YYYY'));
    const date1=  fromDate.format('MM/DD/YYYY') ;
    const date2=  toDate.format('MM/DD/YYYY') ; 
    console.log(fromDate._i)
    console.log(typeof(fromDate.date()) )
    console.log(toDate.toISOString())
 
    this.showBol(date1,date2 );
  }
  //buscara las fechas 1 y 2, y msotrara las boletas de eesa fecha
  showBol(date1,date2 ) {
     
    console.log(this.selectedUser);
    console.log(date1);
    console.log(date2);
    this.invoiceDataSe = new HttpConnBolSe(this.httpClient);
    this.sort2.sortChange.subscribe(() => this.paginator2.pageIndex = 0);
    /*name: string, page: number, size: number, order: string  */
    /* merge(this.sort2.sortChange, this.paginator2.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults2 = true;
          return this.invoiceDataSe!.getInvoSe(
            this.selectedUser.cip,
             date1,  date2, this.paginator2.pageIndex, this.paginator2.pageSize, this.sort2.direction);
        }),
        map(data2 => {
          this.isLoadingResults2 = false;
          this.isRateLimitReached2 = false;
          this.resultsLength2 = data2.totalElements;
          console.log(data2);
          return data2.content;
        }),
        catchError(e => {
          console.log("error " + e)
          this.isLoadingResults2 = false;
          this.isRateLimitReached2 = true;
          return observableOf([]);
        })
      ).subscribe(data2 => {
        if (data2) {
          this.data2 = data2;
          console.log(data2 + " asd" + this.data2)
        }
      }); */
 
  }
  //muestra un anuncio de la espera de la descarga
  eventoDescarga(){
    Swal.fire(
      'Ojo!',
      'Su descarga se esta ejecutando, espere por favor.',
      'info'
    );
  }

  lista: number[]=[];
  boletasConn: HttpConnBol | null;
  selection = new SelectionModel<Invoice>(true, []);
  //solo descarga las boletas qe han sido checked en la mat table
  /* descargarSeleccionados() {
    this.selection.selected.forEach(data2 => { 
      console.log(data2.id)
      this.lista.push(data2.id)
    }); 
    this.boletasConn  = new HttpConnBol(this.httpClient); 
    this.eventoDescarga();
    this.boletasConn
      .getInvDownload("", this.lista)
      .subscribe(    (res) => {this.downLoadFile(res, "application/x-zip-compressed")          
                               this.lista=[]  }, 
      (err) => console.log(err))

  } */
  //descarga las boletas (todo ) de la mattable
  /* descargarTodos() {
    this.lista=[]  
    this.boletasConn  = new HttpConnBol(this.httpClient); 
    this.eventoDescarga();
    this.boletasConn
      .getInvDownload(this.selectedUser.cip, this.lista)
      .subscribe(    (res) =>{this.downLoadFile(res, "application/x-zip-compressed" )        
      this.lista=[]  },
      (err) => console.log(err)) 
  } */
 
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data2.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.data2.forEach(row => this.selection.select(row));
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob); 
    var anchor = document.createElement("a");
    anchor.download = "invoice.zip";
    anchor.href = url;
    anchor.click(); 
  }

 
} 

export class HttpConn {
  constructor(private httpClient: HttpClient) { }

  /* getEmpl(name: String, page: number, size: number, order: String): Observable<PageEmployee> {
    const href = 'http://192.168.43.42:8081/invoiceservice/v1/invoice/';
    const requestUrl =
      href + "try3?name=" + name + "&page=0&size=0&order=0";
    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers, observe: 'response' };

    console.log("entro")
    return this.httpClient.get<PageEmployee>(requestUrl, { headers: headers });
  } */

  //geInvo();
}

export class HttpConnBol {
  constructor(private httpClient: HttpClient) { }

  /* getInvo(cip: string, date1: string, date2: string, page: number, size: number, order: String): Observable<PageInvoice> {
    const href = 'http://192.168.43.42:8081/invoiceservice/v1/invoice/';
    const requestUrl =
      href + "findinvoice?&page=" + page + "&size=" + size + "&order=" + order + "&cip=" + cip;
    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers, observe: 'response' };

    console.log("entro 2")
    return this.httpClient.get<PageInvoice>(requestUrl, { headers: headers });
  } */

  /* getInvDownload(cip:String, id:number[]): Observable<any> {
    const href = 'http://192.168.43.42:8081/invoiceservice/v1/invoice/';
    const requestUrl =
      href + "download?cip="+cip+"&id="+id;
    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers, observe: 'response' };

    console.log("entro 3 ")
    return this.httpClient.get(requestUrl,{
      responseType: 'arraybuffer',headers:headers} );
  } */



}

export class HttpConnBolSe {
  constructor(private httpClient: HttpClient) { }

  /* getInvoSe(cip: string, date1: String, date2: String, page: number, size: number, order: String): Observable<PageInvoice> {
    const href = 'http://192.168.43.42:8081/invoiceservice/v1/invoice/';
    const requestUrl =
      href + "findinvoice?&page=" + page + "&size=" + size + "&order=" + order + "&cip=" + cip  +"&date1=" + date1+"&date2=" + date2;
    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers, observe: 'response' };

    console.log("entro 3 ")
    return this.httpClient.get<PageInvoice>(requestUrl, { headers: headers });
  } */
}  