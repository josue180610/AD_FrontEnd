import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    SignUpRoutingModule
  ]
})
export class SignUpModule {}
