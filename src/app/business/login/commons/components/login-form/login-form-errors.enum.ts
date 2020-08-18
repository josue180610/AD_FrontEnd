// export enum LoginDocumentErrors {
//   required = 'Éste campo es requerido',
//   pattern = 'El formato permitido es solo números',
//   minlength = 'Debe ingresar 8 dígitos',
//   maxlength = 'Debe ingresar 8 dígitos'
// }

export enum LoginPasswordErrors {
  required = 'Éste campo es requerido',
  minlength = 'Debe contener como mínimo 6 Dígitos'
}
export enum LoginEmailErrors{
  required = 'Éste campo es requerido',
  pattern = 'El formato permitido es solo de un correo',
  minlength= 'El correo es muy corto o no es uno real'
}