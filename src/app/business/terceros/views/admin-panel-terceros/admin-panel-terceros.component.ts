import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ModalHabilitarComponent } from '../modal-habilitar/modal-habilitar.component';
import { ModalMasiveChargeComponent } from '../modal-masive-charge/modal-masive-charge.component';
import { Tercero, IChangeSupp, IServicesDisabled, ISuppServices } from '../../terceros.models';
import Swal from 'sweetalert2';
import { API_TER_POST_ADDNEW_GESTOR_SERVICE, API_TER_SUPPLIER_DELETE, API_TER_GET_COMPANYSERVICE_SUPP_GESTOR, API_TER_POST_SUPPLIERS_ADMIN, API_TER_SUPPLIERS } from '../../../../../app/services/url.constants';
import { ModalNewterceroComponent } from '../modal-newtercero/modal-newtercero.component';
import { ModalQuestionDeleteComponent } from '../modal-question-delete/modal-question-delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';

@Component({
  selector: 'tdp-admin-panel-terceros',
  templateUrl: './admin-panel-terceros.component.html',
  styleUrls: ['./admin-panel-terceros.component.scss']
})
export class AdminPanelTercerosComponent implements OnInit {

  displayedColumns=[]
  displayColumnsService=["SUPPLIERNAME","SERVICENAME","COMPANYNAME","CONDITION","ACTION"]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('MatPaginatorDisabled', {read:MatPaginator}) paginator2: MatPaginator;
  dataSource=null;
  dataSourceService=null;
  /* @BlockUI() blockUI: NgBlockUI; */
  today:string;
  loading:boolean=true;
  company;
  suppliers:Tercero[];
  suppliersBack:Tercero[];
  deshabilitados:Tercero[];
  suppliersCompanyService:Array<any>=[];
  suppliersGestorCompanyService:Array<ISuppServices>=[];
  suppliersServiceDisabled:Array<IServicesDisabled>=[];
  supplier_id=0;
  user_id=0;
  gestorName=""
  filtro:'';
  id_service:any=0;
  condition:any=null;
  companyName="";
  type="";
  condition_load=0;
  sizeSupplierCompanyService=0;
  Css_Success="";
  Css_Cancel="";
  Css_Wait="";
  constructor(
    public dialog:MatDialog,
    public http:HttpClient, 
    public token: any,
    public ref:ChangeDetectorRef,
    private loaderSubjectService: LoaderSubjectService
  ) { }
  


  ngOnInit() {
    console.log("Si entro aqui")
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    this.today = year + "-" + (month>9?month.toString():"0"+month) +"-" + (day>9?day.toString():"0"+day); 
    /* this.supplier_id = this.token.getDatoFromToken().user.id_supplier; */ 
    /* this.gestorName =   this.token.getDatoFromToken().user.name; */
    /* this.laodData(0); */
  }
  
  /* laodData(init:any){
    this.loaderSubjectService.showLoader("Cargando datos..");
    let condition=false;
    let param="?id_supp="+ this.supplier_id+"&id_serv="+this.id_service;
    this.http.get(API_TER_SUPPLIERS + param).toPromise().then(resp => {
      if (resp['status'] == 1){
        condition=true;
        this.company =resp['company'];
        this.companyName=this.company.companyName;
        this.suppliersCompanyService=resp["services"];
        this.sizeSupplierCompanyService=this.suppliersCompanyService.length;
        this.ref.detectChanges();
        
      }
      if (resp['status'] == 1){
        this.loadDataSuppliers(init);
      }
      if(resp["status"]==0){
        this.loaderSubjectService.closeLoader();
        Swal.fire ({
          icon:'success',
          text:resp['errors']
        })
        
      }
    })
  } */
  /* loadDataSuppliers(init:any){
    let auxIdServices=[]
    if(this.id_service==0){
      this.suppliersCompanyService.forEach(element => {
        auxIdServices.push(element.id);
      });
    }else{
      auxIdServices.push(this.id_service);
    }
    let param={"id_serv":auxIdServices,"id_user":this.user_id}
    this.http.post(API_TER_POST_SUPPLIERS_ADMIN,param,{}).subscribe(resp=>{
      if(resp["status"]==1){
      this.suppliers = [...resp['suppliers']];
      this.dataSource=new MatTableDataSource(this.suppliers);
      this.dataSource.paginator = this.paginator;
      this.suppliersBack = [...resp['suppliers']];
      this.deshabilitados = [...this.suppliersBack.filter(p => p.coronaStatus == 2)];
      this.suppliersServiceDisabled=[...resp["serviceDisabled"]];
      this.dataSourceService=new MatTableDataSource(this.suppliersServiceDisabled);
      this.dataSourceService.paginator=this.paginator2;
      this.loading = false;
      this.condition_load=1;
      if(init==0){
        if(this.condition_load==1){
          if(this.sizeSupplierCompanyService==1){
            this.id_service=this.suppliersCompanyService[0].id;
            this.ref.detectChanges();
          }
          if(this.sizeSupplierCompanyService>1){
            this.id_service=0;
            this.ref.detectChanges();
          }
        }
      }
      if(this.id_service==0){
        this.displayedColumns=["DOCUMENT","NAME","MAIL","CODECOMPANY","SEX","SERVICE","STATUS","CHECKING","ACTION"];
      }else{
        this.displayedColumns=["DOCUMENT","NAME","MAIL","CODECOMPANY","SEX","SERVICE","STATUS","CHECKING","ACTION","ADDGESTOR"]

      }
      this.Css_Success="{background-color: #5bc500;color: #ffffff;padding: 5px 8px;border-radius: 5px;}"
      this.Css_Cancel="{background-color: #e87171;color: #ffffff;padding: 5px 8px;border-radius: 5px;}"
      this.Css_Wait="{background-color: #00a9e0;;color: #ffffff;padding: 5px 8px;border-radius: 5px;}"
      this.loaderSubjectService.closeLoader();
      this.ref.detectChanges();
      
      }else{
        Swal.fire ({
          icon:'success',
          text:resp['errors']
        })
      }
      
    })
  } */
  ngAfterViewInit(): void {
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceService.filter = filterValue.trim().toLowerCase();
  }
  /* deleteSupplier(idSupp,typeAction){
    this.suppliersGestorCompanyService=[]
    let param="?id_supp="+idSupp+"&id_user="+this.user_id+"&type_action="+typeAction;
    this.http.get(API_TER_GET_COMPANYSERVICE_SUPP_GESTOR+param).subscribe(d=>{
      if(d["condition"]==true){
        this.suppliersGestorCompanyService=d["array"]
        this.ref.detectChanges();
        this.type="";
        this.condition=false;
    obtener servicios propios del usuario.
    let auxServiceOption:Array<any>=[]
    
    let supplierName="";
    if(typeAction=="D"){
      this.suppliers.forEach(element => {
        if(element.id==idSupp){
          supplierName=element.name
        }
      });
      this.suppliersCompanyService.forEach(element => {
        this.suppliersGestorCompanyService.forEach(element2 => {
          if(element.id==element2.id){
            auxServiceOption.push(element2)
          }
        });
      });
      
    const dialog = this.dialog.open(ModalQuestionDeleteComponent,{
      width: '600px',
      minHeight: '400px',
      data:{
        serviceOption:auxServiceOption,
        suppName:supplierName,
        gestorName:this.gestorName,
        typeAct:typeAction,
        idService:this.id_service
      }
    })
    dialog.afterClosed().subscribe(d=>{
      if(d!=null){
        if(d["flagActive"]==1){
          if(d["cond"]==true){
            this.implementDeleteSupplier(idSupp,d["cond"],d["idService"],d["actionType"]);
          }
        }
      }
    })
    }
    if(typeAction=="E"){
      this.suppliersServiceDisabled.forEach(element => {
        if(element.idSupplier==idSupp){
          supplierName=element.supplierName;
        }
      });
      auxServiceOption=this.suppliersGestorCompanyService;
      const dialog = this.dialog.open(ModalQuestionDeleteComponent,{
        width: '600px',
        minHeight: '400px',
        data:{
          serviceOption:auxServiceOption,
          suppName:supplierName,
          gestorName:this.gestorName,
          typeAct:typeAction
        }
      })
      dialog.afterClosed().subscribe(d=>{
        if(d!=null){
          if(d["flagActive"]==1){
            if(d["cond"]==true){
              this.implementDeleteSupplier(idSupp,d["cond"],d["idService"],d["actionType"]);
            }
          }
        }
      })
    }
    
      }
    })
  
  } */
  /* implementDeleteSupplier(idSupp,cond,idService,typeAction){
    if(cond==true){
      this.loaderSubjectService.showLoader("Procesando..");
        this.http.post(API_TER_SUPPLIER_DELETE,{id:idSupp,id_serv:idService,
          id_user:this.user_id,type_action:typeAction}).toPromise().then(resp => {
          if (resp['status'] == 1){
            BORRAR DEL ARREGLO BACK
            let idxb = this.suppliersBack.indexOf( this.suppliersBack.find(p => p.id == idSupp) );
            if (idxb != -1) this.suppliers.splice(idxb,1);
            BORRAR DEL ARREGLO
            let idx = this.suppliers.indexOf( this.suppliers.find(p => p.id == idSupp) );
            if (idx != -1) this.suppliers.splice(idx,1);
            this.ref.detectChanges();
            
            this.loaderSubjectService.closeLoader();
            if(typeAction=="D"){
              Swal.fire ({
                icon:'success',
                text:resp['message']
              })
            }else{
              Swal.fire ({
                icon:'success',
                text:resp['message']
              })
            }
            this.laodData(1);
          }else{
            this.loaderSubjectService.closeLoader();
            Swal.fire ({
              icon:'error',
              text:resp["errors"]
            })
          }
        })
    }
  } */
  /* editSupplier(suptoedit:Tercero){
    const dialog = this.dialog.open(ModalNewterceroComponent,{
      width: '600px',
      minHeight: '400px',
      data:{idCompany: this.company.id, sup: suptoedit,supplierOption:this.suppliersCompanyService,conditionEdit:true,actionForm:"E",idService:this.id_service}
    });
    dialog.afterClosed().subscribe( () =>  {
      const result = dialog.componentInstance.result;  
      const edited = dialog.componentInstance.supplier;
      if (result){      
        EDITAR DEL ARREGLO
        let idx = this.suppliers.indexOf( this.suppliers.find(p => p.id == suptoedit.id) );
        if (idx != -1) this.suppliers[idx] = edited;
        EDITAR DEL BACK
        let idxb = this.suppliersBack.indexOf( this.suppliersBack.find(p => p.id == suptoedit.id) );
        if (idxb != -1) this.suppliersBack[idxb] = edited;
        this.laodData(1);
        this.ref.detectChanges();
      }
    });
  } */
  /* newTercero(){
    const dialog = this.dialog.open(ModalNewterceroComponent,{
      width: '600px',
      minHeight: '400px',
      data: {idCompany: this.company.id, supplier: null, supplierOption:this.suppliersCompanyService,conditionEdit:false,actionForm:"S",idService:this.id_service}
    });
    dialog.afterClosed().subscribe( () =>  {
      const result = dialog.componentInstance.result;  
      const created = dialog.componentInstance.supplier;
      if (result){
         AGREGAR AL ARREGLO
         this.suppliers.push(created);
         AGREGAR AL BACK
         this.suppliersBack.push(created);
         this.laodData(1);
         this.ref.detectChanges();
      }
    });
  } */
  /* asignNewGestor(serviceName:any){
    const dialog = this.dialog.open(ModalAddGestorTerComponent,{
      width: '80%',
      minHeight: '400px',
      data: {supplierData:this.suppliers,idService:this.id_service,servName:serviceName,suppServiceOptions:this.suppliersCompanyService}
    });
  } */
  /* asignNewGestor(obj:Tercero){
    let json:changeSupp
    json={
      idSupp:obj.id,
      idServ:this.id_service,
      created_by:this.user_id,
      updated_by:this.user_id
    }
    let request={
      "supServ":json
    }
    this.loaderSubjectService.showLoader("Procesando..");
    this.http.post(API_TER_POST_ADDNEW_GESTOR_SERVICE,request,{}).subscribe(resp=>{
        if(resp["condition"]){
          Swal.fire ({
            icon:'success',
            text:resp["message"]
          })
          this.laodData(0);
        }else{
          Swal.fire ({
            icon:'error',
            text:resp["message"]
          })
        }
        
        this.loaderSubjectService.closeLoader();
    })
  } */
  /* masiveChargeModal(){
    const dialog = this.dialog.open(ModalMasiveChargeComponent,{
      width: '80%',
      minHeight: '400px',
      data: {supplierOption: this.suppliersCompanyService,idService:this.id_service}
    });
    dialog.afterClosed().subscribe( () =>  {
      const result = dialog.componentInstance.result;
      const datos:Tercero[] = dialog.componentInstance.hojaDatos;  
      if (result){
        AGREGAR AL ARREGLO
        this.suppliers = [...this.suppliers.concat(datos)];
        AGREGAR AL BACK
        this.suppliersBack = [...this.suppliersBack.concat(datos)];
        this.laodData(1);
        this.ref.detectChanges();
      }
    });
  } */
  /* clear(){
    this.filtro='';
    this.suppliers = this.suppliersBack;
  }
  changeFilter(e){
    this.suppliers =  [...this.suppliersBack.filter(p => 
      p.name.toLowerCase().includes(e.toLowerCase()) ||
      p.mail.toLowerCase().includes(e.toLowerCase()) ||
      (p.nationalId).toString().toLowerCase().includes(e.toLowerCase())
    )]
  }
  getCoronaStatus(id:number){
    switch (id) {
      case 1:
        return "Sin novedad";
      case 2:
        return "Deshabilitado"
      default:
        return "Sin definir";
    }
  }
  habilitar(sup){
    const dialog = this.dialog.open(ModalHabilitarComponent,{
      width: '600px',
      minHeight: '400px',
      data: sup
    }).afterClosed().subscribe(()=>{
      this.loading = true;
      this.laodData(1);
      this.ref.detectChanges();
    });
  } */

}
