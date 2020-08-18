import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SignUpFormComponent } from './sign-up-form.component';
import { TDPDirectivesModule } from '@tdp/ng-commons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetErrorMapModule } from '../../../../../../commons/pipes/errors/get-error-map.module';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [
    SignUpFormComponent
  ],
  exports: [
    SignUpFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TDPDirectivesModule,
    GetErrorMapModule
  ]
})
export class SignUpFormModule {}
