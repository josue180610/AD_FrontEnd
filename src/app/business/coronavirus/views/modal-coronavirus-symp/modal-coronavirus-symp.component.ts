import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tdp-modal-coronavirus-symp',
  templateUrl: './modal-coronavirus-symp.component.html',
  styleUrls: ['./modal-coronavirus-symp.component.scss']
})
export class ModalCoronavirusSympComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private dialogRef:MatDialogRef<ModalCoronavirusSympComponent>
  ) { }

  ngOnInit() {
  }

}
