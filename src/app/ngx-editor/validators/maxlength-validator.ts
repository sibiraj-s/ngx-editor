import { AbstractControl } from '@angular/forms';

interface IMaxLengthValidatorOptions {
  excludeLineBreaks?: boolean;
  concatWhiteSpaces?: boolean;
  excludeWhiteSpaces?: boolean;
}

export function MaxLengthValidator(maxlength: number, options?: IMaxLengthValidatorOptions) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const parsedDocument = new DOMParser().parseFromString(control.value, 'text/html');
    let innerText = parsedDocument.body.innerText || '';

    // replace all linebreaks
    if (options.excludeLineBreaks) {
      innerText = innerText.replace(/(\r\n\t|\n|\r\t)/gm, '');
    }

    // concat multiple whitespaces into a single whitespace
    if (options.concatWhiteSpaces) {
      innerText = innerText.replace(/(\s\s+)/gm, ' ');
    }

    // remove all whitespaces
    if (options.excludeWhiteSpaces) {
      innerText = innerText.replace(/(\s)/gm, '');
    }

    if (innerText.length > maxlength) {
      return {
        ngxEditor: {
          allowedLength: maxlength,
          textLength: innerText.length
        }
      };
    }
    return null;
  };
}
