import { AbstractControl, ValidatorFn } from '@angular/forms';


export function thetaValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = !(control.value < 1 && control.value > 0);
    return forbidden ? { 'theta': { value: control.value } } : null;
  };
}
