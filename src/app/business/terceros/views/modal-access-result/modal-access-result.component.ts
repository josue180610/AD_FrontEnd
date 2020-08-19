import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tdp-modal-access-result',
  templateUrl: './modal-access-result.component.html',
  styleUrls: ['./modal-access-result.component.scss']
})
export class ModalAccessResultComponent implements OnInit {
  resultExit=false;
  result:boolean=false;
  name:string='';
  hora;
  resultStatus:any=3;
  title="";
  title_denied="";
  result_flag=false;
  condition=false;
  message_temp=""
  like=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dat: any,
    public dialogRef:MatDialogRef<ModalAccessResultComponent>) { 
      this.result = dat.result;
      this.resultStatus=dat.resultStatus_x;
      this.name = dat.name;
      var today = new Date();
      this.title=dat.title_x;
      this.title_denied=dat.title_temp_x;
      this.hora =dat.datetime;
      this.result_flag=dat.res_x;
      this.message_temp=dat.temp_x;
      this.condition=dat.cond;
      this.like=dat.like_x;
    }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
