import { Component, OnInit } from '@angular/core';
import { ModuleConfigService } from 'src/app/services/module-config.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'tdp-invoice-home',
  templateUrl: './invoice-home.component.html',
  styleUrls: ['./invoice-home.component.scss']
})
export class InvoiceHomeComponent implements OnInit {
  access:Array<Object> = [];

  constructor(private router: Router, private accessControl:ModuleConfigService) {
    this.access =  accessControl.getAccess(router.url).access ;
    console.log(this.access)
   }

  ngOnInit() {
  }

}
