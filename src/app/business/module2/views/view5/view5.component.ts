import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleConfigService } from 'src/app/services/module-config.service';

@Component({
  selector: 'tdp-view5',
  templateUrl: './view5.component.html',
  styleUrls: ['./view5.component.scss']
})
export class View5Component implements OnInit {
  access:Array<Object> = [];

  constructor(private router: Router, private accessControl:ModuleConfigService) {
    this.access =  accessControl.getAccess(router.url).access ;
    console.log(this.access)
   }

  ngOnInit() {
  }

}
