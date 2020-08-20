import { Injectable } from "@angular/core";
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable()
export class coronavirusFormReactive{
    coronavirusForm: FormGroup;
  date1: FormControl = new FormControl();
  date2: FormControl = new FormControl();
  height: FormControl = new FormControl({value:0});
  weight: FormControl = new FormControl({value:0});
  imc: FormControl = new FormControl({value : '', disabled:true});
  codeSelect = [];
  constructor() {
    this.coronavirusForm = new FormGroup({
      //document: this.document,
      date1: this.date1,
      date2: this.date2,
      height: this.height,
      weight: this.weight,
      imc: this.imc,
      codeSelect: new FormControl(this.codeSelect, Validators.required)
    });
  }
}