import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { TDPDirectivesModule } from '@tdp/ng-commons';
import { GetErrorMapModule } from '../../../../../commons/pipes/errors/get-error-map.module';

const DECLARATIONS = [
  LoginFormComponent
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [...DECLARATIONS],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TDPDirectivesModule,
    GetErrorMapModule
  ],
  exports: [...DECLARATIONS]
})
export class LoginFormModule {}
