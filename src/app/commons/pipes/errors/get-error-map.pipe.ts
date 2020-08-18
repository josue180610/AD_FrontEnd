import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getErrorMap'
})
export class GetErrorMapPipe implements PipeTransform {
  transform(errors: object, mapError: object, showError: boolean = true): string {
    return this.getError(showError, errors, mapError);
  }

  private getError(showError: boolean, errors: Object, mapperError: Object) {
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
