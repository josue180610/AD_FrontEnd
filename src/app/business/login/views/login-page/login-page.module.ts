import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { LoginFormModule } from '../../commons/components/login-form/login-form.module';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    LoginPageRoutingModule,
    LoginFormModule
  ]
})
export class LoginPageModule {
}
