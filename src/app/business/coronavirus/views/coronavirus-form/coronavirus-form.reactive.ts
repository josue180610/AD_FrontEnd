import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class CoronaFormReactive{
    coronavirusForm: FormGroup;
    date1:FormControl = new FormControl();
    date2:FormControl = new FormControl();
    height:FormControl = new FormControl();
    weight:FormControl = new FormControl();
    imc:FormControl = new FormControl();

    constructor() {
        this.coronavirusForm = new FormGroup({
          //document: this.document,
          date1:this.date1,
          date2:this.date2,
          height:this.height,
          weight:this.weight,
          imc:this.imc
        });
      }
}