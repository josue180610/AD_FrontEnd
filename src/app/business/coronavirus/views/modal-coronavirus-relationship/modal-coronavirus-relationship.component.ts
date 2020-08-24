import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestFamily } from '../models/corona_request_family';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CoronavirusDrow } from '../models/coronavirus_generic';

@Component({
  selector: 'tdp-modal-coronavirus-relationship',
  templateUrl: './modal-coronavirus-relationship.component.html',
  styleUrls: ['./modal-coronavirus-relationship.component.scss']
})
export class ModalCoronavirusRelationshipComponent implements OnInit {
  relationGroup:FormGroup
  txt_name_relationship = "";
  arrayCoronaRelationship: Array<CoronavirusDrow> = []
  aux_array_corona_relationship_value: Array<RequestFamily> = []
  array_corona_relationship: Array<any> = []
  txt_id_request: any;
  txt_fullname: any = "";
  txt_relationship: any;
  txt_chk_1: any = 0;
  txt_chk_2: any = 0;
  txt_chk_3: any = 0;
  txt_chk_4: any = 0;
  txt_comment: any = "";
  txt_name: any = "";
  txt_last_name_1 = "";
  txt_last_name_2 = "";
  txt_otherRelationship = "";
  txt_condition_relationship = false;
  txt_condition_show_table = false;
  constructor(
    private http:HttpClient,
    private dialogRef:MatDialogRef<ModalCoronavirusRelationshipComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private fb:FormBuilder
  ) { 
    this.createFormGroup();
  }
  createFormGroup(){
    this.relationGroup=this.fb.group({
      chk1:new FormControl(false),
      chk2:new FormControl(false),
      chk3:new FormControl(false),
      chk4:new FormControl(false),
      name:new FormControl(""),
      lastName1:new FormControl(""),
      lastName2:new FormControl(""),
      comment:new FormControl(""),
      relationship:new FormControl(0),
      otherRelationship:new FormControl(""),
      
    })
  }
  clean_inputs() {
    this.relationGroup.get("name").setValue("");
    this.relationGroup.get("lastName1").setValue("");
    this.relationGroup.get("lastName2").setValue("");
    this.relationGroup.get("comment").setValue("");
    this.relationGroup.get("otherRelationship").setValue("");
    this.relationGroup.get("ck1").setValue(false);
    this.relationGroup.get("ck2").setValue(false);
    this.relationGroup.get("ck3").setValue(false);
    this.relationGroup.get("ck4").setValue(false);
  }
  show_other_relationship() {
    if (this.txt_relationship == 7) {
      this.txt_condition_relationship = true;
    } else {
      this.txt_condition_relationship = false;
    }
  }
  ngOnInit() {
    if(this.data!=null){
      this.arrayCoronaRelationship=this.data.arrayRelationship;
    }
    this.txt_id_request = this.data.id_request;
    /* this.showDataByIdRequest(this.txt_id_request); */
  }
  onNoClick(): void {
    this.dialogRef.close(this.arrayCoronaRelationship.length==0?[]:this.arrayCoronaRelationship);
  }
  reset() {
    this.arrayCoronaRelationship = [];
  }
  addFamily() {
    let flag = true;
    let chk_1=this.txt_chk_1==true?1:0;
    let chk_2=this.txt_chk_2==true?1:0;
    let chk_3=this.txt_chk_3==true?1:0;
    let chk_4=this.txt_chk_4==true?1:0;
    let acu_chk=Number(chk_1)+Number(chk_2)+Number(chk_3)+Number(chk_4);
    if(acu_chk<1){
      
      Swal.fire ({
        icon:'error',
        text:"Error, necesita seleccionar por lo menos 1 condición de riesgo para registrar un familiar."
      })
      flag = false;
    }else{
      flag = true;
    }
    if (this.txt_relationship == 0 || this.txt_relationship == null) {
      Swal.fire ({
        icon:'error',
        text:"Error, necesitas seleccionar el tipo de parentesco para registrar un familiar."
      })
      flag = false;
    }
    if (String(this.txt_name) == "" || String(this.txt_name) == null) {
      Swal.fire ({
        icon:'error',
        text:"Error, necesitas ingresar el nombre completo para registrar un familiar."
      })
      flag = false;
    }
    
    if (flag == true) {
      let family = null;
      this.array_corona_relationship.forEach(element => {
        if (Number(element["id"]) == Number(this.txt_relationship)) {
          family = new RequestFamily(String(this.arrayCoronaRelationship.length+1)+"a", 1, this.txt_name, this.txt_last_name_1, this.txt_last_name_2,
            this.txt_relationship,
            element["name"],
            this.txt_chk_1 == true ? 1 : 0,
            this.txt_chk_2 == true ? 1 : 0,
            this.txt_chk_3 == true ? 1 : 0,
            this.txt_chk_4 == true ? 1 : 0,
            this.txt_otherRelationship,
            this.txt_comment,
            "T");
        }
      });
      this.arrayCoronaRelationship.push(family);
      this.clean_inputs();
      this.onNoClick();
    }
  }

}
