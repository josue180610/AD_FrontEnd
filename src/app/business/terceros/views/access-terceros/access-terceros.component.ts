import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';
import { Tercero, Employee } from '../../terceros.models';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { API_TER__ACCESS_VALIDATION__, API_TER_POST_AGREE_EMPLOYEE, API_TER__ACCESS_REGISTER__ } from '../../../../../app/services/url.constants';
import { ModalAccessResultComponent } from '../modal-access-result/modal-access-result.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tdp-access-terceros',
  templateUrl: './access-terceros.component.html',
  styleUrls: ['./access-terceros.component.scss']
})
export class AccessTercerosComponent implements OnInit {

  /* @BlockUI() blockUI: NgBlockUI; */
  // id role
  id_role:any=null;
  level_role:any=null;
  // Formulario
  searchText:string='';
  temperature:number=0;
  epps:boolean= false;
  eppTouched:boolean=false;
  comments:string='';
  movetype:string="";
  tokenValue:any="";
  exit=1;
  // LECTOR QR
  qrscan:boolean=false;
  @ViewChild('scanner')
  /*no olvidar descomentar esta linea scanner: ZXingScannerComponent; */
  selectedDevice: MediaDeviceInfo = null;
  scannerEnabled = false;
  hasCameras = false;
  availableDevices: MediaDeviceInfo[];
  hasPermission: boolean;
  
  // BÙSQUEDA
  searchMessage:String="Aún no realiza una busqueda...";
  searchResult:boolean= false;  // SI LA BÚSQUEDA PRODUJO RESULTADOS
  resultStatus:number=0;   // EL STATUS DE LA BÚSQUEDA (0: Sin resultados, 1: Aun no resuelve, 2: Sin acceso, 3: Con acceso)
  dailyId:number=0;
  userType:string='' // S: Tercero  | E: Empleado
  supplier:Tercero; 
  array_permissions:Array<any>=[];
  array_id_role:Array<any>=[];
  constructor(
    public http:HttpClient,
    public ref:ChangeDetectorRef,
    public token:any,
    public dialog:MatDialog,
    private loaderSubjectService: LoaderSubjectService) { }
  changeEpp(value){
    this.eppTouched = true;
    this.epps = value;
  }
  changeMovetype(value){
    this.movetype = value;
  }
  ngOnInit() {
    try{
      /* this.array_permissions=this.token.getDatoFromToken()["permissions"];
      this.array_permissions.forEach(element => {
        if(element["level"]==4){
          this.array_id_role.push(element["roles"]["0"]["id"])
        }
      }); */
      /*no olvidar descomentar esta linea  this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
        this.hasCameras = true;

        console.log('Devices: ', devices);
        this.availableDevices = devices;
      }); */

      /*no olvidar descomentar esta linea this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
        console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
      }); */

      /*no olvidar descomentar esta linea this.scanner.permissionResponse.subscribe((answer: boolean) => {
        this.hasPermission = answer;
      }); */
    } catch (error) {
      console.log(error)
    }
  }

  searchButton(){
    if (this.searchText.length >= 5){
      this.searchAccess(this.searchText,this.array_id_role);
    }else{
      Swal.fire({
        icon:'error',
        title:"Ingrese un documento válido"
      })
    }
  }
  readQR(){
    this.qrscan = true;
    this.scannerEnabled = true;
  }
  cancelQRread(){
    this.qrscan = false;
    this.searchResult= false;
    this.scannerEnabled = false;
  }
  /*
  observaciones
  resultstatus:
  3 significa que la persona esta apta para registrar su ingreso.
  2  sospechoso de contagio, pero no puede registrar asistencia.
  5 sospechoso de contagio, pero si puede registrar asistencia 
  6 usuario con sintomas, y no puede generar ningun registro ni ingreso. */
  searchAccess(token:string,role:any){
    console.log(token)
    this.searchClear();
    const request = {token,role}
    this.loaderSubjectService.showLoader("Buscando resultados..")
    this.http.post( API_TER__ACCESS_VALIDATION__,request ).toPromise().then(resp => {
        this.resultStatus=resp['status'];
        /*Si el personal tercero presenta sintomas en la primera vez que registra su pase.
        le muestra un mensaje, pero no permite registrar ingreso ni salida.*/
        if (resp['status']==4){
          this.searchClear();
          /* this.blockUI.stop(); */
          this.loaderSubjectService.closeLoader();
          Swal.fire({
            icon:"info",
            title:"Información de búsqueda",
            text:resp['message']
          })
          this.userType = resp['type']; 
          this.supplier=resp["supplier"]
          this.searchResult= true;
          this.ref.detectChanges();
        }else{
          if (resp['status']==5){
            this.searchClear();
            this.loaderSubjectService.closeLoader();
            Swal.fire({
              icon:"info",
              title:"Información de búsqueda",
              text:resp['message']
            })
            this.userType = resp['type']; 
            this.supplier=resp["supplier"]
            this.searchResult= true;
            this.exit=resp["exit"]
            this.dailyId=resp["dr_id"]
            this.ref.detectChanges();
          }else{
            if (resp['status'] !=0){  
              this.exit=resp["exit"]
              this.loaderSubjectService.closeLoader();           
                // Estatus correcto, usuario identificado
                this.searchResult= true;
                this.userType = resp['type']; 
                if (resp['type'] == 'S'){
                  this.userType="S";
                    // ES UN PROVEEDOR
                    this.supplier= resp['supplier'];  
                    if (this.supplier.coronaStatus == 2){
                        // SI EL ESTADO DEL PROVEEDOR ES DESHABILITADO, NO SE ENCONTRARÁ EN LA BÚSQUEDA
                        this.resultStatus = 2
                        if(this.resultStatus==2){
                          Swal.fire({
                            icon:"info",
                            title:"Información de búsqueda",
                            text:resp['message']
                          })
                        }
                        this.dailyId = resp['dr_id'];
                    }else{
                        this.dailyId = resp['dr_id'];
                    }
                }else if (resp['type'] == 'E'){
                  this.userType="E";
                    // ES UN EMPLEADO
                    this.supplier=resp['employee'];
                    this.epps=true;
                    this.eppTouched=true;
                }        
            } else{
                this.loaderSubjectService.closeLoader();
                // Error con la lectura, mostrar mensaje de error
                this.searchMessage = resp['message'];
                
                this.searchResult= false;
            } 
          }
        }
               
          this.ref.detectChanges();
          if (resp["status_tdp"]=="1a"){
            Swal.fire({
              icon:"info",
              title:"Información de búsqueda",
              text:resp['message']
            })
            this.userType="E";
            this.supplier=resp['employee'];
            this.supplier.codeCompany="";
            this.searchResult=true;
            this.resultStatus=resp["resultStatus"]
            this.ref.detectChanges()

          }
          if (resp["status_tdp"]=="2a"){
            Swal.fire({
              icon:"info",
              title:"Información de búsqueda",
              text:resp['message']
            })
            // ES UN EMPLEADO
            this.userType="E";
            this.supplier=resp['employee'];
            this.epps=true;
            this.eppTouched=true;
            this.searchResult=true;
            this.resultStatus=resp["resultStatus"];
            this.exit=resp["exit"]
            this.ref.detectChanges()
          }
          
      })
  }
  searchClear(){
    this.searchMessage = "Aún no realiza una busqueda...";
    this.searchText = '';
    this.searchResult= false;
    this.ref.detectChanges();
    this.searchText='';
    this.temperature=0;
    this.epps= false;
    this.eppTouched=false;
    this.comments='';
    this.movetype="";
    
    this.dailyId=0;
    this.supplier = null;
  }

  saveEmployeeChecking(obj:any){
    /* this.blockUI.start("Saving data..."); */
    this.loaderSubjectService.showLoader("Guardando datos..")
    if ( this.temperature > 27 &&  this.temperature < 45){
      let json={
        "obj":obj
      }
      let title="";
      let condition=true;
      let title_temp="";
      let message_temp="";
      let icon_like=false;
      let result_flag=true;
      if(obj.typeMove=="inp"){
        title="¡Puede ingresar a oficina!"
        title_temp="¡No puede ingresar a oficina!";
        message_temp="El usuario no cumple con los requerimientos mínimos para el ingreso a oficinas, por lo que se le debe denegar el acceso.";
      }else{
        title="¡Salida registrada con exito!"
        title_temp="¡Su salida fue registrada y su acceso restringido!";
        if(this.resultStatus==5){
          result_flag=false;
          message_temp="Se ha detectado que es sospechoso de covid 19, el acceso del usuario será restringido de ahora en adelante."
        }else{
          if(this.temperature>=38){
            result_flag=true;
            message_temp="Se ha detactado el registro de temperatura alta, el acceso del usuario será restringido de ahora en adelante."
          }
        }
        condition=false;
        icon_like=true;
      }
      this.http.post(API_TER_POST_AGREE_EMPLOYEE,json,{}).subscribe(d=>{
        console.log()
        if(d["condition"]!=false){
          /* this.blockUI.stop() */
          this.loaderSubjectService.closeLoader();
          let result=true;
          if (this.temperature>=38 || this.resultStatus==5){
            result=false; 
          }else{
            if(this.temperature>0 && this.temperature<38){
              result=true;
            }
          }
          
          const dialog = this.dialog.open(ModalAccessResultComponent,{
            width: '600px',
            minHeight: '400px',
            data: {result:result, name:this.supplier.name , resultStatus_x:this.resultStatus,
              title_x:title,cond:condition,title_temp_x:title_temp, res_x:result_flag,
            temp_x:message_temp,like_x:icon_like,datetime:d["datetime"]}
          });
          dialog.afterClosed().subscribe(r => {
            this.searchClear();
          })
          
        }else{
         /*  this.blockUI.stop() */
         this.loaderSubjectService.closeLoader();
          Swal.fire({
            icon:"warning",
            title:"Error",
            text:d["message"]
          }).then(()=>{
            this.searchClear();
          })
        }
      })
    }else{
      /* this.blockUI.stop(); */
      this.loaderSubjectService.closeLoader();
      Swal.fire({
        icon:"warning",
        title:"Error",
        text:"Ingrese una temperatura entre 27 y 45"
      })
    }
    
  }
  saveData(){
    
    if(this.userType=="E"){
      let employee : Employee
        employee={idEmployee:this.supplier.id,temperature:this.temperature,
        comment:this.comments,typeMove:this.movetype,
        sede:this.supplier["sede"]==null?0:this.supplier["sede"],
        transport:this.supplier["transport"]==null?0:this.supplier["transport"],
      floor:this.supplier["floor"],token:this.tokenValue,
    user_id:this.token.getDatoFromToken().user.id, nationalId:this.supplier["nationalId"],
  timezone:this.supplier["timezone"]}
      this.saveEmployeeChecking(employee);
    }else{
      this.aproveMove();
    }
  }

  aproveMove(){
    /* this.blockUI.start("Saving data..."); */
    this.loaderSubjectService.showLoader("Guardando datos..");
    if ( this.temperature > 27 &&  this.temperature < 45){
      if (this.eppTouched != false){
        if (this.movetype != ""){
          let request = {
            id_daily:this.dailyId,
            temperature:this.temperature,
            epp:this.epps,
            comments:this.comments,
            movetype:this.movetype,
            user_id: this.token.getDatoFromToken().user.id
          }
          this.http.post(API_TER__ACCESS_REGISTER__, request).toPromise().then(resp => {
            let res_flag=false;
            
            if(resp['status']== 1){
              
              if (this.movetype == "inp"){
                this.loaderSubjectService.closeLoader();
                if(this.epps==false){
                  res_flag=false;      
                }
                if(this.temperature>=38){
                  res_flag=true;
                }
                let result = resp['result'];
                let title="¡Puede ingresar a oficina!"
                let title_temp="¡No puede ingresar a oficina!";
                let message_temp="El usuario no cumple con los requerimientos mínimos para el ingreso a oficinas, por lo que se le debe denegar el acceso.";
                let icon_like=false;
                let condition=true;
                const dialog = this.dialog.open(ModalAccessResultComponent,{
                  width: '600px',
                  minHeight: '400px',
                  data: {result:result, name:this.supplier.name,resultStatus_x:this.resultStatus,epps:this.epps,
                    title_x:title,cond:condition,title_temp_x:title_temp, res_x:res_flag,temp_x:message_temp,
                    like_x:icon_like,datetime:resp["datetime"]}
                });
                dialog.afterClosed().subscribe(r => {
                  this.searchClear();
                })
              }else{
                this.loaderSubjectService.closeLoader();
                let condition=false;
                let title="¡Salida registrada con exito!"
                let title_temp="";
                let message_temp=""
                let icon_like=true;
                let result=resp['result'];
                
                /* if (this.resultStatus==5){
                  result=false;
                } */
                if(this.resultStatus==5){
                  result=false;
                  title_temp="¡Su salida fue registrada y su acceso restringido!";
                  message_temp="Se ha detectado que es sospechoso de covid 19, el acceso del usuario será restringido de ahora en adelante."
                }
                else{
                  if(this.temperature>=38){
                    res_flag=true;
                    title_temp="¡Su salida fue registrada y su acceso restringido!";
                    message_temp="Se ha detactado el registro de temperatura alta, el acceso del usuario será restringido de ahora en adelante."
                  }else{  
                    if(this.epps==false){     
                      res_flag=false;
                      title_temp="Su salida fue registrada y presentó una observación"
                      message_temp="Se ha detactado el no uso de EPP al registrar su salida."
                    }
                  }
                }
                
                const dialog = this.dialog.open(ModalAccessResultComponent,{
                  width: '600px',
                  minHeight: '400px',
                  data: {result:result, name:this.supplier.name,resultStatus_x:this.resultStatus,epps:this.epps,
                    title_x:title,cond:condition,title_temp_x:title_temp, res_x:res_flag,temp_x:message_temp,
                    like_x:icon_like,datetime:resp["datetime"]}
                });
                dialog.afterClosed().subscribe(r => {
                  this.searchClear();
                })
              }           
            }else{
              this.loaderSubjectService.closeLoader();
            }
          });

        }else{
          this.loaderSubjectService.closeLoader();
          Swal.fire({
            icon:"warning",
            title:"Indique si la persona está ingresando o saliendo."
          })
        }
      }else{
        this.loaderSubjectService.closeLoader();
        Swal.fire({
          icon:"warning",
          title:"Identifique si la persona tiene EPP antes de continuar."
        })
      }
    }else{
      this.loaderSubjectService.closeLoader();
      Swal.fire({
        icon:"warning",
        title:"Ingrese una temperatura entre 27 y 45"
      })
    }
  
  }

  handleQrCodeResult() {
    /*no olvidar descomentar esta linea this.scanner.scanSuccess.subscribe(result => {
      this.tokenValue=result;
      this.cancelQRread();
      this.searchAccess(result,this.array_id_role);
    }) */
  }


}
