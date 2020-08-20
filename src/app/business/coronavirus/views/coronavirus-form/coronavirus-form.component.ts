import { Component, OnInit, ViewChild, ChangeDetectorRef, Optional, Inject } from '@angular/core';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { Coronavirus } from '../models/coronavirus_generic';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { API_SAVE_CORONA_DOCUMENT, API_GET_CORONAVIRUS_GROUP_DETAIL, API_POST_CORONAVIRUS_CBO, API_GET_CORONAVIRUS_EDIT_FORM, API_GET_DISABLED_ACCESS, API_POST_CORONAVIRUS_REQUEST } from '../../../../../app/services/url.constants';
import Swal from 'sweetalert2'
import { ModalCoronavirusRelationshipComponent } from '../modal-coronavirus-relationship/modal-coronavirus-relationship.component';
import { CATEGORY_DOC, TYPE_DOC, CONTAINER_CORONA_DOCUMENT, URL_AZURE_STORAGE_CORONAVIRUS } from '../../../../../app/services/var.constants';
import { LoaderComponent } from '../../../../../app/commons/components/loader/loader.component';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';
import { coronavirusFormReactive } from './CoronaFormReactive';
import { RequestFamily } from '../models/corona_request_family';
import { IObjRequestCondition } from '../corona';
import { ConditionActive } from '../models/corona_condition_active';
import { CoronaCondition } from '../models/corona_condition';
import { CoronavirusEdit } from '../models/coronavirus_edit';
import { GroupData } from '../models/corona_group';
import { OnlyDate } from '../models/corona_not_group';
import { CoronaDocument } from '../models/corona_document';
import { CoronaHomeRequest } from '../models/request_corona_home';
import { AuthService } from '../../../../../app/services/auth-config-service';
import { User } from '../../../../../app/services/auth.model';
import { TDPLocalStorage } from '@tdp/ng-commons';
@Component({
  selector: 'tdp-coronavirus-form',
  templateUrl: './coronavirus-form.component.html',
  styleUrls: ['./coronavirus-form.component.scss'],
  providers: [coronavirusFormReactive]
})
export class CoronavirusFormComponent implements OnInit {
//condition enfermedades cronicas por pais
condition_legal_entity=false;
level_access=1;
legal_entity=null;
//permite mostrar los documentos almacenados en la base de datos y la nube, para obtener el contenedor
// y nombre de archivo.
filenameazure: any = '';
id_document: any = 0;
//_____________________
flag_validation=0;
select: Array<any> = [];
//condiciones para mostar u ocultar tag html
txt_condition_show_table = false;
condition_upload_document = false;
condition_Enfermedades_cardiovasculares = false;
condition_Enfermedades_pulmonares = false;
condition_Enfermedades_inmunosupresion = false;
@ViewChild(CoronavirusFormComponent) btnfileCondition;
validateAccess:any;
//transport
txt_transport: any=0;
//IMC
txt_weight: any =this.coronaReactive.weight.value;
txt_height: any =this.coronaReactive.height.value;
txt_imc: any = this.coronaReactive.imc.value;
txt_pre_register=0;
/* variables checkbox*/
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
txt_chk_10: any = 0;//variable para el formulario pop up relationship
txt_chk_11: any = false;//otro tipo de condicion de riesgo
txt_chk_12:any=false; // al cuidado de un familiar
array_family_relationship: Array<any> = []//arreglo para poblar el mat-select del pop up sobre parentesco.
array_corona_relationship_value: Array<RequestFamily> = [] // arreglo para pasar los datos desde el pop up hacia el back.
array_aux_request_condition: Array<IObjRequestCondition> = [] // arreglo auxiliar para almacenar objeto de enfermedades cronicas.
array_condition_active_html:Array<ConditionActive>=[] // permite obtener los flag para habilitar o deshabilitar los tag html segun entidad legal
condition_show_buttom = false;
array_cronica: Array<CoronaCondition> = []
txt_motivo = '';
txt_date1 = "";
txt_date2 = "";
search_motivo = new FormControl();
filtered_motivo: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
protected _onDestroy = new Subject<void>();
txt_condition_status = false;
txt_condition_general = false;
txt_background_white = "#FFFFFF";
background_color: any;
rol: any;
validateMenu: any;
//variable ngModel
txt_sex_employee: any;
txt_employee_name: any;
txt_cip_emp: any;
txt_id_reason: any = 0;
txt_access: any = 0;
txt_phone: any;
txt_address: any;
txt_mail: any;
txt_reason_date: any = "";
txt_date_type: any = "";
txt_end_date: any;
txt_coment: any;
txt_id: any;
txt_id_employee: any;
txt_created_by: any;
txt_updated_by: any;
txt_status: any = 0;
txt_country: any = 0;
txt_type: any = 0;
txt_inmunosupresion: any = "";
txt_cardiovasculares: any = "";
txt_pulmonare: any = "";
/**/
tokenServ: null;
userLogged : User;
//array get all reason
array_corona_transport
array_corona_reason: Array<Coronavirus> = []
array_corona_status: Array<Coronavirus> = []
array_corona_type: Array<Coronavirus> = []
array_corona_country: Array<Coronavirus> = []
array_corona_precondition: Array<Coronavirus> = []
array_corona_relationship: Array<Coronavirus> = []
array_corona_edit: Array<CoronavirusEdit> = []
array_corona_group: Array<GroupData> = []
array_corona_not_group: Array<OnlyDate> = [];
array_corona_general: Array<GroupData> = [];
array_corona_other: Array<GroupData> = [];
corona_document:CoronaDocument = null;

returnUrl = "";
coronavirusForm:FormGroup;
codeSelect = [];
constructor(public dialog: MatDialog, private route: ActivatedRoute,
  private coronaReactive:coronavirusFormReactive,
  private router: Router, private http: HttpClient,
  private ref: ChangeDetectorRef,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  @Optional() public dialogRef: MatDialogRef<CoronavirusFormComponent>,
  private datePide:DatePipe,
  private loader:LoaderComponent,
  private loaderSubjectService: LoaderSubjectService,
  private fb:FormBuilder,
  private token:AuthService,
  private localStorageService:TDPLocalStorage) {
  /* this.tokenServ = new TokenService(); */
  this.background_color = '#FFFFFF';
  this.createFormGroup();
  this.userLogged=token.getTokenUser();
  this.txt_id_employee=this.userLogged.employeeCustoms.id;
  this.txt_created_by=this.userLogged.id;
  this.txt_updated_by=this.userLogged.id;
  this.token.getValidateMenuByUser("Formulario");
}
createFormGroup(){
this.coronavirusForm = this.fb.group({
  date1:new FormControl(),
  date2:new FormControl(),
  codeSelect: new FormControl(this.codeSelect, Validators.required),
  weight: new FormControl(0),
  height: new FormControl(0),
  imc:new FormControl({value:0,disabled:true}),
  laboralCondition:new FormControl(0),
  laboralType:new FormControl(0),
  laboralHealtStatus:new FormControl(0),
  phone:new FormControl(''),
  address:new FormControl(''),
  mail:new FormControl(''),
  cardiovasculares:new FormControl(''),
  pulmonare:new FormControl(''),
  inmunosupresion:new FormControl(''),
  filenameazure:new FormControl(''),
  chk0:new FormControl(false),
  chk1:new FormControl(false),
  chk2:new FormControl(false),
  chk3:new FormControl(false),
  chk4:new FormControl(false),
  chk5:new FormControl(false),
  chk6:new FormControl(false),
  chk7:new FormControl(false),
  chk8:new FormControl(false),
  chk9:new FormControl(false),
  chk10:new FormControl(false),
  chk11:new FormControl(false),
  chk12:new FormControl(false),
  transport:new FormControl(0),
  comment:new FormControl('')
})
}
onNoClick(): void {
  this.dialogRef.close();
}
clickMove(cip: string, type: string) {
  if ((cip !== null || cip !== "") && type === "up") {
    this.txt_cip_emp = cip;
  } else {
    this.txt_cip_emp = null;
    this.txt_id_reason = null;
  }
}

//permite mostrar el boton para agregar familiares
addFamilyRelationship() {
  if (this.array_corona_relationship_value.length > 0) {
    this.txt_condition_show_table = true;
  } else {
    this.txt_condition_show_table = false;
  }
}
/*enabled or disabled  other input chronic*/
disabled_enabled_condition(value: any, condition: boolean) {
  //inmunosupresion
  if (value == 14) {
    this.condition_Enfermedades_inmunosupresion = condition;
    if (condition == false) {
      this.txt_inmunosupresion = "";
    }
  }
  //Enfermedades cardiovasculares
  if (value == 15) {
    this.condition_Enfermedades_cardiovasculares = condition;
    if (condition == false) {
      this.txt_cardiovasculares = "";
    }
  }
  //Enfermedades pulmonares crónicas
  if (value == 16) {
    this.condition_Enfermedades_pulmonares = condition;
    if (condition == false) {
      this.txt_pulmonare = "";
    }
  }
}
/*show or hide upload document*/
showOrHideUpload(selectValue){
   if(selectValue.length>0){
    this.condition_upload_document=true;
  }else{
    this.condition_upload_document=false;
  }
  this.ref.detectChanges();
  }
/*get value by click mat select chronic*/
getValues(event: {
  isUserInput: any;
  source: { value: any; selected: any };
}) {
  try {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        //save
        let objeto: IObjRequestCondition;
        objeto = { id_employee: this.txt_id_employee, id_cor_con_det: event.source.value, other_cor_det: this.txt_inmunosupresion, created_by: this.txt_created_by, updated_by: this.txt_updated_by}
        this.array_aux_request_condition.push(objeto)
        this.showOrHideUpload(this.array_aux_request_condition);
        this.disabled_enabled_condition(event.source.value, true);
      } else {
        let index = this.array_aux_request_condition.indexOf(this.array_aux_request_condition.find(id_x => id_x.id_cor_con_det==event.source.value))
        this.array_aux_request_condition.splice(index, 1);
        this.showOrHideUpload(this.array_aux_request_condition);
        this.disabled_enabled_condition(event.source.value, false);

      }
    }
  } catch (error) {
  }
}

// Permite obtener los valores para llenar los mat-select y poder seleccionar un valor.
getAllCoronaGroupAndDetails() {

  this.http.get<GroupData[]>(API_GET_CORONAVIRUS_GROUP_DETAIL).toPromise()
    .then(data => {
      this.array_corona_general = data;
      this.array_corona_general.forEach(element => {
        if (element.group == "Generico") {
          this.array_corona_not_group.push(element["group_detail"]);
        } else {
          this.array_corona_group.push(element);
        }
      });
      this.ref.detectChanges();
      /* this.blockUI.stop(); */
    })

}
getDataFormCoronavirus(id_employee: any) {
  /* this.blockUI.start("Movistar..."); */
  let Json = {
    "id_emp": this.txt_id_employee
  }
  this.http.post(API_POST_CORONAVIRUS_CBO, Json, {}).toPromise().then(data => {
    console.log(data);
    if(data["status"]==true){
    this.array_corona_reason = data["array_r"]
    this.array_corona_status = data["array"]
    this.array_corona_type = data["array_t"]
    this.array_corona_country = data["array_c"]
    this.array_corona_relationship = data["array_relationship"]
    this.array_condition_active_html=data["condition_legalEntity"]
    this.array_corona_transport = data["array_tp"]
    this.txt_cip_emp = data["employee_ssff"]["cip"];
    this.txt_employee_name = data["employee_ssff"]["name"] + " " +
    data["employee_ssff"]["last_name_1"] + " " + data["employee_ssff"]["last_name_2"];
    this.txt_sex_employee = data["employee_ssff"]["gender"];
    //Obtengo los datos de documento registrado por el empleado.
    this.corona_document = data["corona_document"];
    this.id_document=this.corona_document!=null?this.corona_document.id_doc:null;
    this.filenameazure=this.corona_document!=null?this.corona_document.name:"";
    //Obtengo el flag para los tag html segun el nivel de acceso
    // si el flag es igual a 1, entonces el disabled esta activado, caso contrario, se pueden editar los tag html
    this.array_condition_active_html.forEach(element => {
      if(Number(element.accessLevel)==1){
        this.condition_legal_entity=element.flag==1?true:false;
      }
    });
    if (data["status"] == true) {
      this.getDataForEditAdmin(id_employee);
    } else {
      /* this.blockUI.stop(); */
    }

    }else{
      Swal.fire ({
        icon:'error',
        text:data["message"]
      })
      
    }
  })
}
// Permite obtener los datos del registro de estado para mostrar al usuario y pueda modificarlos.
getDataForEditAdmin(id_employee: any) {
  let url = "?id_employee=" + id_employee;
  this.http.get<CoronavirusEdit>(API_GET_CORONAVIRUS_EDIT_FORM + url).toPromise().then(data => {
    this.txt_id = data["0"]["id_request"];
    this.coronavirusForm.get("comment").setValue(data["0"]["comment"] == null ? "" : data["0"]["comment"]);
    this.coronavirusForm.get("date1").setValue(data["0"]["date_reason"] == null ? "" : this.datePide.transform(data["0"]["date_reason"],'yyyy-MM-dd'));
    this.coronavirusForm.get("date2").setValue(data["0"]["date_type"] == null ? "" : this.datePide.transform(data["0"]["date_type"],'yyyy-MM-dd'));
    this.coronavirusForm.get("phone").setValue( data["0"]["phone"] == null ? "" : data["0"]["phone"]);
    this.coronavirusForm.get("address").setValue(data["0"]["address"] == null ? "" : data["0"]["address"]);
    this.coronavirusForm.get("mail").setValue(data["0"]["mail"] == null ? "" : data["0"]["mail"]);
    this.change_id_to_name(data["0"]["id_reason"],
      data["0"]["status_det"], data["0"]["id_type"], data["0"]["country"])
    this.txt_chk_0 = data["0"]["precondition_1"] == 0 || data["0"]["precondition_1"] == null ? this.txt_chk_0 = false : this.txt_chk_0 = true;
    this.txt_chk_1 = data["0"]["precondition_2"] == 0 || data["0"]["precondition_2"] == null ? this.txt_chk_1 = false : this.txt_chk_1 = true;
    this.txt_chk_2 = data["0"]["precondition_3"] == 0 || data["0"]["precondition_3"] == null ? this.txt_chk_2 = false : this.txt_chk_2 = true;
    this.txt_chk_3 = data["0"]["precondition_4"] == 0 || data["0"]["precondition_4"] == null ? this.txt_chk_3 = false : this.txt_chk_3 = true;
    this.txt_chk_4 = data["0"]["precondition_5"] == 0 || data["0"]["precondition_5"] == null ? this.txt_chk_4 = false : this.txt_chk_4 = true;
    this.txt_chk_5 = data["0"]["precondition_6"] == 0 || data["0"]["precondition_6"] == null ? this.txt_chk_5 = false : this.txt_chk_5 = true;
    this.txt_chk_6 = data["0"]["precondition_7"] == 0 || data["0"]["precondition_7"] == null ? this.txt_chk_6 = false : this.txt_chk_6 = true;
    this.txt_chk_7 = data["0"]["precondition_8"] == 0 || data["0"]["precondition_8"] == null ? this.txt_chk_7 = false : this.txt_chk_7 = true;
    this.txt_chk_8 = data["0"]["precondition_9"] == 0 || data["0"]["precondition_9"] == null ? this.txt_chk_8 = false : this.txt_chk_8 = true;
    this.txt_chk_9 = data["0"]["precondition_10"] == 0 || data["0"]["precondition_10"] == null ? this.txt_chk_9 = false : this.txt_chk_9 = true;
    this.txt_chk_10 =data["0"]["precondition_11"] == null ? 0 : data["0"]["precondition_11"];
    this.array_cronica = data["0"]["array_cronica"];
    this.txt_height = data["0"]["height"] == "" || data["0"]["height"] == null ? 0 : Number(data["0"]["height"])
    this.txt_weight = data["0"]["weight"] == "" || data["0"]["weight"] == null ? 0 : Number(data["0"]["weight"])
    this.txt_imc = data["0"]["imc"] == "" || data["0"]["imc"] == null ? 0 : Number(data["0"]["imc"])
    this.txt_transport = data["0"]["transport"]==null?0:data["0"]["transport"];
    this.array_corona_relationship_value=data["0"]["array_family"]
    

    this.ref.detectChanges();
    //iteracion para mostrar los valores en los inputs de las enfermedades cronicas que tengan como opcion 'Otro tipo de enfermedad...'
    
    try {
      this.array_cronica.forEach(element => {
        if (element["id_corona_condition_detail"] == 14) {
          this.txt_inmunosupresion = element.other_chronic_diseases == null ? "" : element.other_chronic_diseases;
          this.condition_Enfermedades_inmunosupresion=true;
        }
        if (element["id_corona_condition_detail"] == 15) {
          this.txt_cardiovasculares = element.other_chronic_diseases == null ? "" : element.other_chronic_diseases;
          this.condition_Enfermedades_cardiovasculares=true;
        }
        if (element["id_corona_condition_detail"] == 16) {
          this.txt_pulmonare = element.other_chronic_diseases == null ? "" : element.other_chronic_diseases;
          this.condition_Enfermedades_pulmonares=true;
        }
        
        this.ref.detectChanges();
      });

    } catch (error) {
      /* console.log(error); */
    }
    //permite agregar al mat-select de enfermedades cronicas, los valores seleccionados por el usuario.
    this.getAllCoronaGroupAndDetails();
    try {
      let objeto: IObjRequestCondition;
      this.array_cronica.forEach(element => {
        this.select.push(element["id_corona_condition_detail"]);
        objeto = { id_employee: this.txt_id_employee, id_cor_con_det: element["id_corona_condition_detail"], other_cor_det: this.txt_inmunosupresion, created_by: this.txt_created_by, updated_by: this.txt_updated_by}
        this.array_aux_request_condition.push(objeto)
        this.ref.detectChanges();
      });
      this.showOrHideUpload(this.array_aux_request_condition);
      if(this.txt_imc>0){
        this.txt_pre_register=1;
        this.ref.detectChanges();
      }
    } catch (error) {
      /* console.log(error); */
    }
    this.ref.detectChanges();
    

  })
}
//remove family by id
removeById(id) {
  try {

    //Busca un objeto del arreglo y obtengo el indice en el cual se encuentre registrado.
    let index = this.array_corona_relationship_value.indexOf(this.array_corona_relationship_value.find(id_x => id_x.id == id))
    //elimino el objeto segun su indice a nivel de frontEnd.
    this.array_corona_relationship_value.splice(index, 1);
    let size_array = this.array_corona_relationship_value.length;
    //valido el tamaño del array. Si el length es 0, elimino el sessionStorage Family, caso contrario, no.
    if (size_array < 0) {
      this.txt_condition_show_table = false;
      this.txt_chk_10 = 0;
      this.ref.detectChanges();
    }
    //parametro que permite buscar un registro siempre y cuando exista un request.
    let param = "?id=" + id;
    //Si el objeto existia a nivel de DB, tambien lo elimina.
    

  } catch (error) {
    /* console.log(error) */
  }
}
removeAccess(){
  let request="?employee="+this.txt_id_employee
  this.http.get(API_GET_DISABLED_ACCESS+request).subscribe(resp=>{
    if(resp["condition"]!=false){
      Swal.fire ({
        icon:'success',
        text:resp["message"]
      })
      
    }else{
      Swal.fire ({
        icon:'error',
        text:resp["message"]
      })
    }
  })
}

//Permite realizar el registro de estado en la tabla dhr_corona_request(Cabecera) y dhr_corona_request_detail(Historico)
save_post_validate() {
  let flag_family = false;
  let flag_imc = false;
  let flag_imc_1=false;
  let flag_imc_2=false;
  let flag_transport = false;
  
  if(this.flag_validation==1){
    this.register_corona_request();
  }else{
     /*validacion*/
    if (this.txt_transport == 0) {
      Swal.fire ({
        icon:'info',
        text:"Necesita selecciona un medio de transporte para generar su registro."
      })
      flag_transport = false;
    } else {
      flag_transport = true;
    }

    if (this.txt_chk_10 == 1 && this.array_corona_relationship_value.length == 0) {
      Swal.fire ({
        icon:'info',
        text:"Es obligatorio registrar por lo menos un familiar, si tiene seleccionado la opción de 'Vives con alguien de o con exposición de Riesgo."
      })
      flag_family = false;
    } else {
      flag_family = true;
    }

    if(!(Number(this.txt_height)>0 && (Number(this.txt_height)>=100 && Number(this.txt_height)<=250))){
      flag_imc_1=false;
      Swal.fire ({
        icon:'error',
        text:"Error, altura incorrecta. Los valores aceptados tienen que estar dentro del rago de 100cm hasta 250cm."
      })
      
    }else{
      flag_imc_1=true;
    }
    if(!(Number(this.txt_weight)>0 && Number(this.txt_weight)<=250)){
      flag_imc_2=false;
      Swal.fire ({
        icon:'error',
        text:"Error, el peso ingresado es incorrecto."
      })
      
      }else{
        flag_imc_2=true;
      }
    if (Number(this.txt_imc)<=0) {
      flag_imc = false;
      Swal.fire ({
        icon:'info',
        text:"Es obligatorio calcular su IMC para poder realizar el registro de su solicitud."
      })

    } else {
      flag_imc = true; 
    }
    if (flag_imc == true && flag_family == true && flag_transport == true && flag_imc_1==true && flag_imc_2==true) {
      this.register_corona_request();
    }
   /*validacion*/
  }
  
   
}
// register corona request by corona home
register_corona_request() {
  try {
    this.array_aux_request_condition.forEach(element => {
      if (element.id_cor_con_det == 14) {
        element.other_cor_det = this.txt_inmunosupresion;
      }
      if (element.id_cor_con_det == 15) {
        element.other_cor_det = this.txt_cardiovasculares;
      }
      if (element.id_cor_con_det == 16) {
        element.other_cor_det = this.txt_pulmonare;
      }
    })
    let request:CoronaHomeRequest;
    request = {
      array_family:this.array_corona_relationship_value,array:this.array_aux_request_condition,
      id_employee:this.txt_id_employee == null ? "" : this.txt_id_employee,phone: this.txt_phone == null ? "" : this.txt_phone,
      mail: this.txt_mail == null ? "" : this.txt_mail,address:this.txt_address == null ? "" : this.txt_address,
      id_corona_reason:this.txt_id_reason == null ? "" : this.txt_id_reason,comment:this.txt_coment == null ? "" : this.txt_coment,
      status_det:this.txt_status == null ? "" : this.txt_status,id_corona_type:this.txt_type == null ? "" : this.txt_type,
      id_country:this.txt_country == 0? 0 : this.txt_country,id_precondition_1:this.txt_chk_0 == false ? 0 : 1,
      id_precondition_2:this.txt_chk_1 == false ? 0 : 1,id_precondition_3:this.txt_chk_2 == false ? 0 : 1,
      id_precondition_4:this.txt_chk_3 == false ? 0 : 1,id_precondition_5:this.txt_chk_4 == false ? 0 : 1,
      id_precondition_6:this.txt_chk_5 == false ? 0 : 1,id_precondition_7:this.txt_chk_6 == false ? 0 : 1,
      id_precondition_8:this.txt_chk_7 == false ? 0 : 1,id_precondition_9:this.txt_chk_8 == false ? 0 : 1,
      id_precondition_10:this.txt_chk_9 == false ? 0 : 1,id_precondition_11:this.txt_chk_10,
      date_reason:this.txt_reason_date != "" ? this.datePide.transform(this.txt_reason_date,'yyyy-MM-dd') : "",
      date_type:this.txt_date_type != "" ? this.datePide.transform(this.txt_date_type,'yyyy-MM-dd') : "",
      weight:this.txt_weight,height:this.txt_height,imc:this.txt_imc,transport:this.txt_transport,
      created_by:this.txt_created_by,updated_by:this.txt_updated_by
    }
    let Json = {
      "request_obj":request
    }
    let flag_condition = 1;
    let generic_message = "";
    let other_message = "";
    if (this.txt_id_reason == 0) {
      generic_message = "Si no ingreso direccion,telefono/celular o estado de salud, no podra completar su registro.";
      flag_condition = 0;
    }
    if (this.data == null) {
      if (this.txt_phone == "") {
        generic_message = "Si no ingreso direccion,telefono/celular o estado de salud, no podra completar su registro."
        flag_condition = 0;
      }
      if (this.txt_address == "") {
        generic_message = "Si no ingreso direccion,telefono/celular o estado de salud, no podra completar su registro.";
        flag_condition = 0;
      }
    }

    if (this.txt_pulmonare == "" && this.condition_Enfermedades_pulmonares == true) {
      flag_condition = 0;
      other_message = "Si usted selecciono algun de otro tipo de enfermedad cronica, debe de especificar cual es, caso contrario, no podra completar su registro."
    }
    if (this.txt_cardiovasculares == "" && this.condition_Enfermedades_cardiovasculares == true) {
      flag_condition = 0;
      other_message = "Si usted selecciono algun de otro tipo de enfermedad cronica, debe de especificar cual es, caso contrario, no podra completar su registro."

    }
    if (this.txt_inmunosupresion == "" && this.condition_Enfermedades_inmunosupresion == true) {
      flag_condition = 0;
      other_message = "Si usted selecciono algun de otro tipo de enfermedad cronica, debe de especificar cual es, caso contrario, no podra completar su registro."

    }
    if (flag_condition == 0) {
      Swal.fire ({
        icon:'info',
        text:generic_message + "\n" + other_message 
      })
      
    } else {
      /* this.blockUI.start('Save...'); */

      this.http.post(API_POST_CORONAVIRUS_REQUEST, Json, {}).subscribe(data => {
        /* this.clear_input_text(); */
        if (data["rpt"] == 1) {
          Swal.fire ({
            icon:'success',
            text:"Hemos guardado tus cambios, recuerda que puedes modificar y/o actualizar tu estado de salud cuando sea necesario."
          })
          
          this.getDataForEditAdmin(this.txt_id_employee);
          this.array_aux_request_condition = []
          this.ref.detectChanges();
        } else {
          Swal.fire ({
            icon:'success',
            text:data["message"]
          })
          
        }

        /* this.blockUI.stop(); */

      })
    }
  } catch (error) {
    /* console.log(error) */
  }
}

showModalRelationship(param: any) {
  console.log(param);
  console.log(this.coronavirusForm.get("chk10").value)
  let dialogRef: any;
    if (param == 1) {
      if (this.coronavirusForm.get("chk10").value != 0) {
        dialogRef = this.dialog.open(ModalCoronavirusRelationshipComponent, {
          width: '70%',
          height: '500px',
          /*recive el dato como un diccionario de datos {key:value}*/
          data: {
            array_Relationship: this.array_corona_relationship,
            id_request: this.txt_id
          }

        });
      }
    }
    if(this.txt_chk_10==0){
      this.txt_condition_show_table=false;
    }
    if (param == 2) {
      dialogRef = this.dialog.open(ModalCoronavirusRelationshipComponent, {
        width: '70%',
        height: '500px',
        /*recive el dato como un diccionario de datos {key:value}*/
        data: {
          array_Relationship: this.array_corona_relationship,
          id_request: this.txt_id
        }

      });
    }
    try {
    dialogRef.afterClosed().subscribe(_result => {
      let afterClose_array_relationship:Array<RequestFamily> = [];
      afterClose_array_relationship=_result;
      afterClose_array_relationship.forEach(element => {
        this.array_corona_relationship_value.push(element);

        this.ref.detectChanges();
      });
      if (this.array_corona_relationship_value.length > 0) {
        this.txt_condition_show_table = true;
        this.ref.detectChanges();
      }
    });
  } catch (error) {

  }
}

change_id_to_name(id_reason, status_det, type, country) {
  for (let value of this.array_corona_reason) {
    if (id_reason == value["id"]) {
      /* this.txt_id_reason = value["id"]; */
      this.coronavirusForm.get("laboralHealtStatus").setValue(value["id"]);
    }
  }
  for (let value of this.array_corona_status) {
    if (status_det == value["id"]) {
      /* this.txt_status = value["id"]; */
      this.coronavirusForm.get("laboralCondition").setValue(value["id"])
    }
  }
  for (let value of this.array_corona_type) {
    if (type == value["id"]) {
      /* this.txt_type = value["id"]; */
      this.coronavirusForm.get("laboralType").setValue(value["id"])
    }
  }
  for (let value of this.array_corona_country) {
    if (country == value["id"]) {
      this.txt_country = value["id"];
    }
  }
  this.ref.detectChanges();
}
//files variables
src: any;
type: any;
filename: any;
// Metodo que permite obtener los atributos del archivo seleccionado 
// para su almacenamiento en el repositorio en la nube y registro en la DB.
uploadFileHome(event) {
  try {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.src = JSON.stringify(reader.result);
      this.type = file["type"]
      this.filename = file["name"]
      this.saveCoronaDocument(this.src, this.id_document, TYPE_DOC,CATEGORY_DOC, this.filename, this.txt_id_employee, this.txt_created_by, this.txt_updated_by);
      /* this.uploadCoronaDocument(this.src,this.filename,this.txt_id_employee,"coronavirus_dev",type_doc,cat_doc,this.txt_id_employee,this.txt_created_by,this.txt_updated_by); */
      this.ref.detectChanges();
    };
  } catch (error) {
    /* console.log(error) */
  }
}
// Permite descargar los archivos almancenados en el repositorio por medio de la url,contenedor y nombre de archivo.
getFileAttach() {
  const a = document.createElement("a");
  a.href = ( URL_AZURE_STORAGE_CORONAVIRUS + this.filenameazure);
  a.download = this.filenameazure;
  a.click();
}
// Permite cargar un documento hacia un repositorio en la nube y registrar algunos datos(ejem: nombre de archivo )
//en la DB
// Permite registar los datos en la base de datos de los archivos almacenados en la nube
saveCoronaDocument(src, id_doc, typeDoc, catDoc, filename, id_emp, created_by, updated_by) {
  let json = {
    "src": src,
    "identifier": id_emp,
    "container": CONTAINER_CORONA_DOCUMENT,
    "id_doc": id_doc,
    "typeDoc": typeDoc,
    "catDoc": catDoc,
    "filename": filename,
    "id_emp": id_emp,
    "created_by": created_by,
    "updated_by": updated_by
  }
  /* this.blockUI.start("Uploading...") */
  this.http.post(API_SAVE_CORONA_DOCUMENT, json, {}).toPromise().then(data => {
    if (data["condition"] == true) {
      Swal.fire ({
        icon:'success',
        text:data["message"]
      })
      
      this.getDataFormCoronavirus(this.txt_id_employee);
      /* this.blockUI.stop(); */
    } else {
      Swal.fire ({
        icon:'error',
        text:data["message"]
      })
      
      /* this.blockUI.stop(); */
    }
    this.ref.detectChanges();
  })
}

textValidate(text) {
  if (text == "Generico") {
    return ""
  } else {
    return text;
  }
}
  ngOnInit() {
    setTimeout(() => {
      /* this.loaderSubjectService.showLoader("Cargando componentes.."); */
     /*  this.loaderSubjectService.closeLoader(); */
    }, 300);
    
    

  }
 // calculate imc
 caculate_imc() {
  this.txt_weight=this.coronavirusForm.get("weight").value;
  this.txt_height=this.coronavirusForm.get("height").value;
  if(Number(this.txt_weight)<=0 || Number(this.txt_height)<=0){
    this.txt_imc=0;
    this.coronavirusForm.get("imc").setValue(this.txt_imc);
  }else{
    let aux_imc = Number(this.txt_weight) / (Math.pow(Number(this.txt_height) / 100, 2));
    this.txt_imc=Number(parseFloat(String(aux_imc)).toFixed(2));
    this.coronavirusForm.get("imc").setValue(this.txt_imc);
  }
  
}
register_new_case() {
  this.returnUrl = "/coronavirus/forms"
  //BlockUI Start
  this.router.navigateByUrl(this.returnUrl);
}
}
