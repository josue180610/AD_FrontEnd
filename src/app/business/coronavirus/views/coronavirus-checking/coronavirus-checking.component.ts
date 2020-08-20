import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CheckingData } from '../models/coronavirus_assist_management';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { API_GET_CORONAVIRUS_ASSIST, API_SAVE_MASSIVE_DATA, API_POST_CORONAVIRUS_ASSIT_DATE, API_DELETE_REMOVE_ASSIST} from '../../../../../app/services/url.constants';
import { ModalCoronavirusReportComponent } from '../modal-coronavirus-report/modal-coronavirus-report.component';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';
import { AuthService } from '../../../../../app/services/auth-config-service';

@Component({
  selector: 'tdp-coronavirus-checking',
  templateUrl: './coronavirus-checking.component.html',
  styleUrls: ['./coronavirus-checking.component.scss']
})
export class CoronavirusCheckingComponent implements OnInit {
//roles
array_id_role:Array<any>=[]; 
array_permissions:Array<any>=[];
validateAccess:any;

validateMenu:any;
//variable date input
txt_start_date:any="";
txt_end_date:any="";
candidateForm: any;
@ViewChild("btnfileinput") btnfileinput:ElementRef;
tokenServ: any;
userLogged = null;
//variables para archivos tipo File
src:any;
type:any;
filename:any;
/* @BlockUI() blockUI: NgBlockUI; */
//mat table angular material headers
displayedColumns: string[] = ['CIP', 'EMPLEADO', 'FECHA DE ASISTENCIA','HORA DE ASISTENCIA'
 ,'FORMATO DE ASISTENCIA','COMENTARIO','ACCIONES'];
dataSource: MatTableDataSource<CheckingData>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
//array data assist
array_assist_mgn:Array<CheckingData>=[]
createForm() {
  this.candidateForm = new FormGroup({
    date1: new FormControl(),
    date2: new FormControl()
 });
}
constructor(private ref: ChangeDetectorRef, 
  private http:HttpClient,
  public dialog: MatDialog,
  private loaderSubjectService: LoaderSubjectService,
  private token:AuthService) { 
  //init variable date
  this.txt_start_date="";
  this.txt_end_date="";
  this.createForm();
  this.token.getValidateMenuByUser("Asistencia");
}
show_report_covid19() {
  const dialogRef = this.dialog.open(ModalCoronavirusReportComponent, {
    width: '600px',
    height: '300px',
    /*recive el dato como un diccionario de datos {key:value}*/
    data:{report_assist:true}
  });
}
onFileChange(event) {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.src = JSON.stringify(reader.result);
      this.type = file["type"]
      this.filename=file["name"]
      this.upload_file(this.src,this.filename,"##",1);
      this.ref.detectChanges();
    };
  } catch (error) {
    console.log(error)
  }
}

//src - > blob
// file_name -> type file
// identifiesr -> any
upload_file(src,file_name,identifiers,point){
  try {
    let Json={
      "file_name":file_name,
      "src":src,
      "identifiers":identifiers,
      "created_by":this.userLogged["id"],
      "updated_by":this.userLogged["id"]
    }
    if(point==1){
      /* this.blockUI.start("Saving data..") */
    }
    let save_massive=this.http.post(API_SAVE_MASSIVE_DATA,Json,{ }).subscribe(file=>{
      if(file["condition"]==true){
        Swal.fire ({
          icon:'success',
          text:"Los datos fueron registrados con exito." 
        })
        
        this.voidshowDataAssistManagement(0);
        this.btnfileinput.nativeElement.value=null;
        /* this.blockUI.stop() */
      }else{
        /* this.blockUI.stop() */
        Swal.fire ({
          icon:'error',
          text:file["message"] 
        })
      }
      this.btnfileinput.nativeElement.value=null;
      this.ref.detectChanges();
      save_massive.unsubscribe();
    })
    
  } catch (error) {
    console.log(error);
  }
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

showData(date1:any,date2:any){
  let condition:any;
  if(date1=="" || date2==""){
    condition=1;
    this.voidshowDataAssistManagement(0);
  }else{
    condition=0;
    this.showDataAssistByDate(date1,date2);
  }
  
}

showDataAssistByDate(date1,date2){
  /* this.blockUI.start("Loading data...") */
  let json={
    "start_date":date1==""?"":new Date(date1),
    "end_date":date2==""?"":new Date(date2),
    "param":this.array_id_role
  }
  this.http.post<CheckingData[]>(API_POST_CORONAVIRUS_ASSIT_DATE,json,{}).subscribe(data=>{   
    this.array_assist_mgn=data;
    this.ref.detectChanges();
    if(this.array_assist_mgn.length==0){
      Swal.fire ({
        icon:'info',
        text: "No existen registros en el rango de fecha seleccionado."
      })
    }
    this.dataSource=new MatTableDataSource(this.array_assist_mgn);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.txt_end_date="";
    this.txt_start_date="";
    /* this.blockUI.stop(); */
  })
}

removeDataAssistManagement(id){
  let param="?id_check="+id;
  this.http.delete(API_DELETE_REMOVE_ASSIST+param).toPromise().then(data=>{
    if(data["condition"]!=false){
      this.voidshowDataAssistManagement(0);
    }else{
      Swal.fire ({
        icon:'error',
        text:data["message"]
      })
      
    }
  });
}

voidshowDataAssistManagement(point){
  if(point==0){
    /* this.blockUI.start("Loading data...") */
  }
  if(point==2){
    /* this.blockUI.start("Movistar...") */
  }
  let param = {"param":this.array_id_role};
  this.http.post<CheckingData[]>(API_GET_CORONAVIRUS_ASSIST,param,{}).subscribe(data=>{
    if (data["condition"]==true){
    this.array_assist_mgn=data;
    this.ref.detectChanges();
    this.dataSource=new MatTableDataSource(this.array_assist_mgn);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /* this.blockUI.stop(); */
    }else{
      /* this.blockUI.stop(); */
      Swal.fire ({
        icon:'error',
        text:data["message"]
      })
      
    }
    
  })
  }
  ngOnInit() {
    setTimeout(() => {
      this.loaderSubjectService.showLoader("Cargando componentes..");
      this.loaderSubjectService.closeLoader();
    }, 300);
    /* this.userLogged = this.tokenServ.getDatoFromToken()["user"];
    this.array_permissions=this.tokenServ.getDatoFromToken()["permissions"];
      this.array_permissions.forEach(element => {
        if(element["level"]==3){
          this.array_id_role.push(element["roles"]["0"]["id"]);          
        }
      }); */
    //validation token
    /* var gc: GeneralComponent = new GeneralComponent(this.store);
    this.validateAccess=gc.validateSession("CORONA_CHECKING"); */
  }

}
