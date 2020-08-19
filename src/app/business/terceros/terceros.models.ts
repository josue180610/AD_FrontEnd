export interface Tercero{
    id?:number,
    activity:string,
    birthdate:string,
    codeCompany:string,
    gender:string,
    lastName1:string,
    lastName2:string,
    mail:string,
    name:string,
    nationalId:string,
    coronaStatus:number,
    statusDetail:string,
    idCompany?:number,
    updatedAt?:string
}
export interface Idelete{
  cond:any;
  idService:any;
  actionType:any;
  flagActive:any;
}
export interface Icode{
  id:any;
}
export interface company{
  id:any;
  name:any;

}
export interface Transport{
  id:number;
  description:string;
  icon:string;
  type:boolean;   
}

export interface companyService{
  id:any;
  id_company:any;
  name:any;
}
export interface suppServices{
    id:any;
    name:any;
  }
  export interface servicesDisabled{
    idSupplier:any;
    idService: any;
    supplierName:any;
    serviceName: any;
    companyName: any;
    condition: any;
    dateDisabled:any;
  }
export interface Sintomas{
    id:number;
    description:string;
    icon:string;
    option?:boolean;
    touched?:boolean;     
}
export interface showMngTdp{
    id:any;
    fullname:any;
    national_id:any;
    cip:any;
  }
export interface Transport{
    id:number;
    description:string;
    icon:string;
    type:boolean;   
}


export interface Employee{
idEmployee:any;
temperature:any;
comment:any;
typeMove:any;
sede:any;
transport:any;
floor:any;
token:any;
user_id:any;
nationalId:any;
timezone:any;
}

export interface Company {
    id:any;
    status:any;
    code:any;
    name:any;
}

export interface cService{
    id:any;
    name:any;
}

export interface requestUserServ{
    id_serv:any;
    id_user:any;
    created_by:any;
    updated_by:any;
}
export interface changeSupp{
    idSupp:any;
    idServ:any;
    created_by:any;
    updated_by:any;
  }
export interface employeeData{
    cip:any;
    id:any;
    last_name_1:any;
    last_name_2:any;
    legal_entity_id:any;
    mail:any;
    name:any;
    national_id;
  }

export interface reportData{
    dni:any;
    name:any;
    lastName1:any;
    lastName2:any;
    serviceName:any;
    dateGenerate:any;
    userStatus:any;
    docMedic:any;
    qrStatus:any;
    qrHour:any;
    personStatus:any;
    reportHour:any;
    personDoor:any;
    checking:any;
    hourIn:any;
    tempIn:any;
    hourOut:any;
    tempOut:any;
    countOut:any;
    countIn:any;
}