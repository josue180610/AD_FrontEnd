import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { View4Component } from './views/view4/view4.component';
import { View5Component } from './views/view5/view5.component';
import { View6Component } from './views/view6/view6.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [View4Component, View5Component, View6Component],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "view4",
        component: View4Component
      },
      {
        path: "view5",
        component: View5Component
      },
      {
        path: "view6",
        component: View6Component
      }
    ])
  ]
})
export class Module2Module { }
