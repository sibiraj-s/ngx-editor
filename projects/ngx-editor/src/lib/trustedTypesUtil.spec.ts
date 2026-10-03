import { parseHTML } from './trustedTypesUtil';

describe('parseHTML', () => {
  it('should parse the HTML in a separate inert document', () => {
    const el = parseHTML('<p>Hello <strong>world</strong></p>');

    expect(el.ownerDocument).not.toBe(document);
    expect(el.ownerDocument.defaultView).toBeNull();
    expect(el.innerHTML).toBe('<p>Hello <strong>world</strong></p>');
  });
});
