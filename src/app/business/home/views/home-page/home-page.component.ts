import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  constructor (private http:HttpClient){}
  url:"https://jsonplaceholder.typicode.com/todos";
  httpData:any;
  ngOnit(){
    this.http.get<Datos[]>(this.url).subscribe(data=>{
      this.httpData=data;
    })
  }
}



interface Datos {
  name:string;
  address:string;
}