import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccessTercerosComponent } from './views/access-terceros/access-terceros.component';
import { FormTercerosComponent } from './views/form-terceros/form-terceros.component';
import { HomeTercerosComponent } from './views/home-terceros/home-terceros.component';
import { ModalAccessResultComponent } from './views/modal-access-result/modal-access-result.component';
import { ModalAddGestorTdpComponent } from './views/modal-add-gestor-tdp/modal-add-gestor-tdp.component';
import { ModalMasiveChargeComponent } from './views/modal-masive-charge/modal-masive-charge.component';
import { ModalAsignmanagerComponent } from './views/modal-asignmanager/modal-asignmanager.component';
import { ModalHabilitarComponent } from './views/modal-habilitar/modal-habilitar.component';
import { ModalNewterceroComponent } from './views/modal-newtercero/modal-newtercero.component';
import { ModalQrComponent } from './views/modal-qr/modal-qr.component';
import { ModalQuestionDeleteComponent } from './views/modal-question-delete/modal-question-delete.component';
import { ModalShowGestorTdpComponent } from './views/modal-show-gestor-tdp/modal-show-gestor-tdp.component';
import { ModalSignComponent } from './views/modal-sign/modal-sign.component';
import { MypassComponent } from './views/mypass/mypass.component';
import { ReportPanelTercerosComponent } from './views/report-panel-terceros/report-panel-terceros.component';
import { SymptomsRegisterComponent } from './views/symptoms-register/symptoms-register.component';
import { TdpPanelTercerosComponent } from './views/tdp-panel-terceros/tdp-panel-terceros.component';
import {MatCardModule, MatCard} from '@angular/material/card'; 
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AdminPanelTercerosComponent } from './views/admin-panel-terceros/admin-panel-terceros.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[DatePipe],
  declarations: [AccessTercerosComponent, AdminPanelTercerosComponent, 
    FormTercerosComponent, HomeTercerosComponent, ModalAccessResultComponent,
     ModalAddGestorTdpComponent, ModalAsignmanagerComponent, ModalHabilitarComponent,
      ModalMasiveChargeComponent, ModalNewterceroComponent, ModalQrComponent, ModalQuestionDeleteComponent,
       ModalShowGestorTdpComponent, ModalSignComponent, MypassComponent, ReportPanelTercerosComponent, SymptomsRegisterComponent, 
       TdpPanelTercerosComponent],
  
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    RouterModule.forChild([
      {
        path:"home",
        component:HomeTercerosComponent
      },
      
      {
        path:"empresas",
        component:TdpPanelTercerosComponent
      },
      {
        path:"sintomas",
        component:SymptomsRegisterComponent
      },
      {
        path:"admin",
        component:AdminPanelTercerosComponent
      },
      {
        path:"form",
        component:FormTercerosComponent
      },
      {
        path:"mypass",
        component:MypassComponent
      },
      {
        path:"report",
        component:ReportPanelTercerosComponent
      },
      {
        path:"securiy",
        component:AccessTercerosComponent
      }
    ])
  ]
})
export class TercerosModule { }
