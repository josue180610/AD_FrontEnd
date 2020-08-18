import { Component, OnInit } from '@angular/core';
import { ModuleConfigService } from 'src/app/services/module-config.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'tdp-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.scss']
})
export class View1Component implements OnInit {
  access:Array<Object> = [];

  constructor(private router: Router, private accessControl:ModuleConfigService) {
    this.access =  accessControl.getAccess(router.url).access ;
    console.log(this.access)
   }

  ngOnInit() {
  }

}
