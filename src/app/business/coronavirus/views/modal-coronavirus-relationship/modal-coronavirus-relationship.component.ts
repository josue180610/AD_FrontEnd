import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'tdp-modal-coronavirus-relationship',
  templateUrl: './modal-coronavirus-relationship.component.html',
  styleUrls: ['./modal-coronavirus-relationship.component.scss']
})
export class ModalCoronavirusRelationshipComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private dialogRef:MatDialogRef<ModalCoronavirusRelationshipComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) { }

  ngOnInit() {
  }

}
