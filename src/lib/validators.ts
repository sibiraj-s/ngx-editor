import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Schema} from 'prosemirror-model';

import { parseContent } from './parsers';
import defaultSchema from './schema';

type ValidationErrors = Record<string, any>;

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

function hasValidLength(value: any): boolean {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
}


// @dynamic
export class Validators {

  static required(userSchema?: Schema): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const schema = userSchema || defaultSchema;
      const doc = parseContent(control.value, schema);

      const isEmpty = doc.childCount === 1
        && doc?.firstChild?.isTextblock
        && doc.firstChild.content.size === 0;

      if (!isEmpty) {
        return null;
      }

      return {
        required: true
      };
    };
  }

  static maxLength(maxLength: number, userSchema?: Schema): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const schema = userSchema || defaultSchema;
      const doc = parseContent(control.value, schema);

      const value = doc.textContent;

      if (hasValidLength(value) && value.length > maxLength) {
        return {
          maxlength: {
            requiredLength: maxLength,
            actualLength: value.length
          }
        };
      }

      return null;
    };
  }

  static minLength(minLength: number, userSchema?: Schema): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const schema = userSchema || defaultSchema;
      const doc = parseContent(control.value, schema);

      const value = doc.textContent;

      if (isEmptyInputValue(value) || !hasValidLength(value)) {
        // don't validate empty values to allow optional controls
        // don't validate values without `length` property
        return null;
      }

      if (value.length < minLength) {
        return {
          minlength: {
            requiredLength: minLength, actualLength: value.length
          }
        };
      }

      return null;
    };
  }
}
