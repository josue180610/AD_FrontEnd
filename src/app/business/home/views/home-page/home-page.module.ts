import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { ColabService } from './colab.service';

import { HttpClientModule } from '@angular/common/http';
 
@NgModule({
  declarations: [
    HomePageComponent
  ],
  providers:[ColabService],
  imports: [
    HomePageRoutingModule,
    HttpClientModule
  ]
})
export class HomePageModule {}
