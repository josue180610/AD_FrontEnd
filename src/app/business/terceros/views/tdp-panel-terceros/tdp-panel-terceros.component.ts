import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalAsignmanagerComponent } from '../modal-asignmanager/modal-asignmanager.component';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { Company, requestUserServ, cService, showMngTdp } from '../../terceros.models';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { API_TER_GET_COMPANYSERVICE, API_TER_GET_COMPANYSERVICE_DESCRIPTION, API_TER_GET_COMPANY, API_TER_COMPANY_SERVICES__, API_TER_POST_ADD_USERSERVICE, API_TER_COMPANY_SERVICE__ } from '../../../../../app/services/url.constants';
import Swal from 'sweetalert2';
import { ModalAddGestorTdpComponent } from '../modal-add-gestor-tdp/modal-add-gestor-tdp.component';
import { MatTableDataSource } from '@angular/material/table';
import { ModalShowGestorTdpComponent } from '../modal-show-gestor-tdp/modal-show-gestor-tdp.component';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';

@Component({
  selector: 'tdp-tdp-panel-terceros',
  templateUrl: './tdp-panel-terceros.component.html',
  styleUrls: ['./tdp-panel-terceros.component.scss']
})
export class TdpPanelTercerosComponent implements OnInit {

 //mat table 
 displayedColumns: string[] = ['RUC', 'R_SOCIAL', 'SUPPLIER','GESTOR','STATUS','ADDGESTOR'];
 dataSource=null;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 //mat select search
 txt_company="";
 myCompnay= new FormControl();
 searchMyCompany=new FormControl();
 filteredRelation: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
 optionCompany:Array<Company>=[];
 optionCompanyFilter:string[]=[];
 request:requestUserServ;
 array_company_service:Array<cService>=[]
 condition_service=false;
 form_condition=true;
 show_message_condition=false;
 message_condition="";
 found_condition=false;
 previous_condition=true;
 newService_condition=true;
 protected _onDestroy = new Subject<void>();
 loading:boolean = true;
 actionForm = '';
 company_id =2;
 id_user;
 array_gestorTdp:Array<showMngTdp>=[]
 company = {
   ruc:'',
   alias:'',    
   name:'',
   activity:''  
 }
 service = {
   id_company:0,
   name:'',
   description:'',    
   contactname:'',
   contactnumber:'',
   contactmail:'',    
 }
 lstCompanies = [];
 form_disabled: boolean;
 private token:any;
 constructor(
   public http:HttpClient,
   public ref:ChangeDetectorRef,
   public dialog:MatDialog,
   private loaderSubjectService: LoaderSubjectService) { }
  
 //metodos para complementar el filtrado en el select-search
 matSelectCompany() {
   this.optionCompanyFilter=[];
   this.optionCompany.forEach(element => {
     this.optionCompanyFilter.push(element.name);
   });
   //metodos para filtrado con select-search
   this.filteredRelation.next(this.optionCompanyFilter.slice());
   this.searchMyCompany.valueChanges
     .pipe(takeUntil(this._onDestroy))
     .subscribe(() => {
       this.filterBanks();
       this.ref.detectChanges();
     });
 }
 protected filterBanks() {
   if (!this.optionCompanyFilter) {
     return;
   }
   // get the search keyword
   let search = this.searchMyCompany.value;
   if (!search) {
     this.filteredRelation.next(this.optionCompanyFilter.slice());
     return;
   } else {
     search = search.toLowerCase();
   }
   // filter the banks
   this.filteredRelation.next(
     this.optionCompanyFilter.filter(bank => bank.toLowerCase().indexOf(search) > -1)
   );
 }
 transformNameForId(){
   this.optionCompany.forEach(element => {
     if(element.name.toLocaleLowerCase()==this.txt_company.toLocaleLowerCase()){
       this.service.id_company=element.id;
       this.findCompanyServiceByCompany(this.service.id_company);
       
     }
   });
 }
 transformIdForName(initId){
   this.optionCompany.forEach(element => {
     if(element.id==initId){
       this.txt_company=element.name;
     }
   });
 }
 findCompanyServiceByCompany(id_comp){
   let param="?id_comp="+id_comp;
   this.http.get(API_TER_GET_COMPANYSERVICE+param).subscribe(resp=>{
     if(resp["condition"]==true){
       this.array_company_service=resp["services"]
       this.ref.detectChanges();
     }else{
       Swal.fire({
         icon:'warning',
         text:resp["message"]
       });
     }
   })
 }

 showAddNewCompanyService(type){
   if(type=="E"){
     this.newService_condition=false;
     this.clearForms();
   }
   if(type=="D"){
     this.newService_condition=true;
     this.clearForms();
   }
 }

 showDescriptionCompanyService(id_serv){
   let param="?id_serv="+id_serv;
   this.http.get(API_TER_GET_COMPANYSERVICE_DESCRIPTION+param).subscribe(resp=>{
     this.condition_service=true;
     this.service=resp["company"]
     this.ref.detectChanges();
   })
 }
 findCompanyByRuc(){
   if(this.company.ruc==""){
     this.show_message_condition=true;
     this.message_condition="Necesitra ingresar el ruc de la empresa para poder crear un servicio."
   }else{
     let param="?ruc="+this.company.ruc;
     this.http.get(API_TER_GET_COMPANY+param).subscribe(d=>{
       this.found_condition=d["condition"];
       if(d["condition"]==true){
         this.company.ruc=d["company"]["company_code"];
         this.company.name=d["company"]["name"];
         this.company.alias=d["company"]["alias"];
         this.company.activity=d["company"]["activity"]
         this.service.id_company=d["company"]["id"]
         this.message_condition=d["message"];
         this.form_disabled=true;
         this.form_condition=true;
         this.actionForm="B";
         this.ref.detectChanges();
       }else{
         this.actionForm="B";
         this.form_condition=true;
         this.form_disabled=false;
         this.ref.detectChanges();
       }
     })
   }
 }

 nextForm(){
   this.findCompanyByRuc();    
 }

 previousTableCompanyService(){
   this.newService_condition=true;
   this.ref.detectChanges();
 } 

 asignManagerGestor(obj:any){
   const dialog = this.dialog.open(ModalAddGestorTdpComponent,{
     width: '700px',
     minHeight: '400px',
     data:{
       "serviceObj":obj
     }
   });
   dialog.afterClosed().subscribe(resp=>{
     try {
       if(resp["condition"]==1){
         let body={
           "id_emp":resp["employee"]["id"],
           "id_serv":obj.id,
           "created_by":this.id_user,
           "updated_by":this.id_user
         }
         this.addUserService(body);
       }
     } catch (error) {
       
     }
   })
 }

 previousForm(){
   this.clearForms();
   this.form_condition=false;
 }
 newCompanyService(){
   this.company.ruc="";
   this.company.alias="";
   this.company.name="";
   this.company.activity="";
   this.found_condition=false;
   this.actionForm="B";
   this.service.id_company=null;
   
   this.form_disabled=false;
 }
 //__________________________________________________________
 ngOnInit() {
   this.id_user = this.token.getDatoFromToken().user.id;
   this.form_condition=false;
   this.clearForms();
   this.loadContent();
 }
 loadContent(){
   this.http.get(API_TER_COMPANY_SERVICES__ + this.id_user).toPromise().then(resp => {
     this.loading = false;
     if (resp['companies'] ){
       this.lstCompanies = [...resp['companies']];
       this.dataSource= new MatTableDataSource(this.lstCompanies);
       console.log(this.lstCompanies)
       this.dataSource.paginator=this.paginator;
       this.ref.detectChanges();
     }
     if (resp["companyObject"]){
       let auxInitId=0;
       this.optionCompany=resp["companyObject"];
       
       this.transformIdForName(auxInitId);
       this.transformNameForId();
       this.matSelectCompany();
       this.ref.detectChanges();
     }
   })
 }
 clearForms(){
   this.company = {
     ruc:'',
     alias:'',    
     name:'',
     activity:''  
   }
   this.service = {
     id_company:0,
     name:'',
     description:'',    
     contactname:'',
     contactnumber:'',
     contactmail:'',    
   }
   this.txt_company="";
   this.form_condition=false;
   this.found_condition=false;
 }

 /* @BlockUI() blockUI: NgBlockUI; */
 createCompanyServiceByActionForm(){   
     this.createCompanyService();
 }
 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }
 showManagerGestor(obj:any){
   let param="?idService="+obj.id;
   this.http.get<showMngTdp[]>(API_TER_POST_ADD_USERSERVICE+param).subscribe(resp=>{
     console.log(resp);
     if(resp["condition"]==true){
       this.array_gestorTdp=resp["employee"];
       this.ref.detectChanges();
       const dialog = this.dialog.open(ModalShowGestorTdpComponent,{
         width: '700px',
         minHeight: '400px',
         data:{
           "gestorTdp":this.array_gestorTdp
         } 
       });
       dialog.afterClosed().subscribe(resp=>{
         try {
           if(resp["condition"]!=0){
             let body={
               "id_emp":resp["employee"]["id"],
               "user_id":this.id_user,
               "idService":obj.id
             }
             this.disabledRoleTdpMng(body);
           }
         } catch (error) {
           
         }
       })
     }
   })
 }
 disabledRoleTdpMng(obj:any){
   let json={
     "emp":obj
   }
   /* this.blockUI.start("Procesando..") */
   this.loaderSubjectService.showLoader("Procesando..");
   this.http.put(API_TER_POST_ADD_USERSERVICE,json,{}).subscribe(resp=>{
     /* this.blockUI.stop(); */
     this.loaderSubjectService.closeLoader();
     if(resp["condition"]==true){
       Swal.fire({
         icon:'info',
         text:resp["message"]
       });
       this.loadContent();
     }else{
       Swal.fire({
         icon:'error',
         text:resp["message"]
       });
     }
    
   })
 }
 addUserService(userService:any){
   let json={
     "uServ":userService
   }
   /* this.blockUI.start("Procesando.."); */
   this.loaderSubjectService.showLoader("Procesando..")
   this.http.post(API_TER_POST_ADD_USERSERVICE,json,{}).subscribe(resp=>{
     if(resp["condition"]){
       Swal.fire({
         icon:'info',
         text:resp["message"]
       });
     /* this.blockUI.stop(); */
     this.loaderSubjectService.closeLoader();
     }else{
       Swal.fire({
         icon:'warning',
         text:resp["errors"]
       });
      /*  this.blockUI.stop(); */
     }
   });
 }
 createCompanyService(){
   if (this.actionForm == 'B' && this.company.ruc == ""){
     Swal.fire({
       icon:'warning',
       text:"El campo RUC es obligatorio"
     });
     return;
   }else if (this.actionForm == 'B' && this.company.name == ""){
     Swal.fire({
       icon:'warning',
       text:"El campo Razón social es obligatorio"
     });
     return;
   
   } else if (this.service.name == ""){
     Swal.fire({
       icon:'warning',
       text:"El campo Nombre del servicio social es obligatorio"
     });
     return;
   }else if (this.service.contactname == ""){
     Swal.fire({
       icon:'warning',
       text:"El campo Persona de contacto es obligatorio"
     });
     return;
   }else if (this.service.contactnumber == ""){
     Swal.fire({
       icon:'warning',
       text:"El campo Número de contacto es obligatorio"
     });
     return;
   }

   let request = {action: this.found_condition==true?"C":this.actionForm, company: this.company, service: this.service,id_user:this.id_user};

   if (this.actionForm == 'A'){
     // CREAR EMPRESA CON SERVICIO GENERAL
     request.service.name = "Servicios generales";
     request.service.description = "Servicios generales";      
   }
   /* this.blockUI.start("Procesando...")  */   
   this.loaderSubjectService.showLoader("Procesando..");
   this.http.post(API_TER_COMPANY_SERVICE__, request).toPromise().then(resp => {
     /* this.blockUI.stop(); */
     this.loaderSubjectService.closeLoader();
     if (resp['status'] == 1){
       Swal.fire({
         icon:"success",
         title:"El servicio tercero se registró correctamente."
       }).then(()=>{
         this.actionForm = '';
         this.clearForms();
         this.previousTableCompanyService();
         this.loadContent();
         this.ref.detectChanges();
       })
     }else{
       Swal.fire({
         icon:"error",
         title:resp["message"]
       })
     }
   })

 }
 asignManager(data,idx){
   const dialog = this.dialog.open(ModalAsignmanagerComponent,{
     width: '600px',
     minHeight: '400px',
     data 
   });
   dialog.afterClosed().subscribe( () =>  {
     const result = dialog.componentInstance.result;
     const mail = dialog.componentInstance.supplier.mail;  
     if (result){
       this.loadContent();
       let long=this.lstCompanies.length
       this.lstCompanies[long-1].idManager = 0;
       this.lstCompanies[long-1].managerMail = mail;
       this.ref.detectChanges();
     }
   });
 }
 

}
