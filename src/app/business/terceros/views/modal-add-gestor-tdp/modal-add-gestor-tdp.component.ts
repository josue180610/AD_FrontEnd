import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { employeeData } from '../../terceros.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { API_TER_MNG_TDP_POST } from 'src/app/services/url.constants';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'tdp-modal-add-gestor-tdp',
  templateUrl: './modal-add-gestor-tdp.component.html',
  styleUrls: ['./modal-add-gestor-tdp.component.scss']
})
export class ModalAddGestorTdpComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /* @BlockUI() blockUI: NgBlockUI; */
  byemployeeinp = "";
  serviceName=""
  //*********************
  tokenServ: any;
  array_permissions:Array<any>=[];
  //roles
  array_id_role:Array<any>=[];
  //mat table 
  displayedColumns: string[] = ['CIP','DOC','NAME','LASTNAME1','LASTNAME2','ACTION'];
  dataSource=null;
  //array employee
  lstEmployee:Array<employeeData>=[];
  constructor(@Inject(MAT_DIALOG_DATA)private data:any,
  private dialogRef:MatDialogRef<ModalAddGestorTdpComponent>,
  private dialog:MatDialog,
  private http:HttpClient,
  private ref:ChangeDetectorRef,
  private loaderSubjectService: LoaderSubjectService) {
    /* this.tokenServ = new TokenService();  */
   }

  ngOnInit() {
    /* this.array_permissions=this.tokenServ.getDatoFromToken()["permissions"];
      this.array_permissions.forEach(element => {
        if(element["level"]==3){
          this.array_id_role.push(element["roles"]["0"]["id"]);          
        }
      }); */
      if(this.data!=null){
        this.serviceName=this.data.serviceObj.service;
      }
  }
  onClose(){
    let json={
      "condition":0
    }
    this.dialogRef.close(json)
  }
  /*busqueda de empleados*/
  searchByEmployee() {
    /* this.blockUI.start("Loading data.."); */
    this.loaderSubjectService.showLoader("Cargando datos..");
    const request = { filter: this.byemployeeinp, role_x:this.array_id_role }
    this.http.post<employeeData[]>(API_TER_MNG_TDP_POST, request).toPromise().then(resp => {
      if (resp['status']==1) {
        this.lstEmployee=resp["employee"];
        
        this.dataSource=new MatTableDataSource(this.lstEmployee)
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        /* this.blockUI.stop(); */
        this.loaderSubjectService.closeLoader();
      } else {
        Swal.fire ({
          icon:'success',
          text:"Error, no se pudo cargar lo data. Comunicarse con el area correspondiente."
        })
        this.loaderSubjectService.closeLoader();
        /* this.blockUI.stop(); */
      }
     
    })
  }
  asignManagerTdp(emp:employeeData){
    let json={
      "condition":1,
      "employee":emp
    }
    this.dialogRef.close(json);
  }
}
