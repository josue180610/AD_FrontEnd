import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { HttpClientModule } from '@angular/common/http';

 

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    HomeRoutingModule,
    RouterModule
  ]
})
export class HomeModule {}
