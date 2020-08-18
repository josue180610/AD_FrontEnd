import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [RouterModule,CommonModule]
})
export class MenuModule {}
