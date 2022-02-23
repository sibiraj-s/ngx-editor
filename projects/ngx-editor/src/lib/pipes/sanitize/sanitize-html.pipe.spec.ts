import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { SanitizeHtmlPipe } from './sanitize-html.pipe';

describe('SanitizeHtmlPipe', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BrowserModule,
      ],
    }).compileComponents();
  });

  it('create an instance', () => {
    const sanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SanitizeHtmlPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });

  it('should sanitize html', () => {
    const sanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SanitizeHtmlPipe(sanitizer);

    const html = '<svg></svg>';
    const result = pipe.transform(html);
    const expected = sanitizer.bypassSecurityTrustHtml(html);
    expect(result).toEqual(expected);
  });
});
