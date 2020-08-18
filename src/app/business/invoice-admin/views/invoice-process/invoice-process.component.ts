import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'; import { ModuleConfigService } from 'src/app/services/module-config.service';
import { Router, NavigationEnd } from '@angular/router';

import { HttpEventType, HttpErrorResponse, HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { merge, interval, Observable, of as observableOf, from, Subscription } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { InvoiceProcessService } from '../../service/invoice-process.service';
import { ResponseProcess, Employee } from 'src/app/commons/services_hero/Employee';
import { FormGroup, FormBuilder } from '@angular/forms';
import { URL_PROCESS_EXCEL } from 'src/app/services/url.constants';

@Component({
  selector: 'tdp-invoice-process',
  templateUrl: './invoice-process.component.html',
  styleUrls: ['./invoice-process.component.scss']
})
export class InvoiceProcessComponent implements OnInit {
  access: Array<Object> = [];
  public place = "Nombre del archivo";
  form: FormGroup;

  constructor(private uploadService: InvoiceProcessService, private router: Router,
    private accessControl: ModuleConfigService, public fb: FormBuilder, private httpClient: HttpClient,
    private http: HttpClient) {
    this.access = accessControl.getAccess(router.url).access;
    console.log(this.access)
    this.form = this.fb.group({
      name: [''],
      avatar: [null]
    })
  }

  bandera = false;
  espera = false;

  ngOnInit() {
    this.espera = false;
    this.obtenerEmail();
    /* this.getRespuestaSubidaExcel(); */
  }
  email: string = "";
  nuevoEmail;

  name;
  lastname1;
  lastname2;
  cip;
  departamento;
  categoria;
  nationaId;
  fecha_ing;
  location;
  dni;
  hiredate;
  datas;
  dia;
  mes;
  anio;
  date;
  
  //atravez del metodo get, jalaremos la data de la tabla empleados con el email,
  //asi podremos poner en pantalla los datos de la persona (dni,nombres, cip,etc)
  obtenerEmail() {
    this.email = localStorage.getItem("user");
    this.nuevoEmail = this.email.replace(/['"]+/g, '');
    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers };

    this.http.get(`${URL_PROCESS_EXCEL}try3?page=0&name=${this.nuevoEmail}`, options).subscribe(data => {
      console.log(`${URL_PROCESS_EXCEL}try3?page=0&name=${this.nuevoEmail}`);
      console.log(data[0].content);
      this.datas = data[0].content;
      console.log(this.datas[0].id);
      this.name = this.datas[0].name;
      this.lastname1 = this.datas[0].lastname1;
      this.lastname2 = this.datas[0].lastname2;
      this.location = this.datas[0].location;
      this.cip = this.datas[0].cip;
      this.categoria = this.datas[0].categoryLabel;
      this.departamento = this.datas[0].departmentName;
      this.fecha_ing = this.datas[0].hiredate;
      this.date = new Date(this.fecha_ing);
      this.dia = this.date.getDay();
      this.mes = this.date.getMonth() + 1;
      this.anio = this.date.getFullYear();
      this.nationaId = this.datas[0].nationaId;
    });
    this.espera = true;
  }
  //al iniciar hara una consulta de que estado se encuentra en el servidor los procesos, por eso se llama a super y sub
  ngAfterContentInit() {
    if (this.bandera) {
      this.super();
      this.subs();
    }
  }

  estatus = "";
  codEstatus = '';
  file: File = null;
  uploadedPercentage = 0;
  showMessage = false;
  showMessage2 = false;
  showMessage3 = false;
  showMessage4 = false;
  message: String = '';
  message2: String = '';
  message3: String = '';
  message4: String = '';

  isLoading = false;
  isLoading2 = false;
  isLoading3 = false;
  isLoading4 = false;

  private SERVER_URL = 'http://192.168.1.9:8080/invoiceservice/v1/invoice/';

  user;
  porcentaje = 0;
  flag: boolean;

  id;
  //para poder subir el excel, se usara un post con algo de booleanos para controlar los estados de los procesos 
  /* onUpload() {

    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers };

    const fd = new FormData();

    console.log(this.file.name);
    fd.append('files', this.file, this.file.name);
    this.bandera = true;
    console.log(this.file);
    //una vez que tenga el archivo empezara el loading 
    this.http.post(URL_PROCESS_EXCEL + "gen", fd, options).subscribe(
      response => {
        this.showMessage = false;
        this.showMessage2 = false;
        this.showMessage3 = false;
        this.showMessage4 = false;
        this.isLoading4 = true;
        this.isLoading3 = true;
        this.isLoading2 = true;
        this.isLoading = true; 
        console.log(response);
        this.message = "Finalizado con exito";
        console.log(this.message);
        this.super(); 
      },
      error => { console.log(error) }
    )

  }
 */
  data;

  mySub: Subscription;
  // consultas de los procesos get cada 5 segundos
  super() {
    this.mySub = interval(5000).subscribe((func => {
      /* this.getRespuestaSubidaExcel(); */
    }))
  }

  subs() {
    this.mySub = interval(5000).subscribe((func => {
      /* this.getRespuestaSubidaExcel(); */
    }))
  }

  //detiene el proceso de consulta get
  stop() {
    this.mySub.unsubscribe();
  }
//el get respuesta hace que cada vez que tenga un cambio de status cambie los booleanos de los spinners y muestre un texto 
  /* getRespuestaSubidaExcel() {
    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers };

    this.http.get(URL_PROCESS_EXCEL + "getstatus", options).toPromise().then(data => {
      console.log(data as ResponseProcess);
      this.id = (data as ResponseProcess).id
      this.codEstatus = (data as ResponseProcess).stepstatus

      if ((data as ResponseProcess).end == 1) {
        console.log("proceso finalizado");
        this.estatus = "Finzalizado"
        this.isLoading4 = false;
        this.isLoading3 = false;
        this.isLoading2 = false;
        this.isLoading = false;
        this.message4 = "Finalizado con exito";
        this.message3 = "Finalizado con exito";
        this.message2 = "Finalizado con exito";
        this.message = "Finalizado con exito";
        this.showMessage = true;
        this.showMessage2 = true;
        this.showMessage3 = true;
        this.showMessage4 = true;
        if (this.mySub) {
          this.mySub.unsubscribe();
        }

        this.bandera = false;
      } else if ((data as ResponseProcess).end == 0) {
        console.log("Procesando");
        this.message4 = "Finalizado con exito";
        this.message3 = "Finalizado con exito";
        this.message2 = "Finalizado con exito";
        this.message = "Finalizado con exito";
        this.showMessage = true;
        this.showMessage2 = true;
        this.showMessage3 = true;
        this.showMessage4 = true;
        this.estatus = "Procesando"
        this.bandera = true;
      }

      switch ((data as ResponseProcess).stepstatus) {
        case "1":
          this.id = (this.data as ResponseProcess).id;
          this.isLoading4 = true;
          this.isLoading3 = true;
          this.isLoading2 = true;
          this.isLoading = true;

          this.showMessage = false;
          this.showMessage2 = false;
          this.showMessage3 = false;
          this.showMessage4 = false;
          this.estatus = "En proceso..."


          console.log("proceso de subdia de excel - iniciado");
          this.message = "Finalizado con exito";

          break;
        case "2":
          this.isLoading4 = true;
          this.isLoading3 = true;
          this.isLoading2 = true;
          this.isLoading = false;

          this.showMessage = true;
          this.showMessage2 = false;
          this.showMessage3 = false;
          this.showMessage4 = false;
          console.log("proceso de subdia de excel - fin");
          this.estatus = "En proceso..."

          break;

        case "3":

          this.showMessage = true;
          this.showMessage2 = false;
          this.showMessage3 = false;
          this.showMessage4 = false;

          console.log("creacion de pdf -inicio");

          this.isLoading4 = true;
          this.isLoading3 = true;
          this.isLoading2 = true;
          this.isLoading = false;

          break;

        case "5":

          this.showMessage = true;
          this.showMessage2 = true;
          this.showMessage3 = false;
          this.showMessage4 = false;

          this.isLoading = false;
          this.isLoading2 = false;
          this.isLoading3 = true;
          this.isLoading4 = true;

          console.log("envio de pdf mail -inicio");


          break;

        case "7":
          this.showMessage = true;
          this.showMessage2 = true;
          this.showMessage3 = true;
          this.showMessage4 = false;
          console.log("envio al azure - inicio")
          this.isLoading4 = true;
          this.isLoading3 = false;
          this.isLoading2 = false;
          this.isLoading = false;
          break;

        case "9":
          this.estatus = "Finalizado"
          console.log("ENTRAMOS")

          this.showMessage = true;
          this.showMessage2 = true;
          this.showMessage3 = true;
          this.showMessage4 = true;

          this.isLoading4 = false;
          this.isLoading3 = false;
          this.isLoading2 = false;
          this.isLoading = false;
          break;
      }

    }
    );

  } */

}