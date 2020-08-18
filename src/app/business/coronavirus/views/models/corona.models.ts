export interface coronaEmployee{
    id:number,
    name:String,
    cip:String,
    dni:String,
    status:number,
    comment:String,
    phone:String,
    mail:String,
    id_request?:number,
    details?:[]
}
export interface officeAccess{
    id:any;
    name:any;
  }