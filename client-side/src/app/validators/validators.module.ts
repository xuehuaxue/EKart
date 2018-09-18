import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** this is the validator for password. It should be between 6-20 characters,
 * contains both uppercase and lowercase letters, as well as a speccial character.
 */

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

export class ValidatorsModule { }
export function pdValidator(password): any {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}$/.test(password.value) ? null : {validPassword: false}
}