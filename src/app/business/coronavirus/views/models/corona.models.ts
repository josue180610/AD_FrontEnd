export interface ICoronaEmployee{
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
export interface IOfficeAccess{
    id:any;
    name:any;
  }