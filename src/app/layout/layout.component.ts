import { Component, OnInit } from '@angular/core';
import { TDPLocalStorageService } from '@tdp/ng-commons';
import { Router } from '@angular/router'; 

import { HijoscomunicacionService } from '../services/hijoscomunicacion.service';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [HijoscomunicacionService]
})
export class LayoutComponent implements OnInit {

    flag: boolean = true;
    event: Event;  
    event2: Event;  
    onChange(event: Event) {
      this.event = event;
      console.log("entro a onchange"+ this.event);
    }
    
    onChange2(event2: Event){
      this.event2 = event2; 
      console.log("entro a onchange"+ this.event2);
    }

    ngOnInit(){
      console.log("INICIÓ EL LAYOUT");  
    }

    constructor(
      private localStorage: TDPLocalStorageService,
      private router: Router
    ) {
      
    }

    logout() {
      this.localStorage.clear();
      this.router.navigateByUrl('/login');
    }
}
