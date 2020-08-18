import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleConfigService } from 'src/app/services/module-config.service';

@Component({
  selector: 'tdp-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.scss']
})
export class View2Component implements OnInit {
  access:Array<Object> = [];

  constructor(private router: Router, private accessControl:ModuleConfigService) {
    this.access =  accessControl.getAccess(router.url).access ;
    console.log(this.access)
   }

  ngOnInit() {
  }

}
