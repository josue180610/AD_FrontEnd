import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class HomeComponent  implements OnInit{
  

  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    
  }
}
