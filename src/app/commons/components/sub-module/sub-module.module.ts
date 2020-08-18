import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubModuleComponent } from './sub-module.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [SubModuleComponent],
  exports: [SubModuleComponent],
  imports: [CommonModule, RouterModule]
})
export class SubModuleModule { }  