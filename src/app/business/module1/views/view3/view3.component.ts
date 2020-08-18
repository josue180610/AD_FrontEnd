import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleConfigService } from 'src/app/services/module-config.service';

@Component({
  selector: 'tdp-view3',
  templateUrl: './view3.component.html',
  styleUrls: ['./view3.component.scss']
})
export class View3Component implements OnInit {
  access:Array<Object> = [];

  constructor(private router: Router, private accessControl:ModuleConfigService) {
    this.access =  accessControl.getAccess(router.url).access ;
    console.log(this.access)
   }

  ngOnInit() {
  }

}
