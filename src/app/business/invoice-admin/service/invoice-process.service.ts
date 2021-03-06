import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { map } from  'rxjs/operators';
import { Injectable } from '@angular/core';
 
@Injectable({  
  providedIn: 'root'  
})  
export class InvoiceProcessService { 
	SERVER_URL: string = "https://file.io/";  
  constructor(private httpClient: HttpClient) { } 
  
    public upload(formData) {

        return this.httpClient.post<any>(this.SERVER_URL, formData, {  
        reportProgress: true,  
        observe: 'events'  
        });  
    }
}