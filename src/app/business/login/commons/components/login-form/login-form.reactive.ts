import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class LoginFormReactive {

  loginForm: FormGroup;
  // document: FormControl = new FormControl('', [
  //   Validators.nullValidator,
  //   Validators.required,
  //   Validators.pattern(/^\d+$/),
  //   Validators.minLength(8),
  //   Validators.maxLength(8)
  // ]);

  password: FormControl = new FormControl('', [
    Validators.nullValidator,
    Validators.required,
    Validators.minLength(6)
  ]);

  email: FormControl = new  FormControl('',[
    Validators.required, 
    Validators.nullValidator,Validators.minLength(10),
  	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
  ]);

  constructor() {
    this.loginForm = new FormGroup({
      //document: this.document,
      password: this.password,
      email: this.email
    });
  }

  getError(showError: boolean, errors: Object, mapperError: Object) {
    let error = null;

    if (errors && mapperError && showError) {
      Object.keys(errors).forEach((key) => {
        if (mapperError[key]) {
          error = mapperError[key];
          return;
        }
      });
    }

    return error;
  }
}
