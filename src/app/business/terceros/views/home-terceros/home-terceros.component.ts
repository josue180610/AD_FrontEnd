import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tdp-home-terceros',
  templateUrl: './home-terceros.component.html',
  styleUrls: ['./home-terceros.component.scss']
})
export class HomeTercerosComponent implements OnInit {

  constructor(public router:Router) { 
  }
  activePass(){
    this.router.navigate(['/terceros/mypass']);
  }
  generatePass(){
    this.router.navigate(['/terceros/form']);
  }
  symptoms(){
    this.router.navigate(['/terceros/sintomas']);
  }
  ngOnInit() {
  }

}
