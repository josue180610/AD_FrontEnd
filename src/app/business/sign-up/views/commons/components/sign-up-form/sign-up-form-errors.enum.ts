export enum SignUpNameError {
  required = 'El campo es requerido'
}

export enum SignUpLastNameError {
  required = 'El campo es requerido'
}

export enum SignUpEmailError {
  required = 'El campo es requerido',
  email = 'Formato invalido'
}

export enum SignUpNumberDocumentError {
  required = 'El campo es requerido',
  pattern = 'Ingrese solo números',
  minlength = 'Ingrese solo 8 dígitos',
  maxlength = 'Ingrese solo 8 dígitos',
}

export enum SignUpDocumentTypeError {
  required = 'El campo es requerido'
}
