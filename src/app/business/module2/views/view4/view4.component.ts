import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleConfigService } from 'src/app/services/module-config.service';

@Component({
  selector: 'tdp-view4',
  templateUrl: './view4.component.html',
  styleUrls: ['./view4.component.scss']
})
export class View4Component implements OnInit {
  access:Array<Object> = [];

  constructor(private router: Router, private accessControl:ModuleConfigService) {
    this.access =  accessControl.getAccess(router.url).access ;
    console.log(this.access)
   }

  ngOnInit() {
  }

}
