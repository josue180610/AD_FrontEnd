import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { API_TER_SUPPLIER, API_TER_GET_VERIFY_EXIST } from '../../../../../app/services/url.constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';

@Component({
  selector: 'tdp-modal-asignmanager',
  templateUrl: './modal-asignmanager.component.html',
  styleUrls: ['./modal-asignmanager.component.scss']
})
export class ModalAsignmanagerComponent implements OnInit {

  result:boolean = false;
  /* @BlockUI() blockUI: NgBlockUI; */
  company;
  supplier = {
    name:'',
    lastName1:'',
    lastName2:'',
    nationalId:'',
    codeCompany:'',
    idCompany:0,
    mail:'',
    birthdate:'',
    gender:'',
    activity:''
  }
  disabled_condition=false;
  form_condition=false;
  message_condition="";
  show_message_condition=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dat: any,
    private ref:ChangeDetectorRef,
    private token:any,
    private http:HttpClient,
    public dialogRef:MatDialogRef<ModalAsignmanagerComponent>,
    private datePide:DatePipe,
    private loaderSubjectService: LoaderSubjectService
  ) { 
    this.company = dat;
  }
  resetForm(){
    this.supplier.name="";
    this.supplier.lastName1="";
    this.supplier.lastName2="";
    this.supplier.birthdate="";
    this.supplier.mail="";
    this.supplier.codeCompany="";
    this.supplier.gender="";
    this.supplier.activity="";
    this.disabled_condition=false;
  }
  nextForm(){
    
    this.searchSupplierByDocument(this.supplier.nationalId,'U');
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
      let request="?nationalId="+nationalId+"&typeUser="+type+"&idService="+this.company.id;
    this.http.get(API_TER_GET_VERIFY_EXIST+request).subscribe(supp=>{
      if(supp["condition"]==true){
        this.supplier.name=supp["supp"]["name"];
        this.supplier.lastName1=supp["supp"]["lastName1"];
        this.supplier.lastName2=supp["supp"]["lastName2"];
        this.supplier.mail=supp["supp"]["mail"];
        this.supplier.birthdate=supp["supp"]["birthdate"]==null||supp["supp"]["birthdate"]=="0000-00-00 00:00:00"?
        "":this.datePide.transform(supp["supp"]["birthdate"],'yyyy-MM-dd');
        this.supplier.gender=supp["supp"]["gender"]
        this.supplier.activity=supp["supp"]["activity"]
        this.supplier.codeCompany=supp["supp"]["codeCompany"]
        this.disabled_condition=true;
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
  ngOnInit() {
  }
  addSupplier(){
    const suprev = this.supplier;
    let campo = '';
    let correcto = true;
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
    }
    if (!!correcto){
      this.supplier.idCompany = this.company.id;    
      const request = [{
        supplier: this.supplier,
        user_id: this.token.getDatoFromToken().user.id,
        type: 'mng',
        typeAction:"U"

      }]
      
      /* this.blockUI.start("Procesando...") */
      this.loaderSubjectService.showLoader("Procesando..");
      this.http.post(API_TER_SUPPLIER,request).toPromise().then(resp => {
        /* this.blockUI.stop(); */
        this.loaderSubjectService.closeLoader();
        if (resp['status'] == 1){
          Swal.fire({
            icon:'success',
            text:"Creación exitosa",
          })
          this.result = true;
        }else{
          Swal.fire({
            icon:'error',
            text:resp['error'],
          })
        }
        this.dialogRef.close();
      })
    }
    else{
      Swal.fire({
        icon:'warning',
        title:"El campo " + campo + " es obligatorio"
      })
    }
    
    
  }
  closeDialog(){
    this.dialogRef.close()
  }

}
