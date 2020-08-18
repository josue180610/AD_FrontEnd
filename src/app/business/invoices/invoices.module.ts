import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceHomeComponent } from './views/invoice-home/invoice-home.component';
import { DemoMaterialModule  } from '../../commons/modules/material-module';
import { RouterModule } from '@angular/router';
import { TDPDirectivesModule } from '@tdp/ng-commons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { SearchInvoiceComponent } from './views/search-invoice/search-invoice.component';
import { ListInvoiceComponent } from './views/list-invoice/list-invoice.component';
import { InvoiceDateComponent } from './views/invoice-date/invoice-date.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [InvoiceHomeComponent, SearchInvoiceComponent, ListInvoiceComponent, InvoiceDateComponent],
  imports: [
    DemoMaterialModule,
    TDPDirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([ 
      {
        path: "invoice-home",
        component: InvoiceHomeComponent
      },
      {
        path: "search-invoice",
        component: SearchInvoiceComponent
      },
      {
        path: "list-invoice",
        component: ListInvoiceComponent
      },
      {
        path: "invoice-date",
        component: InvoiceDateComponent
      },
    ])
  ]
})
export class InvoicesModule { }
