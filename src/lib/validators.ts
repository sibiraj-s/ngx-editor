import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Schema } from 'prosemirror-model';

import { toDoc } from './html';
import schema from './schema';

// @dynamic
export class Validators {

  static required(customSchema?: Schema): ValidatorFn {
    return (c: AbstractControl) => {

      const userSchema = customSchema || schema;

      const value = c.value;
      if (!value) {
        return null;
      }

      let doc = null;
      if (typeof value === 'string') {
        doc = toDoc(value, userSchema);
      } else {
        doc = value;
      }

      const node = userSchema.nodeFromJSON(doc);

      const isEmpty = node.childCount === 1
        && node?.firstChild?.isTextblock
        && node.firstChild.content.size === 0;

      if (!isEmpty) {
        return null;
      }

      return {
        required: true
      };
    };
  }
}
