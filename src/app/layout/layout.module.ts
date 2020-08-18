import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MenuModule } from '../commons/components/menu/menu.module';
import { HeaderModule } from '../commons/components/header/header.module';
import { SubModuleModule } from '../commons/components/sub-module/sub-module.module';

 @NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    RouterModule,
    MenuModule,
    CommonModule,
    HeaderModule,
    SubModuleModule
  ]
})
export class LayoutModule {}
