import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { API_TER_STARTERDATA } from '../../../../../app/services/url.constants';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tdp-mypass',
  templateUrl: './mypass.component.html',
  styleUrls: ['./mypass.component.scss']
})
export class MypassComponent implements OnInit {
  myName:string='';
  viewStatus:number;
  ready:boolean = false;
  elementType = 'url';
  value = '';
  banner= '';
  constructor(public router:Router, public http:HttpClient, public token:any, public ref:ChangeDetectorRef) { }

  generatePass(){
    this.router.navigate(['/terceros/form']);
  }

  ngOnInit() {
    const user = this.token.getDatoFromToken().user;
    this.myName = user.name; 
    const id_user = user.id;
    this.http.get(API_TER_STARTERDATA +  id_user).toPromise().then(resp => {
      const responseStatus = resp['dailyReview'].status;
      console.log(resp)
      if (responseStatus == 0){        
        // ES UN ERROR
        this.banner ="Se produjo un error.";
        this.viewStatus = 0;
      } else if ( resp['dailyReview'].supplierCoronaStatus != 2){
        if (responseStatus == 1){
          // AUN NO LLENA EL FORMULARIOS
          this.banner ='No tienes un pase activo en este momento.';
          this.viewStatus = 1;
        }else if (responseStatus == 2){
          // YA LLENÓ EL FORMULARIO
          const flagResult = resp['dailyReview'].result;
          if (flagResult){
            this.banner = '¡Tu pase está activo! Úsalo para ingresar a oficina.';
            this.viewStatus = 2;
            this.value = resp['dailyReview'].token;
          }
        }
      }else{
        this.viewStatus = 3;
        this.banner = "Su acceso se encuentra inhabilitado temporalmente debido a que reportó posibles síntomas de COVID-19. Por favor comuníquese con el gestor de su empresa para seguir los protocolos de salud correspondientes."
      }
      this.ready = true;
      this.ref.detectChanges();
    })
  }
}
