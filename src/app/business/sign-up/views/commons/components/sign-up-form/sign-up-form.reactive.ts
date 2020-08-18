import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class SignUpFormReactive {
  signUpForm: FormGroup;

  name = new FormControl('', [
    Validators.required,
    Validators.nullValidator
  ]);

  lastName = new FormControl('', [
    Validators.required,
    Validators.nullValidator
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.email
  ]);

  documentType = new FormControl('', [
    Validators.required
  ]);

  numberDocument = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.pattern(/^\d+$/),
    Validators.minLength(8),
    Validators.maxLength(8)
  ]);

  statusUser = new FormControl(false);

  constructor() {
    this.signUpForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      documentType: this.documentType,
      numberDocument: this.numberDocument,
      statusUser: this.statusUser
    });
  }

  clearForm() {
    this.signUpForm.reset();
  }
}
