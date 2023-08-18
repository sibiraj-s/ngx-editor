import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import type { TrustedHTML } from 'trusted-types/lib';
import { HTML, isTrustedHtml } from '../../trustedTypesUtil';

@Pipe({
  name: 'sanitizeHtml',
})

export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: HTML): SafeHtml | TrustedHTML {
    if (isTrustedHtml(value)) {
      return value as TrustedHTML;
    }
    return this.sanitizer.bypassSecurityTrustHtml(value as string);
  }
}
