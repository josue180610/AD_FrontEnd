import { Component, OnInit, HostListener, HostBinding, Input, ChangeDetectorRef } from '@angular/core';
import { TDPLocalStorageService } from '@tdp/ng-commons';
import { Router, NavigationEnd } from '@angular/router'; 
import { ModuleConfigService } from '../../../services/module-config.service'; 

import { HijoscomunicacionService } from '../../../services/hijoscomunicacion.service';

@Component({
  selector: 'tdp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  
  @HostBinding('class.active') isMenuOpen: boolean = false;
  activePath: string;
  moduleList: Array<Object>;

  hidden = false;
  //CUANDO TENGA UN CLICK CAMBIARA EL BOOLEANO PARA MOSTRAR O OCULTAR EL mENU
  toggle(){
    this.hidden = !this.hidden;
  }

  constructor( 
    private localStorage: TDPLocalStorageService,
    private router: Router,
    private moduleConfig: ModuleConfigService,
    private service: HijoscomunicacionService,
    private ref:ChangeDetectorRef
  ) { 
    
    
    router.events.subscribe( (event)  => ( event instanceof NavigationEnd) && this.handleRouteChange());
    this.service.event.subscribe((event: Event)=>{
      if(event){
        this.toggle();
      }
    }) 
  }
  ngOnInit(): void {
    this.moduleList = this.moduleConfig.getModules();
    this.ref.detectChanges();
  }

  handleRouteChange(){
    this.activePath = this.router.url.split('/')[1];
  }

  @HostListener('click', ['$event']) click(e) {
    e.stopPropagation();
  }

  @HostListener("document:click") resetToggle() {
    this.isMenuOpen = false;
  } 

}
