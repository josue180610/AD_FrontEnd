import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { API_TER_REPORT_MODULE } from '../../../../../app/services/url.constants';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { ICompany, ICompanyService, IReportData } from '../../terceros.models';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';

@Component({
  selector: 'tdp-report-panel-terceros',
  templateUrl: './report-panel-terceros.component.html',
  styleUrls: ['./report-panel-terceros.component.scss']
})
export class ReportPanelTercerosComponent implements OnInit {
  id_company=0;
  id_service=0;
  name_company="";
  name_service="";
  filter="";
  array_companyOptions:Array<ICompany>=[];
  array_companyServiceOptions:Array<ICompanyService>=[];
  find_companyServiceOptions:Array<ICompanyService>=[];
  /* @BlockUI() blockUI: NgBlockUI; */
  companyRuc:any="5558745896520025";
  displayedColumns=[
    "DNI","NAME","LASTNAME1","LASTNAME2","SERVICENAME",
    "DATEGENERATE","USERSTATUS","DOCMEDIC","QRSTATUS",
    "QRHOUR","PERSONSTATUS","REPORTHOUR","PERSONDOOR",
    "CHECKING","HOURIN","TEMPIN","HOUROUT","TEMPOUT",
    "COUNTOUT","COUNTIN"
  ]
  dataSource=null;
  array_reportGeneral:Array<IReportData>=[];
  array_idService:Array<any>=[]
  condition_all=0;
  user_id=null;
  start_date="";
  end_date="";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private ref:ChangeDetectorRef, private http:HttpClient,public token: any,
    private datePipe:DatePipe, private loaderSubjectService: LoaderSubjectService) {
    /* this.user_id=this.token.getDatoFromToken().user.id; */
   }
  loadDataOptions(userId:any){
    /* this.blockUI.start("Cargando datos.."); */
    this.loaderSubjectService.showLoader("cargando datos..");
    let param="?userId="+userId;
    this.http.get(API_TER_REPORT_MODULE+param).subscribe(d=>{
      if(d["condition"]==true){
        this.array_companyOptions=d["company"];
        this.array_companyServiceOptions=d["services"];
        this.condition_all=d["permission"]
        this.ref.detectChanges();
        if(this.condition_all==1){
          this.findByIdCompany(0);
        }
      }else{
        Swal.fire ({
          icon:'error',
          text:d['errors']
        })
      }
      /* this.blockUI.stop(); */
      this.loaderSubjectService.closeLoader();
    })
  }
  ngOnInit() {
    this.loadDataOptions(this.user_id);
  }
  clearContent(){
    this.id_company=0;
    this.id_service=0;
    this.start_date="";
    this.end_date="";
    this.find_companyServiceOptions=[];
    this.array_idService=[];
    this.findByIdCompany(0);
    this.filter="";
    this.ref.detectChanges();
  }
  findByIdCompany(idComp:any){
    
    if (Number(idComp)==0){
        this.array_idService=[]
        this.array_companyServiceOptions.forEach(element => {
          this.array_idService.push(element.id)
        });
    }else{
      this.find_companyServiceOptions=[];
      this.id_service=0;
      this.array_companyServiceOptions.forEach(element => {
        if(Number(element.id_company)==Number(idComp)){
          this.find_companyServiceOptions.push(element);
        }
      });
      
    }
    this.getNameCompany(idComp);
  }
  getNameCompany(idComp){
    if(Number(idComp)==0){
      this.name_company="Todas las empresas."
      this.name_service="Todos los servicios."
      this.ref.detectChanges();
     
    }else{
      this.array_companyOptions.forEach(element => {
        if(element.id==this.id_company){
          this.name_company=element.name;
          this.ref.detectChanges();
        }
    });
    }
  }
  getServiceCompany(){
    this.array_idService=[]
    this.array_idService.push(this.id_service);
    this.array_companyServiceOptions.forEach(element => {
        if(element.id==this.id_service){
          this.name_service=element.name;
          this.ref.detectChanges();
        }
    });
  }
  showPreviewOrDownload(typeAction:any){
    let condition=true;
    if (typeAction=="P"){
      if (this.user_id==0 || this.user_id == null){
        Swal.fire ({
          icon:'error',
          text:"Error, el id de usuario es incorrecto. Por favor, verificar existencia."
        }) 
        condition=false;
      }
      if (this.condition_all==0){
        if(this.id_company==0){
          Swal.fire ({
            icon:'error',
            text:"Error, necesita seleccionar una empresa."
          }) 
          condition=false;
        }else{
          if(this.id_service==0){
            Swal.fire ({
              icon:'error',
              text:"Error, necesita seleccionar un servicio."
            }) 
            condition=false;
          }
        }  
      }else{
        if(this.condition_all==1 && this.id_company>0){
          if(this.id_service==0){
            Swal.fire ({
              icon:'error',
              text:"Error, necesita seleccionar un servicio."
            }) 
            condition=false;
          }
        }
      }
      
      if(this.start_date=="" || this.end_date==""){
        Swal.fire ({
          icon:'error',
          text:"Error, necesita seleccionar un rango de fecha."
        }) 
        condition=false;
      }else{
        if(this.datePipe.transform(this.start_date,"yyyy-MM-dd")>this.datePipe.transform(this.end_date,"yyyy-MM-dd")){
          Swal.fire ({
            icon:'error',
            text:"Error, rango de fecha incorrecto."
          }) 
          condition=false;
        }
      }
      /* Swal.fire ({
        icon:'error',
        text:d['errors']
      }) */
      if(condition!=false){
        let json={
          "userId":this.user_id,
          "dateStart":this.datePipe.transform(this.start_date,"yyyy-MM-dd"),
          "dateEnd":this.datePipe.transform(this.end_date,"yyyy-MM-dd"),
          "idService":this.array_idService,
          "dataReport":"",
          "typeAction":typeAction
        }
        /* this.blockUI.start("Buscando datos.."); */
        this.loaderSubjectService.showLoader("Buscando datos..");
        this.http.post(API_TER_REPORT_MODULE,json,{}).subscribe(d=>{
          if(d["condition"]){
            this.array_reportGeneral=d["reportData"]
            this.dataSource=new MatTableDataSource(this.array_reportGeneral);
            this.dataSource.paginator=this.paginator;
            this.clearContent();
            
            this.ref.detectChanges();
          }else{
            Swal.fire ({
              icon:'info',
              text:d["errors"]
            }) 
          }
          /* this.blockUI.stop(); */
          this.loaderSubjectService.closeLoader();
        })
      }
    }
    if(typeAction=="R"){
      let json={
        "userId":this.user_id,
        "dateStart":"",
        "dateEnd":"",
        "idService":"",
        "dataReport":this.array_reportGeneral,
        "typeAction":typeAction
      }
      /* this.blockUI.start("Generando reporte de terceros. Por favor, espere") */
      this.loaderSubjectService.showLoader("Generando reporte de terceros. Por favor, espere");
      this.http.post(API_TER_REPORT_MODULE,json,{responseType: 'blob' as 'json'}).subscribe(d=>{
        const data = d;
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(data);
        link.target = "_blank";
        link.download = "REPORTE GENERAL TERCEROS.xlsx";
        link.click();
        this.loaderSubjectService.closeLoader();
      })
    }
    
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
