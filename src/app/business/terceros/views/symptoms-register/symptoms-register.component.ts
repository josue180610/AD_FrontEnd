import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { API_TER__SYMPTOMS_REPORT__, API_TER_STARTERDATA } from '../../../../../app/services/url.constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';

@Component({
  selector: 'tdp-symptoms-register',
  templateUrl: './symptoms-register.component.html',
  styleUrls: ['./symptoms-register.component.scss']
})
export class SymptomsRegisterComponent implements OnInit {
  ready = false;
  sintomas = [];
  formenable = true;
  myName:string='';
  viewStatus:any;
  formMessage:any;


  constructor(
    private loaderSubjectService: LoaderSubjectService,
    public http:HttpClient,    
    public router:Router,
    public ref:ChangeDetectorRef) { }

  ngOnInit() {
/*     const user = this.token.getDatoFromToken().user;
    this.myName = user.name; 
    this.http.get(API_TER_STARTERDATA +  user.id).toPromise().then(resp => {
      this.viewStatus = resp['dailyReview'].status;
      if (this.viewStatus!=0){
        if (resp['dailyReview'].supplierCoronaStatus != 2){
          this.sintomas = resp['symptoms'].map(p => { return {...p, touched:false, option:false } });
          this.formenable = resp['dailyReview'].status == 2 && resp['dailyReview'].supplierCoronaStatus == 1;         
          this.formMessage = "¡Tu salud es lo primero!"
        }else{
          this.viewStatus = 0;
          this.formMessage = "Su acceso se encuentra inhabilitado temporalmente debido a que reportó posibles síntomas de COVID-19. Por favor comuníquese con el gestor de su empresa para seguir los protocolos de salud correspondientes."
        }
      }else{
        this.formMessage = "Esta cuenta no tiene asociado a un proveedor."
      }
      this.ready = true;
      this.ref.detectChanges();
    }); */
  }
  generatePass(){
    /* this.router.navigate(['/terceros/form']); */
  }
  changeSymptomOption(id:number,value:boolean){
    /* const idx = this.sintomas.findIndex(p => p.id == id);
    this.sintomas[idx].touched = true;
    this.sintomas[idx].option = value; */
  }

  /* @BlockUI() blockUI: NgBlockUI; */
  reportSypmtoms(){
    /* const id_user = this.token.getDatoFromToken().user.id;
    let request = {
      id_user,
      symptoms: this.sintomas.map(p => {return {id:p.id,option:p.option}})
    }
    console.log(request)
    this.loaderSubjectService.showLoader("Ingresando..");
    this.http.post(API_TER__SYMPTOMS_REPORT__,request).toPromise().then(resp => {
      this.loaderSubjectService.closeLoader();
      if (resp["status"] == 1){
        this.viewStatus = 0;
        this.formMessage = "Su acceso se encuentra inhabilitado temporalmente debido a que reportó posibles síntomas de COVID-19. Por favor comuníquese con el gestor de su empresa para seguir los protocolos de salud correspondientes."
        this.ref.detectChanges();
      }
    }) */
  }
}
