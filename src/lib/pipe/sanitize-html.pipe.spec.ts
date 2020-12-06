import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { SanitizeHtmlPipe } from './sanitize-html.pipe';

describe('SanitizeHtmlPipe', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DomSanitizer,
      ]
    }).compileComponents();
  });

  it('create an instance', () => {
    const sanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SanitizeHtmlPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });

  it('shoudl sanitize html', () => {
    const sanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SanitizeHtmlPipe(sanitizer);
    expect(pipe.transform('<svg></svg>')).toBe('<svg></svg>');
  });
});
