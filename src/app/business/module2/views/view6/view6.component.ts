import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleConfigService } from 'src/app/services/module-config.service';

@Component({
  selector: 'tdp-view6',
  templateUrl: './view6.component.html',
  styleUrls: ['./view6.component.scss']
})
export class View6Component implements OnInit {
  access:Array<Object> = [];

  constructor(private router: Router, private accessControl:ModuleConfigService) {
    this.access =  accessControl.getAccess(router.url).access ;
    console.log(this.access)
   }

  ngOnInit() {
  }

}
