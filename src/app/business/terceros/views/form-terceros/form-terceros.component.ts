import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { API_TER_GEN_ACCESS, API_TER_STARTERDATA, API_TER_SEDES } from '../../../../../app/services/url.constants';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ISintomas,ITransport } from '../../terceros.models';
import { ModalSignComponent } from '../modal-sign/modal-sign.component';
import { ModalQrComponent } from '../modal-qr/modal-qr.component';

@Component({
  selector: 'tdp-form-terceros',
  templateUrl: './form-terceros.component.html',
  styleUrls: ['./form-terceros.component.scss']
})
export class FormTercerosComponent implements OnInit {
  myName:string='';
  ready:boolean=false;
  viewStatus:number=0;
  noFormMessage:string='';
  supplierEnable:boolean = true;
  finalResult:{
    flag_contact:boolean,
    flag_symptoms:boolean,
    symptoms:{id:number,option:boolean}[],
    sing:any,
    id_sede:number,
    piso:string,
    id_transport:number,
    id_user:number
  } = {
    flag_contact:false,
    flag_symptoms: false,
    symptoms:[],
    sing:null,
    id_sede:0,
    id_transport:0,
    piso:'',
    id_user:0
  }

  constructor(
    public dialog:MatDialog,
    public http:HttpClient,
    public ref:ChangeDetectorRef,
    public token:any,
    public router:Router) {

  }

  ngOnInit() {
    const user = this.token.getDatoFromToken().user;
    this.myName = user.name; 
    this.finalResult.id_user = user.id ;
    this.http.get(API_TER_STARTERDATA +  user.id).toPromise().then(resp => {
      this.viewStatus = resp['dailyReview'].status;
      if (this.viewStatus!=0){
        if (resp['dailyReview'].supplierCoronaStatus != 2){
          if (this.viewStatus == 1){
            // SUPPLIER NO A LLENADO EL FORMULARIOS Y ESTÁ HABILITADO PARA HACERLO
            this.sintomas = resp['symptoms'].map(p => { return {...p, touched:false, option:false } });
            this.cities = resp['cities'];
            this.transports = resp['transports'];
            if(resp['dailyReview'].data){
              const precarga = resp['dailyReview'].data;
              //Sede
              this.city_option = precarga.id_city;
              this.sedes = precarga.sedes;
              this.sedes_active = true;
              this.sede_option = precarga.id_sede;
              //PISO
              this.piso = precarga.floor;
              //Transport
              this.transport_type = precarga.id_transport_type;
              this.changeTransportType(precarga.id_transport_type);
              this.transport_option = precarga.id_transport;
              this.transports_detail_active = true;
            }  
          } else if (this.viewStatus == 2){
            // SUPPLIER YA LLENADO EL FORMULARIOS
            this.noFormMessage = "Ya llenó el formulario"
          }
        }else{
          this.viewStatus = 0;
          this.noFormMessage = "Su acceso se encuentra inhabilitado temporalmente debido a que reportó posibles síntomas de COVID-19. Por favor comuníquese con el gestor de su empresa para seguir los protocolos de salud correspondientes."
        }
      }else{
        this.noFormMessage = "Esta cuenta no tiene asociado a un proveedor."
      }
      this.ready = true;
      this.ref.detectChanges();
    })
  }

  seeAccess(){
    this.router.navigate(['/terceros/mypass']);
  }

  activetab:number = 0;
  tab2disabled:boolean = true;
  // BLOQUE 1
  coronaContactFlag:boolean=false;
  sintomas:ISintomas[] = [ ];  
  checkboxdj:boolean = false;

  changeToggle(e){
    this.coronaContactFlag = e.checked;
    // Reglas
    this.checkboxdj = false;
    this.tab2disabled = true;
  }
  changeSymptomOption(id:number,value:boolean){
    const idx = this.sintomas.findIndex(p => p.id == id);
    this.sintomas[idx].touched = true;
    this.sintomas[idx].option = value;
    // Reglas
    this.checkboxdj = false;
    this.tab2disabled = true;
  }
  changeCheckbox(e){    
    this.tab2disabled = true;
    if (e.checked === true){
      const dialog = this.dialog.open(ModalSignComponent,{
        width: '700px',
        minHeight: '400px'
      });

      dialog.afterClosed().subscribe( () =>  {
        const singned = dialog.componentInstance.flagSign;
        if (singned){ 
          this.finalResult.sing = dialog.componentInstance.base64data;
        }
        else {
          this.finalResult.sing = null;
          this.checkboxdj = false;
        }
        this.ref.detectChanges();
        
      });
    }
  }
  nextStep(){
    this.finalResult.symptoms = [];
    this.finalResult.flag_contact = this.coronaContactFlag;

    let flag_symptoms = false;
   
    this.sintomas.forEach(s => {
      if (!s.touched){
        s.touched = true;
      }
      flag_symptoms = flag_symptoms || s.option;      
      //FINAL RESULT
      this.finalResult.symptoms.push({id:s.id,option:s.option});
    });
    this.finalResult.flag_symptoms = flag_symptoms;

    if (flag_symptoms == false && this.coronaContactFlag == false) {
      // PUEDE CONTINUAR EL PROCESO
      this.activetab = 1;
      this.tab2disabled = false;

      
    }else{
      // DEBE TRABAJAR DESDE CASA      

      const dialog = this.dialog.open(ModalQrComponent,{
        width: '700px',
        minHeight: '400px'
      });

      dialog.afterClosed().subscribe( () => {
        let homeoficeAcepted =  dialog.componentInstance.acepted;
        if (homeoficeAcepted){
          /* this.blockUI.start("Procesando...") */
          this.http.post(API_TER_GEN_ACCESS, this.finalResult).toPromise().then(resp => {
            /* this.blockUI.stop(); */
            if (resp['status'] == 1){
              this.router.navigate(['/terceros/mypass']);
            }else{
              Swal.fire({
                icon:"error",
                title:"Se produjo un error"
              })
            }
          });
        }
      })
    }
     
  }


  // BLOQUE 2
  cities:[]=[];
  sedes:[]=[];
  city_option:string = "";
  sedes_active:boolean = false;
  sede_option:number = 0;
  transport_option:number = 0;
  piso:string = '';
  transports:ITransport[]=[];  
  transports_detail:ITransport[]=[];
  transports_detail_active:boolean=false;
  transport_type:number=0;
  
  changeCity(e){
    this.sedes_active = false;    
    this.http.get(API_TER_SEDES + e.target.value).toPromise().then(resp => {
      this.sedes = resp['sedes'];
      this.sedes_active = true;    
      this.sede_option = 0;
      this.ref.detectChanges();  
    })
  }
  changeTransportType(value){
    this.transport_type = value;
    this.transports_detail_active = true;
    this.transport_option = 0;
    this.transports_detail = this.transports.filter(p => p.type == value)
  }  
  generateAccess(){
    this.finalResult.id_sede = +this.sede_option;    
    this.finalResult.piso = this.piso;
    this.finalResult.id_transport = +this.transport_option;

    if (this.finalResult.id_sede == 0){
      Swal.fire({
        icon:'warning',
        title:"Por favor indique a que sede asistirá hoy."
      })
      return;
    }else if (this.finalResult.piso == ""){
      Swal.fire({
        icon:'warning',
        title:"Por favor indique el o los pisos en los que se encontrará."
      });
      return;
    }else if (this.finalResult.id_transport == 0){
      Swal.fire({
        icon:'warning',
        title:"Por favor indique el medio de transporte que usará para asistir a la oficina."
      });
      return;
    }
    /* this.blockUI.start("Procesando...") */
    
    this.http.post(API_TER_GEN_ACCESS, this.finalResult).toPromise().then(resp => {
      /* this.blockUI.stop(); */
      if (resp['status'] == 1){
        this.router.navigate(['/terceros/mypass']);
      }else{
        Swal.fire({
          icon:"error",
          title:"Se produjo un error."
        })
      }
    })
    
  }

}
