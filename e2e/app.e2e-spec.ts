import { ReactiveExtremePage } from './app.po';

describe('reactive-extreme App', function() {
  let page: ReactiveExtremePage;

  beforeEach(() => {
    page = new ReactiveExtremePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
