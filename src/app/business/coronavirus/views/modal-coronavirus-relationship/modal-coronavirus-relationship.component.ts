import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestFamily } from '../models/corona_request_family';
import Swal from 'sweetalert2';

@Component({
  selector: 'tdp-modal-coronavirus-relationship',
  templateUrl: './modal-coronavirus-relationship.component.html',
  styleUrls: ['./modal-coronavirus-relationship.component.scss']
})
export class ModalCoronavirusRelationshipComponent implements OnInit {
  txt_name_relationship = "";
  array_corona_relationship_value: Array<RequestFamily> = []
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
    @Inject(MAT_DIALOG_DATA) private data:any
  ) { }
  clean_inputs() {
    this.txt_name = "";
    this.txt_last_name_1 = "";
    this.txt_last_name_2 = "";
    this.txt_comment = "";
    this.txt_chk_1 = false;
    this.txt_chk_2 = false;
    this.txt_chk_3 = false;
    this.txt_chk_4 = false;
  }
  show_other_relationship() {
    if (this.txt_relationship == 7) {
      this.txt_condition_relationship = true;
    } else {
      this.txt_condition_relationship = false;
    }
  }
  ngOnInit() {
    this.txt_id_request = this.data.id_request;
    /* this.showDataByIdRequest(this.txt_id_request); */
  }
  onNoClick(): void {
    this.dialogRef.close(this.array_corona_relationship_value.length==0?[]:this.array_corona_relationship_value);
  }
  reset() {
    this.array_corona_relationship_value = [];
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
          family = new RequestFamily(String(this.array_corona_relationship_value.length+1)+"a", 1, this.txt_name, this.txt_last_name_1, this.txt_last_name_2,
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
      this.array_corona_relationship_value.push(family);
      this.clean_inputs();
      this.onNoClick();
    }
  }

}
