import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { API_TER_SUPPLIER, API_TER_GET_VERIFY_EXIST } from '../../../../../app/services/url.constants';
import { Tercero } from '../../terceros.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';

@Component({
  selector: 'tdp-modal-newtercero',
  templateUrl: './modal-newtercero.component.html',
  styleUrls: ['./modal-newtercero.component.scss']
})
export class ModalNewterceroComponent implements OnInit {
 // FORMULARIO
 supplier:Tercero = {
  id:0,
  name:'',
  lastName1:'',
  lastName2:'',
  nationalId:'',
  codeCompany:'',
  idCompany:0,
  mail:'',
  birthdate:'',
  gender:'',
  activity:'',
  coronaStatus:1,
  statusDetail:''
}
form_condition=false;
message_condition="";
show_message_condition=false;
create:boolean = true;
result:boolean = false;
company_id;
submitText="Crear usuario"
titleForm = "Registrar nuevo usuario";
suppliersCompanyService:Array<any>=[];
disabled_condition=false;
id_service=null;
action_form="";
edit=true;
condition_service=false;
constructor(
  
  private loaderSubjectService: LoaderSubjectService,
  @Inject(MAT_DIALOG_DATA) public dat: any,
  private token:any,
  private http:HttpClient,
  public dialogRef:MatDialogRef<ModalNewterceroComponent>,
  private ref:ChangeDetectorRef,
  private datePipe:DatePipe) { 
    this.company_id = this.dat.idCompany;
    if (this.dat.sup != null){
      let date = dat.sup.birthdate =="None"||dat.sup.birthdate ==null||dat.sup.birthdate =="0000-00-00 00:00:00"
      ?"":this.datePipe.transform(dat.sup.birthdate,'yyyy-MM-dd');
      this.supplier = {...dat.sup, birthdate: date}
      
      this.titleForm = "Editar usuario " + this.supplier.name
      this.create = false;
      
    }
  }

ngOnInit() {    
  this.suppliersCompanyService=this.dat.supplierOption;
  this.edit=this.dat.conditionEdit;
  this.action_form=this.dat.actionForm;
  if(this.action_form=="S"){
    if(this.dat.idService!=0){
      this.condition_service=true;
    }
  }
  if(this.action_form=="E"){
    this.submitText="Guardar cambios"
  }
  
}
resetForm(){
  this.supplier.name="";
  this.supplier.lastName1="";
  this.supplier.lastName2="";
  this.supplier.birthdate="";
  this.supplier.mail="";
  this.supplier.codeCompany="";
  this.supplier.gender="";
  this.disabled_condition=false;
}
nextForm(){
  this.searchSupplierByDocument(this.supplier.nationalId,'mng');
  if(this.action_form=="S"){
    if(this.dat.idService!=0){
      let index=this.suppliersCompanyService.indexOf(this.suppliersCompanyService.find(o=>o.id==this.dat.idService));
    this.id_service=this.suppliersCompanyService[index].id; 
    this.ref.detectChanges();
    }else{
      this.id_service=0;
    }
    
  }
}
previousForm(){
  this.resetForm()
  this.form_condition=false;
}
searchSupplierByDocument(nationalId,type){
  if(this.supplier.nationalId==null || this.supplier.nationalId==""){
    let value=Swal.fire({
      icon:'info',
      text:"Necesita ingresar un nro. de documento para verificar si existen datos asociados.",
    })
  }else{  
  let request="?nationalId="+nationalId+"&typeUser="+type+"&idService="+this.company_id;
  this.http.get(API_TER_GET_VERIFY_EXIST+request).subscribe(supp=>{
    if(supp["condition"]==true){
      this.supplier.name=supp["supp"]["name"];
      this.supplier.lastName1=supp["supp"]["lastName1"];
      this.supplier.lastName2=supp["supp"]["lastName2"];
      this.supplier.mail=supp["supp"]["mail"];
      this.supplier.birthdate=supp["supp"]["birthdate"]==null||supp["supp"]["birthdate"]=="0000-00-00 00:00:00"
      ?"":this.datePipe.transform(supp["supp"]["birthdate"],"yyyy-MM-dd");
      this.supplier.gender=supp["supp"]["gender"]
      this.supplier.activity=supp["supp"]["activity"]
      this.supplier.codeCompany=supp["supp"]["codeCompany"]
      if(this.action_form=="E"){
        this.disabled_condition=false;
      }else{
        if(this.action_form=="S"){
          this.disabled_condition=true;
        }
      }
      
      this.show_message_condition=false;
      this.form_condition=true;
      this.ref.detectChanges();
      
    }else{
      if(supp["message"]==""){
        this.form_condition=true;
        this.ref.detectChanges();
      }else{
        this.show_message_condition=true;
        this.message_condition=supp["message"]
        this.ref.detectChanges();
      }
      
    }
  })
  }
  
}
addSupplier(){
  this.supplier.idCompany =this.id_service;    
  const request = [{
    supplier: this.supplier,
    user_id: this.token.getDatoFromToken().user.id,
    type: 'sup',
    typeAction:"U"
  }]
  // REVISAR OBLIGATORIOS EN EL INDIVIDUAL
  const suprev = request[0].supplier;
  let correcto = true;
  let campo = '';
  if (suprev.nationalId == ""){
    campo = "DNI";
    correcto = false;
  } else if (suprev.name == ''){
    campo = "Nombre";
    correcto = false;
  }else if (suprev.lastName1 == ''){
    campo = "apellido";
    correcto = false;
  }else if (suprev.mail == ''){
    campo = "correo";
    correcto = false;
  }else if (this.id_service==0){
    campo = "Servicio";
    correcto = false;
  }
  // HACER PETICIÓN
  if (!!correcto){
    if (this.create){
      /* this.blockUI.start("Procesando...") */
      this.loaderSubjectService.showLoader("Procesando..");
      this.http.post(API_TER_SUPPLIER,request).toPromise().then(resp => { 
        /* this.blockUI.stop();   */ 
        this.loaderSubjectService.closeLoader();
        if (resp['status'] == 1){
          Swal.fire({
            icon:'success',
            text:resp["message"],
          })
          this.result = true;
        }else{
          Swal.fire({
            icon:'error',
            html:"<b>"+resp["errors"]+"</b>"
          })
        }
        this.dialogRef.close();
      })
    }else{
      /* this.blockUI.start("Procesando...") */
      this.loaderSubjectService.showLoader("Procesando..");
      this.http.put(API_TER_SUPPLIER,{supp:request,idService:this.id_service}).toPromise().then(resp => {    
        /* this.blockUI.stop();  */
        this.loaderSubjectService.closeLoader();
        if (resp['status'] == 1){
          Swal.fire({
            icon:'success',
            text:resp["message"],
          })
          this.result = true;
        }else{
          Swal.fire({
            icon:'error',
            title:resp["errors"]
          })
        }
        this.dialogRef.close();
      })
    }
  }else{
    Swal.fire({
      icon:'warning',
      title:"El campo " + campo + " es obligatorio"
    })
  }
}

closeModal(): void {
  this.dialogRef.close();
}

}
