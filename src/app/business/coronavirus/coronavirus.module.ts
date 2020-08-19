import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoronavirusFormComponent } from './views/coronavirus-form/coronavirus-form.component';
import { CoronavirusAdminComponent } from './views/coronavirus-admin/coronavirus-admin.component';
import { CoronavirusCheckingComponent } from './views/coronavirus-checking/coronavirus-checking.component';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { CoronavirusTeamComponent } from './views/coronavirus-team/coronavirus-team.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ModalCoronavirusRelationshipComponent } from './views/modal-coronavirus-relationship/modal-coronavirus-relationship.component';
import { ModalCoronavirusReportComponent } from './views/modal-coronavirus-report/modal-coronavirus-report.component';
import { ModalCoronavirusSympComponent } from './views/modal-coronavirus-symp/modal-coronavirus-symp.component';
import {MatIconModule} from '@angular/material/icon'; 
import { LoaderComponent } from '../../../app/commons/components/loader/loader.component';
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [DatePipe,LoaderComponent],
  entryComponents: [ModalCoronavirusRelationshipComponent,ModalCoronavirusReportComponent,ModalCoronavirusSympComponent],
  declarations: [CoronavirusAdminComponent,CoronavirusCheckingComponent,CoronavirusFormComponent,CoronavirusTeamComponent,
    ModalCoronavirusRelationshipComponent,ModalCoronavirusReportComponent,ModalCoronavirusSympComponent],
  imports: [
    MatIconModule,
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
        path:"coronaHome",
        component:CoronavirusFormComponent
      },
      {
        path:"coronaAdmin",
        component:CoronavirusAdminComponent
      },
      {
        path:"coronaChecking",
        component:CoronavirusCheckingComponent
      },
      {
        path:"coronaTeam",
        component:CoronavirusTeamComponent
      }
    ])
  ]
})
export class CoronavirusModule { }
