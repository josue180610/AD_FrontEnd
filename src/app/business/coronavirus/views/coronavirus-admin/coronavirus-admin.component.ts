import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoronavirusDrow } from '../models/coronavirus_generic';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { API_SAVE_MASSIVE_DATA_REQUEST, API_GET_CORONAVIRUS_PRECONDITION_EDIT, API_CORONA_SEARCHEMPLOYEES, API_POST_CORONAVIRUS_CBO, API_GET_FIND_BY_STATUS, API_CORONA_REQUESTDETAIL } from '../../../../../app/services/url.constants';
import { ModalCoronavirusReportComponent } from '../modal-coronavirus-report/modal-coronavirus-report.component';
import Swal from 'sweetalert2';
import { CoronavirusFormComponent } from '../coronavirus-form/coronavirus-form.component';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';
import { AdmiData } from '../models/coronavirus_admi_data';
import { CoronaCondition } from '../models/corona_condition';
import { RequestCondition } from '../models/corona_request_condition';
import { IOfficeAccess, ICoronaEmployee } from '../models/corona.models';
import { CoronavirusEdit } from '../models/coronavirus_edit';
import { AuthService } from '../../../../../app/services/auth-config-service';
@Component({
  selector: 'tdp-coronavirus-admin',
  templateUrl: './coronavirus-admin.component.html',
  styleUrls: ['./coronavirus-admin.component.scss']
})
export class CoronavirusAdminComponent implements OnInit {
  src : any;
  type :any;
  filename:any;
  array_permissions:Array<any>=[];
  @ViewChild("myInput") btnfileinputAdm: ElementRef;
  validateMenu: any;
  //mat table angular material headers
  displayedColumns: string[] = ['CIP', 'EMPLEADO', 'DNI', 'SITUACION'
    , 'FECHA EFECTIVA DE SITUACION', 'CONDICIONES', 'TIPO', 'FECHA EFECTIVA DE TIPO DE PERMANENCIA',
    'ESTADO', 'PAIS','COMENTARIO','ACCIONES'];
  dataSource: MatTableDataSource<AdmiData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /* @BlockUI() blockUI: NgBlockUI; */
  /* variables checkbox*/
  checked = false;
  txt_chk_0: any = false;
  txt_chk_1: any = false;
  txt_chk_2: any = false;
  txt_chk_3: any = false;
  txt_chk_4: any = false;
  txt_chk_5: any = false;
  txt_chk_6: any = false;
  txt_chk_7: any = false;
  txt_chk_8: any = false;
  txt_chk_9: any = false;
  txt_chk_generic: any;
  array_cronica: Array<CoronaCondition> = []
  array_request_condition:Array<RequestCondition>=[]
  condition_cronica = false;
  condition_precondition = false;
  //paginacion
  items = [];

  // VARS
  searchResults: Array<AdmiData> = [];
  array_condition: Array<AdmiData> = [];
  loading: boolean = false;
  showDetail: boolean = false;
  personDetails: ICoronaEmployee;
  array_access:Array<IOfficeAccess>=[{id:1,name:"Permitido"},{id:0,name:"Restringido"}]
  byemployeeinp: String = "";
  array_corona_status: Array<CoronavirusDrow> = []
  array_corona_type: Array<CoronavirusDrow> = []
  array_corona_reason: Array<CoronavirusDrow> = []

  //variables para filtrado
  txt_status: any;
  txt_type: any;
  txt_reason: any;
  txt_access:any;
  //*********************
  tokenServ=null;
 //roles
 array_id_role:Array<any>=[];
  userLogged = null;
  object_precondition: CoronavirusEdit;
  constructor( public dialog: MatDialog, private http: HttpClient, private ref: ChangeDetectorRef,
  private loaderSubjectService: LoaderSubjectService, private token:AuthService) {
    /* this.tokenServ = new TokenService();  */ 
    this.token.getValidateMenuByUser("Administración");
   }
   onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.searchResults = pageOfItems;
  }
  show_report_covid19() {
    const dialogRef = this.dialog.open(ModalCoronavirusReportComponent, {
      width: '600px',
      height: '300px',
      /*recive el dato como un diccionario de datos {key:value}*/

    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showPrecondition(id_emp) {
    let param = "?id_employee=" + id_emp;
    this.http.get<CoronavirusEdit>(API_GET_CORONAVIRUS_PRECONDITION_EDIT + param).subscribe(data => {
      this.object_precondition = data;
      this.txt_chk_0 = this.object_precondition.precondition_1 == 1 ? this.txt_chk_0 = true : this.txt_chk_0 = false;
      this.txt_chk_1 = this.object_precondition.precondition_2 == 1 ? this.txt_chk_1 = true : this.txt_chk_1 = false;
      this.txt_chk_2 = this.object_precondition.precondition_3 == 1 ? this.txt_chk_2 = true : this.txt_chk_2 = false;
      this.txt_chk_3 = this.object_precondition.precondition_4 == 1 ? this.txt_chk_3 = true : this.txt_chk_3 = false;
      this.txt_chk_4 = this.object_precondition.precondition_5 == 1 ? this.txt_chk_4 = true : this.txt_chk_4 = false;
      this.txt_chk_5 = this.object_precondition.precondition_5 == 1 ? this.txt_chk_5 = true : this.txt_chk_5 = false;
      this.txt_chk_6 = this.object_precondition.precondition_7 == 1 ? this.txt_chk_6 = true : this.txt_chk_6 = false;
      this.txt_chk_7 = this.object_precondition.precondition_8 == 1 ? this.txt_chk_7 = true : this.txt_chk_7 = false;
      this.txt_chk_8 = this.object_precondition.precondition_9 == 1 ? this.txt_chk_8 = true : this.txt_chk_8 = false;
      this.txt_chk_9 = this.object_precondition.precondition_10 == 1 ? this.txt_chk_9 = true : this.txt_chk_9 = false;

    })
  }
  /*busqueda de empleados*/
  searchByEmployee() {
    this.showDetail = false;
    const request = { filter: this.byemployeeinp, role_x:this.array_id_role }
    this.loading = true;
    /* this.blockUI.start("Loading...."); */
    this.http.post<AdmiData[]>(API_CORONA_SEARCHEMPLOYEES, request).toPromise().then(resp => {
      try {
        this.searchResults = resp["results"]
      this.array_cronica = resp["results"]["0"]["array_cronico"]
      this.ref.detectChanges();
      this.array_request_condition=resp["results"]["0"]["request_condition"]
      this.ref.detectChanges();
      } catch (error) {
        
      }
      /* if (this.array_cronica.length != 0) {
       
        this.condition_cronica = true;
      } else {
      
        this.condition_cronica = false;
      } */

      if (resp['code']) {
        this.dataSource = new MatTableDataSource(this.searchResults);
        this.ref.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        /* this.blockUI.stop(); */

      } else {
        Swal.fire ({
          icon:'error',
          text:"Error, no se pudo cargar lo data. Comunicarse con el area correspondiente."
        })
        
        /* this.blockUI.stop(); */
      }
      this.loading = false;
      /* this.blockUI.stop(); */
    })
  }
  load_data_cbo_table_master(){
    /* this.blockUI.start("Movistar..."); */
    let Json={
      "id_emp":0
    }
    this.http.post(API_POST_CORONAVIRUS_CBO,Json,{}).toPromise().then(data=>{
      if(data["status"]!=false){
        this.array_corona_reason=data["array_r"]
      this.array_corona_status=data["array"]
      this.array_corona_type=data["array_t"]
      /* this.blockUI.stop(); */
      }
      else{
        Swal.fire ({
          icon:'error',
          text:data["message"]
        })
      }
      
     
    })
  }
  findByStatusDetName(id_status_det: any) {
    let param = {"status":id_status_det,
                  "param":this.array_id_role};
    /* this.blockUI.start("Loading...."); */
    this.http.post<AdmiData[]>(API_GET_FIND_BY_STATUS,param,{}).toPromise().then(data => {
      try {
        this.searchResults = data;
        this.array_cronica = data.length == 0 ? [] : data["0"]["array_cronico"];
        /* if (this.array_cronica.length != 0) {
          this.condition_cronica = true;
        } else {
          this.condition_cronica = false;
        } */
        this.dataSource = new MatTableDataSource(this.searchResults);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.ref.detectChanges();
        /* this.blockUI.stop(); */
      } catch (error) {
        /* this.blockUI.stop(); */
        Swal.fire ({
          icon:'error',
          text:error
        })
        
      }
    })
  }
  clear() {
    this.showDetail = false;
    this.searchResults = []
    this.personDetails = null;
    this.byemployeeinp = "";
    this.ref.detectChanges();
    this.txt_status = "";
    this.txt_type = "";
    this.txt_reason = "";
    this.txt_access="";
  }
  showDetails(emp: ICoronaEmployee) {
    this.showDetail = true;
    this.personDetails = emp;
    if (emp.id_request) {
      /* this.blockUI.start("Loading..") */
      this.http.get(API_CORONA_REQUESTDETAIL + "/" + emp.id_request).toPromise().then(resp => {
        try {
          if (resp['code']) {

            this.personDetails.details = resp['details'];
            let array_size=0;
            this.searchResults.forEach(element => {
             
              if (emp.id == element.id) {
                this.array_condition.push(element);
                
                if (this.array_condition.length > 0) {
                  this.condition_precondition = true;
                  array_size=this.array_condition.length-1;
                  this.txt_chk_0 = this.array_condition[array_size].precondition_1 == 1 ? true : false;
                  this.txt_chk_1 = this.array_condition[array_size].precondition_2 == 1 ? true : false;
                  this.txt_chk_2 = this.array_condition[array_size].precondition_3 == 1 ? true : false;
                  this.txt_chk_3 = this.array_condition[array_size].precondition_4 == 1 ? true : false;
                  this.txt_chk_4 = this.array_condition[array_size].precondition_5 == 1 ? true : false;
                  this.txt_chk_5 = this.array_condition[array_size].precondition_6 == 1 ? true : false;
                  this.txt_chk_6 = this.array_condition[array_size].precondition_7 == 1 ? true : false;
                  this.txt_chk_7 = this.array_condition[array_size].precondition_8 == 1 ? true : false;
                  this.txt_chk_8 = this.array_condition[array_size].precondition_9 == 1 ? true : false;
                  this.txt_chk_9 = this.array_condition[array_size].precondition_10 == 1 ? true : false;
                  this.ref.detectChanges();
                } else {
                  this.condition_precondition = false;
                  this.ref.detectChanges();
                }
                /* this.blockUI.stop(); */
              } 
            });

          } else {
            /* this.blockUI.stop(); */
            this.personDetails.details = [];
          }
        } catch (error) {
          /* this.blockUI.stop(); */
          console.log(error);
        }

        this.ref.detectChanges();
      })
    } else {
      this.personDetails.details = [];
    }

  }

  showDataEdit(id_employee: any) {
    const dialogRef = this.dialog.open(CoronavirusFormComponent, {
      width: '1100px',
      height: '90vh',
      /*recive el dato como un diccionario de datos {key:value}*/
      data: {
        id: id_employee,
        condition: true,
        rol: "CORONA_ADMIN",
        flag:1,
        levelAccess:3
      }

    });
    dialogRef.afterClosed().subscribe(_result => {
      this.searchByEmployee();
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
  reset_input(){
    this.btnfileinputAdm.nativeElement.value="";
  }
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
      let save_massive=this.http.post(API_SAVE_MASSIVE_DATA_REQUEST,Json,{ }).subscribe(file=>{
        if(file["condition"]==true){
          Swal.fire ({
            icon:'success',
            text:"Los datos fueron registrados con exito."
          })         
          /* this.blockUI.stop() */
        }else{
          /* this.blockUI.stop() */
          Swal.fire ({
            icon:'success',
            text:file["message"]
          }) 
          
        }
        this.reset_input();
        this.ref.detectChanges();
        
      })
      
    } catch (error) {
      console.log(error);
    }
  }
  initData(){
    
    try {
      this.array_permissions=this.tokenServ.getDatoFromToken()["permissions"];
      this.array_permissions.forEach(element => {
        if(element["level"]==3){
          this.array_id_role.push(element["roles"]["0"]["id"]);          
        }
      });
      this.userLogged = this.tokenServ.getDatoFromToken()["user"];
      this.load_data_cbo_table_master();
    } catch (error) {
      console.log(error)
    }

  }
  ngOnInit() {
    setTimeout(() => {
      /* this.loaderSubjectService.showLoader("Cargando componentes..");
      this.initData(); */
      /* this.loaderSubjectService.closeLoader(); */
    }, 300);
    
    
    //validation token
    /* var gc: GeneralComponent = new GeneralComponent(this.store); */
    /* this.validateMenu = gc.validateSession("CORONA_ADMIN"); */
   
  }

}
