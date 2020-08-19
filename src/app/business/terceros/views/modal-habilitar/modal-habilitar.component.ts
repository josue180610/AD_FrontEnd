import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { API_TER_SUPPLIER_UPDATESTATUS } from '../../../../../app/services/url.constants';
import { Tercero } from '../../terceros.models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';

@Component({
  selector: 'tdp-modal-habilitar',
  templateUrl: './modal-habilitar.component.html',
  styleUrls: ['./modal-habilitar.component.scss']
})
export class ModalHabilitarComponent implements OnInit {

  document;
  /* @BlockUI() blockUI: NgBlockUI; */
  filename = "No se seleccionó archivo."
  supplier:Tercero;
  checkbox:boolean=false;
  fileloaded:boolean=false;
  @ViewChild('atachfileInput') inputAttachFile;

  
  constructor(
    private loaderSubjectService: LoaderSubjectService,
    @Inject(MAT_DIALOG_DATA) public dat: Tercero,
    public http:HttpClient,
    public dialogRef:MatDialogRef<ModalHabilitarComponent>,
    public token:any
  ) { 
    this.supplier = dat;
  }

  ngOnInit() {
  }
  sendRequest(){
    let request = {id:this.supplier.id, document: this.document, user_id: this.token.getDatoFromToken().user.id} 
    /* this.blockUI.start("Procesando...") */
    this.loaderSubjectService.showLoader("Procesando..");
    this.http.post(API_TER_SUPPLIER_UPDATESTATUS, request).toPromise().then(resp => {
      /* this.blockUI.stop(); */
      this.loaderSubjectService.closeLoader();
      if (resp['status'] == 1){
        Swal.fire({
          icon:"success",
          title:"El usuario fue habilitado"
        });
      }else{
        Swal.fire({
          icon:"error",
          title:"Se produjo un error",
          text:"Vuelva a intentarlo más tarde."
        });
      }
      this.dialogRef.close();
    })
  }
  clickAttachFile=()=>{
    this.inputAttachFile.nativeElement.click();
  }
  attachFileChange=(e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.document = reader.result;
      this.filename = file['name']
      this.fileloaded = true;
    }
  }
  closeDialog(){
    this.dialogRef.close();
  }

}
