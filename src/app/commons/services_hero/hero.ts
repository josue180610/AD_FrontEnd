export interface Hero {
  id: number;
  cip: string;
  document: string;
  name: string;
  invoices: Invoice[];
  }

export interface Invoice {

    id: string;
    name:string
    cip:string 
    type: string;
    datemition:string;
    checked: boolean;
} 
 
 