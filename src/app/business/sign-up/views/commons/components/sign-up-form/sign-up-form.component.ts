import { Component } from '@angular/core';
import { SignUpFormReactive } from './sign-up-form.reactive';
import {
  SignUpNameError,
  SignUpLastNameError,
  SignUpEmailError,
  SignUpNumberDocumentError,
  SignUpDocumentTypeError
} from './sign-up-form-errors.enum';

@Component({
  selector: 'tdp-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  providers: [SignUpFormReactive]
})
export class SignUpFormComponent {

  signUpNameError = SignUpNameError;
  signUpLastNameError = SignUpLastNameError;
  signUpEmailError = SignUpEmailError;
  signUpNumberDocumentError = SignUpNumberDocumentError;
  signUpDocumentTypeError = SignUpDocumentTypeError;

  showError = false;

  listDocuments: Array<{label: string; value: string}> = [
    {
      label: 'DNI',
      value: '1'
    },
    {
      label: 'RUC',
      value: '2'
    },
    {
      label: 'C. EXTRANJERIA',
      value: '3'
    }
  ];

  constructor(
    public signUpFormReactive: SignUpFormReactive,
  ) {}

  signUp() {
    if (this.signUpFormReactive.signUpForm.invalid) {
      this.showError = true;
      return;
    }
  }

}
