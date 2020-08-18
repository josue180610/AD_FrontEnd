import { NgModule } from '@angular/core';
import { SignUpPageComponent } from './sign-up-page.component';
import { SignUpPageRoutingModule } from './sign-up-page-routing.module';
import { SignUpFormModule } from '../commons/components/sign-up-form/sign-up-form.module';

@NgModule({
  declarations: [
    SignUpPageComponent
  ],
  imports: [
    SignUpPageRoutingModule,
    SignUpFormModule
  ]
})
export class SignUpPageModule {}
