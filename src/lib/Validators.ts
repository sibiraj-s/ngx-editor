import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Schema } from 'prosemirror-model';

import schema from './schema';

export class Validators {

  static required(customSchema?: Schema): ValidatorFn {
    return (c: AbstractControl) => {

      const userSchema = customSchema || schema;

      if (!c.value) {
        return null;
      }

      const node = userSchema.nodeFromJSON(c.value);

      const isEmpty = node.childCount === 1
        && node?.firstChild?.isTextblock
        && node.firstChild.content.size === 0;

      return {
        required: isEmpty
      };
    };
  }
}
