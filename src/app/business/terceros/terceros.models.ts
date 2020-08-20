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
export interface ICompany{
  id:any;
  name:any;

}
export interface ITransport{
  id:number;
  description:string;
  icon:string;
  type:boolean;   
}

export interface ICompanyService{
  id:any;
  id_company:any;
  name:any;
}
export interface ISuppServices{
    id:any;
    name:any;
  }
  export interface IServicesDisabled{
    idSupplier:any;
    idService: any;
    supplierName:any;
    serviceName: any;
    companyName: any;
    condition: any;
    dateDisabled:any;
  }
export interface ISintomas{
    id:number;
    description:string;
    icon:string;
    option?:boolean;
    touched?:boolean;     
}
export interface IShowMngTdp{
    id:any;
    fullname:any;
    national_id:any;
    cip:any;
  }
export interface ITransport{
    id:number;
    description:string;
    icon:string;
    type:boolean;   
}


export interface IEmployee{
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

export interface ICompany {
    id:any;
    status:any;
    code:any;
    name:any;
}

export interface ICService{
    id:any;
    name:any;
}

export interface IRequestUserServ{
    id_serv:any;
    id_user:any;
    created_by:any;
    updated_by:any;
}
export interface IChangeSupp{
    idSupp:any;
    idServ:any;
    created_by:any;
    updated_by:any;
  }
export interface IEmployeeData{
    cip:any;
    id:any;
    last_name_1:any;
    last_name_2:any;
    legal_entity_id:any;
    mail:any;
    name:any;
    national_id;
  }

export interface IReportData{
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