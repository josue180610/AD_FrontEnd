import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { API_DOWNLOAD_FILEAZURE_ZIP, API_GENERAL_REPORT, API_REQUEST_DETAILS_REPORT, API_ASSIST_REPORT, API_CRONICA_REPORT } from '../../../../../app/services/url.constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'tdp-modal-coronavirus-report',
  templateUrl: './modal-coronavirus-report.component.html',
  styleUrls: ['./modal-coronavirus-report.component.scss']
})
export class ModalCoronavirusReportComponent implements OnInit {
  array_permissions:Array<any>=[];
  array_id_role:Array<any>=[];
  txt_user_id:any=null;
   /**/
   tokenServ: any;
   userLogged = null;
  //________________
  menu_name:any="";
  rol_name:any;
  access_level:any=0;
  validateAccess:any;
  validateMenu:any;
  //________________
  /* @BlockUI() blockUI: NgBlockUI; */
  condition_report_assist=false;
  //variables
  index:any;
  constructor(
    private http:HttpClient,
    private ref:ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)private data:any,
    private dialogRef:MatDialogRef<ModalCoronavirusReportComponent>
  ) { 
    this.index=0;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

General_report(){
  const functionAsync = async ()=>{
    this.general_report_async().subscribe(rpt1=>{
      console.log("Tipo de respuesta " + rpt1.type)
      console.log("Evento download : " + HttpEventType.DownloadProgress)
      
      if(rpt1.type===HttpEventType.DownloadProgress){
        console.log("Total :" + rpt1.total)
        const percentDone = Math.round(100 * rpt1.loaded / rpt1.total);
        console.log(percentDone);
      }
      if (rpt1.type === HttpEventType.Response) {
      const data = rpt1.body;
      console.log(data);
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(data);
      link.target = "_blank";
      link.download = "REPORTE GENERAL CORONARIVURS.xlsx";
      link.click();
      /* this.blockUI.stop(); */
      }
    })
  }
  functionAsync();
}

general_report_async():Observable<any>{
  let param={
    "param":this.array_id_role,
    "userId":this.txt_user_id}
  /* this.blockUI.start("Generating report..") */
  return this.http.post(API_GENERAL_REPORT,param,{ reportProgress:true,observe:"events",responseType: 'blob'})
}
Request_details_report(){
  let param={
    "param":this.array_id_role,
    "userId":this.txt_user_id}
    /* this.blockUI.start("Generating report..") */
    this.http.post<Blob>(API_REQUEST_DETAILS_REPORT,param,{reportProgress:true,observe:"events",responseType: 'blob' as 'json'}).subscribe(rpt1=>{
      console.log("Tipo de respuesta " + rpt1.type)
    console.log("Evento download : " + HttpEventType.DownloadProgress)
    
    if(rpt1.type===HttpEventType.DownloadProgress){
      console.log("Total :" + rpt1.total)
      const percentDone = Math.round(100 * rpt1.loaded / rpt1.total);
      console.log(percentDone);
    }
    if (rpt1.type === HttpEventType.Response) {
      const data = rpt1.body;
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(data);
      link.target = "_blank";
      link.download = "REPORTE GENERAL HISTORICO CORONARIVURS.xlsx";
      link.click();
      /* this.blockUI.stop(); */
    }
      
      
      
    })
}
Assis_report(){
  let param={
    "param":this.array_id_role,
    "userId":this.txt_user_id}
  /* this.blockUI.start("Generating report..") */
  this.http.post<Blob>(API_ASSIST_REPORT,param,{responseType: 'blob' as 'json'}).subscribe(rpt1=>{
    const data = rpt1;
    console.log(data);
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(data);
    link.target = "_blank";
    link.download = "REPORTE DE ASISTENCIAS.xlsx";
    link.click();
    /* this.blockUI.stop(); */
    
  })
  
}
Cronica_report(){
  let param={
    "param":this.array_id_role,
    "userId":this.txt_user_id}
  /* this.blockUI.start("Generating report..") */
  this.http.post<Blob>(API_CRONICA_REPORT,param,{responseType: 'blob' as 'json'}).subscribe(rpt1=>{
    const data = rpt1;
    console.log(data);
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(data);
    link.target = "_blank";
    link.download = "REPORTE DE ENFERMEDADES CRONICAS POR EMPLEADOS.xlsx";
    link.click();
    /* this.blockUI.stop(); */
    
  })
  
}
File_report(){
  let param={
    "param":this.array_id_role}
  /* this.blockUI.start("Generating report..") */
  this.http.post<Blob>(API_DOWNLOAD_FILEAZURE_ZIP,param,{responseType: 'blob' as 'json'}).subscribe(rpt1=>{
    const data = rpt1;
    console.log(data);
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(data);
    link.target = "_blank";
    link.download = "REPORTE DE ARCHIVOS DE EMPLEADOS.zip";
    link.click();
    /* this.blockUI.stop(); */
    
  })
}
execute_report(){
  if(this.index!=0){
    switch (this.index) {
      case "1C":
          this.General_report();
        break;
        case "2C":
          this.File_report();
        break;
        case "3C":
          this.Cronica_report();
        break;
        case "4C":
          this.Request_details_report();
        break;
        case "1A":
          this.Assis_report();
        break;
    
      default:
        break;
    }
  }
}
  ngOnInit() {
    /* this.userLogged = this.tokenServ.getDatoFromToken()["user"]; */
    /* this.txt_user_id=this.userLogged["id"] */
    /* this.array_permissions=this.tokenServ.getDatoFromToken()["permissions"];
      this.array_permissions.forEach(element => {
        if(element["level"]==3){
          this.array_id_role.push(element["roles"]["0"]["id"])    
        }
      }); */
    console.log(this.data)
    console.log(this.data.report_assist)
    if(this.data!=null){
      console.log("Entro")
      this.condition_report_assist=this.data.report_assist;
      this.ref.detectChanges();
    }
  }

}
