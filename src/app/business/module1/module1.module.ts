import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { View1Component } from './views/view1/view1.component';
import { View2Component } from './views/view2/view2.component';
import { View3Component } from './views/view3/view3.component';
import { RouterModule } from '@angular/router';
 
@NgModule({
  declarations: [View1Component, View2Component, View3Component ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "view1",
        component: View1Component
      },
      {
        path: "view2",
        component: View2Component
      },
      {
        path: "view3",
        component: View3Component
      }
    ])
  ]
})
export class Module1Module { }
