import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { InvoiceProcessComponent } from './views/invoice-process/invoice-process.component'; 
import { RouterModule } from '@angular/router';
 
import { DemoMaterialModule  } from '../../commons/modules/material-module';
 
import { TDPDirectivesModule } from '@tdp/ng-commons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
 


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [InvoiceProcessComponent ],
  imports: [
    DemoMaterialModule,
    TDPDirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, 
    RouterModule.forChild([
      {
        path: "invoice-process",
        component: InvoiceProcessComponent
      }, 
    ])
  ]
})
export class InvoiceAdminModule { }
