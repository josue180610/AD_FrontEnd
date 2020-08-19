import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tdp-modal-qr',
  templateUrl: './modal-qr.component.html',
  styleUrls: ['./modal-qr.component.scss']
})
export class ModalQrComponent implements OnInit {
  myName:string='';
  acepted:boolean = false;
  constructor(public dialogRef:MatDialogRef<ModalQrComponent>, public token:any) { }

  ngOnInit() {
    /* const user = this.token.getDatoFromToken().user;
    this.myName = user.name;  */
  }
  closeDialog(){
    this.dialogRef.close();
  }
  acept(){
    this.acepted = true;
    this.dialogRef.close();
  }

}
