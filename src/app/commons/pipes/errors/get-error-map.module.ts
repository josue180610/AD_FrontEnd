import { NgModule } from '@angular/core';
import { GetErrorMapPipe } from './get-error-map.pipe';

@NgModule({
  declarations: [
    GetErrorMapPipe
  ],
  exports: [
    GetErrorMapPipe
  ]
})
export class GetErrorMapModule {}
