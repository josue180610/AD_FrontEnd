import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  IShowMngTdp } from '../../terceros.models';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'tdp-modal-show-gestor-tdp',
  templateUrl: './modal-show-gestor-tdp.component.html',
  styleUrls: ['./modal-show-gestor-tdp.component.scss']
})
export class ModalShowGestorTdpComponent implements OnInit {
  serviceName="";
  displayedColumns=["DOC","CIP","NAME","ACTION"]
  dataSource=null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  array_gestorTdp:Array<IShowMngTdp>=[]
  body:any;
  constructor(@Inject(MAT_DIALOG_DATA) private data:any,
  private dialogRef:MatDialogRef<ModalShowGestorTdpComponent>,
  private ref:ChangeDetectorRef) { }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  OnClose(){
    this.body={
      "condition":0
    }
    this.dialogRef.close(this.body);
  }

  ngOnInit() {
    if(this.data!=null){
      this.array_gestorTdp=this.data.gestorTdp;
    }
  }
  showGestorDataTdp(){
    this.dataSource=new MatTableDataSource(this.array_gestorTdp);
    
    this.dataSource.paginator=this.paginator;
    this.ref.detectChanges();
   
  }
  ngAfterViewInit(): void {
    this.showGestorDataTdp();
  }
  disabledRoleTdpMng(obj:any){
    this.body={
      "condition":1,
      "employee":obj
    }
    this.dialogRef.close(this.body);
  }
}
