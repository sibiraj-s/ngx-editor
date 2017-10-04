import { AppPage } from './app.po';

describe('ngx-editor App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('WYSIWYG Editor for Angular Applications.');
  });
});
