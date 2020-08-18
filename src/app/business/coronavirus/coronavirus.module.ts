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
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [DatePipe],
  declarations: [CoronavirusAdminComponent,CoronavirusCheckingComponent,CoronavirusFormComponent],
  imports: [
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
      }
    ])
  ]
})
export class CoronavirusModule { }
