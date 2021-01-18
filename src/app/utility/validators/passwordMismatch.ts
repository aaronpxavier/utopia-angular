import {AbstractControl, ValidationErrors} from '@angular/forms';

export const passwordMismatch = (abstractControl: AbstractControl): ValidationErrors | null => {
  const password = abstractControl.get('password');
  const confirmPassword = abstractControl.get('confirmPassword');

  if (password.value && password.value === confirmPassword.value) {
    confirmPassword.setErrors(null);
    return null;
  } else if (password.value) {
    confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
    return { passwordMismatch: true };
  }
  return null;
};
