export class request_family{
    id:any;
    status:any;
    name:any;
    last_name_1:any;
    last_name_2:any;
    id_request:any;
    id_relationship:any;
    name_relationship:any;
    other_relationship:any;
    id_family_condition_1:any;
    id_family_condition_2:any;
    id_family_condition_3:any;
    id_family_condition_4:any;
    comment:any;
    action:any;
    constructor(id:any,status:any,name:any,last_name_1:any,last_name_2:any,id_relationship:any,name_relationship:any,id_family_condition_1,id_family_condition_2,
        id_family_condition_3,id_family_condition_4,other_relationship:any,comment:any,action:any){
        this.id=id;
        this.status=status;
        this.name=name;
        this.last_name_1=last_name_1;
        this.last_name_2=last_name_2;
        this.id_relationship=id_relationship;
        this.name_relationship=name_relationship;
        this.other_relationship=other_relationship;
        this.id_family_condition_1=id_family_condition_1;
        this.id_family_condition_2=id_family_condition_2;
        this.id_family_condition_3=id_family_condition_3;
        this.id_family_condition_4=id_family_condition_4;
        this.comment=comment;
        this.action=action;
      }
      
      
}