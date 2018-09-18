import { EKartPage } from './app.po';

describe('ekart App', () => {
  let page: EKartPage;

  beforeEach(() => {
    page = new EKartPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
