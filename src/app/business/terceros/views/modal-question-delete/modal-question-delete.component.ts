import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Idelete, Icode } from '../../terceros.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'tdp-modal-question-delete',
  templateUrl: './modal-question-delete.component.html',
  styleUrls: ['./modal-question-delete.component.scss']
})
export class ModalQuestionDeleteComponent implements OnInit {
  supplier_name="";
  service_name="";
  gestor_name="";
  id_service=[];
  suppliersCompanyService:Array<any>=[]
  roleForm: any;
  message_condition="";
  _formBuilder: any;
  typeAction="";
  condition_service=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef:MatDialogRef<ModalQuestionDeleteComponent>,
    private ref:ChangeDetectorRef
  ) { }
  
  selectAll() {
    this.id_service=[]
    this.suppliersCompanyService.forEach(element => {
        this.id_service.push(element.id);
    });
    
    }

  onNoClick(){
    let obj:Idelete
    obj={
      idService:0,
      actionType:"S",
      cond:false,
      flagActive:0
    }
    this.dialogRef.close(obj);
  }
  deleteSupplier(type){
    
    if (this.id_service.length>0){
      let obj:Idelete
    obj={
      idService:this.id_service,
      actionType:type,
      cond:true,
      flagActive:1
    }
    this.dialogRef.close(obj);
      
    }else{
      Swal.fire ({
        icon:'error',
        text:"Error, no se ha seleccionado el servicio para deshabilitar."
      })
    }
    
  }
  //click supplier service
  array_serviceValue:Array<Icode>=[]
  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    try {
      if (event.isUserInput) {
        if (event.source.selected === true) {
          //save
          let obj:Icode
          obj={
            id:event.source.value
          }
          this.array_serviceValue.push(obj)          
        } else {
          let index=this.array_serviceValue.indexOf(this.array_serviceValue.find(o=>o.id==event.source.value));
          this.array_serviceValue.splice(index,1);
        }
      }
    } catch (error) {
    }
  }
  ngOnInit() {
    this.roleForm =new FormGroup({
      privilegeMultiselect: new FormControl()
      })
    if(this.data!=null){
      this.suppliersCompanyService=this.data.serviceOption==null?[]:this.data.serviceOption;
      this.supplier_name=this.data.suppName;
      this.gestor_name=this.data.gestorName;
      this.typeAction=this.data.typeAct;
      this.message_condition="El colaborador tercero "+ this.supplier_name + " no tiene servicios asignado por el gestor "+ this.gestor_name +"."
 
    }
    if(this.typeAction=='D' && this.data.idService!=0){
      this.id_service.push(Number(this.data.idService));

      this.condition_service=true;
      this.ref.detectChanges();
    }
  }

}
