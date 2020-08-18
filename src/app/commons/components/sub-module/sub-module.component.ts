import { Component, OnInit,  Output, EventEmitter, HostListener, HostBinding, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModuleConfigService } from 'src/app/services/module-config.service';
import { HttpClient } from '@angular/common/http';
 
import { HijoscomunicacionService } from '../../../services/hijoscomunicacion.service';

export interface Menu {
	title: String;
	path: String;
}

@Component({
  selector: 'tdp-sub-module',
  templateUrl: './sub-module.component.html',
  styleUrls: ['./sub-module.component.scss']
})

export class SubModuleComponent implements OnInit {

  currentMenu:Array<Menu>;
  selectedMenu:String; 

  oculto =false; 
  
  constructor(private router: Router , private service: HijoscomunicacionService ,private httpClient: HttpClient, private http: HttpClient, private moduleConfig:ModuleConfigService) {
    router.events.subscribe((event) => (event instanceof NavigationEnd) && this.handleRouteChange());
 
    this.service.evento.subscribe((evento: Event)=>{
      if(evento){
        this.selected();
      }
    }) 

  }
 
  //CUANDO TENGA UN CLICK CAMBIARA EL BOOLEANO PARA MOSTRAR O OCULTAR EL SUBMENU
  selected(){
    this.oculto = !this.oculto;
  }

  //PARA EL CAMBIO DE LAS VISTAS
  handleRouteChange(){
    const currentModule = this.router.url.split('/')[1];
    this.currentMenu = this.moduleConfig.getViews(currentModule)? this.moduleConfig.getViews(currentModule).views : [];
    this.selectedMenu = "/" + currentModule + "/" + this.router.url.split('/')[2]; 
  }

  ngOnInit() {
  }

}
