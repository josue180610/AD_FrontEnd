import { Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModuleConfigService } from 'src/app/services/module-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HijoscomunicacionService } from '../../../services/hijoscomunicacion.service';
import { URL_PROCESS_EXCEL } from '../../../../app/services/url.constants';
import { LoaderSubjectService } from '../../../../app/commons/components/loader/loader-subject.service';

export interface Menu {
	title: String;
	path: String;
}

@Component({
  selector: 'tdp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentMenu:Array<Menu>;
  selectedMenu:String;
 
  constructor(private router: Router ,private service: HijoscomunicacionService 
    ,private httpClient: HttpClient, private http: HttpClient, private moduleConfig:ModuleConfigService,
    private loaderSubjectService: LoaderSubjectService) {
    router.events.subscribe((event) => (event instanceof NavigationEnd) && this.handleRouteChange())    
   }

  handleRouteChange(){
    const currentModule = this.router.url.split('/')[1];
    this.currentMenu = this.moduleConfig.getViews(currentModule)? this.moduleConfig.getViews(currentModule).views : [];
    this.selectedMenu = "/" + currentModule + "/" + this.router.url.split('/')[2]; 
  }
  
  //metodos de activacion del menuy submenu que llamara del servicio
  menuToggle(event: Event) {
    this.service.menu(event);
  }

  subToggle(event: Event){
    this.service.sub(event);
  }
 
  private SERVER_URL = 'http://192.168.1.9:8080/invoiceservice/v1/invoice/';
   
  //destruye el local storage
  logout() {
    this.loaderSubjectService.showLoader("Saliendo del sistema..");
    localStorage.removeItem('modules');
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    localStorage.clear();
    setTimeout(() => {
      this.loaderSubjectService.closeLoader(); 
      this.router.navigateByUrl('/login');
    }, 2000);
  };

  email;
  name;
  nuevoEmail;
  datas;
  // del email del localstorage traera por get el nombre del empleado que entro
  /* obtenerEmail(){
    this.email = localStorage.getItem("user");     
    this.nuevoEmail= this.email.replace(/['"]+/g, ''); 
    let headers = new HttpHeaders({
      "UNICA-ServiceId": "550e8400-e29b-41d4-a716-446655440000",
      "UNICA-Application": "WEB_MOVISTAR_CONTIGO",
      "UNICA-User": "admin",
      "UNICA-PID": "550e8400-e29b-41d4-a716-446655440000"
    });
    let options = { headers: headers };
 
    this.http.get( `${URL_PROCESS_EXCEL}try3?page=0&name=${this.nuevoEmail}` ,options).subscribe(data => {
      console.log(`${URL_PROCESS_EXCEL}try3?page=0&name=${this.nuevoEmail}` );
      console.log(data[0].content);
      this.datas=data[0].content;
      localStorage.setItem("cip", this.datas[0].cip);
      console.log(this.datas[0].id);
      this.name=this.datas[0].name; 
    });  
  } */
  // al iniciar 
  ngOnInit() {
    /* this.obtenerEmail();  */
  }

}
