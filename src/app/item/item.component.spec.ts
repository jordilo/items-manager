import { CurrencyPipe } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockedComponentFixture, MockComponent, MockPipe, MockRender } from 'ng-mocks';
import { Item } from '../../store/models/item';
import { FavoriteButtonComponent } from './../favorite-button/favorite-button.component';
import { ItemComponent } from './item.component';

const item = {
  title: 'iPhone 6S Oro',
  description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
  price: '740',
  email: 'iphonemail@wallapop.com',
  image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
  isFav: true
};
describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: MockedComponentFixture<ItemComponent, { item: Item, toggleFav: (item: Item) => {} }>;
  let toggleFavSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent, MockComponent(FavoriteButtonComponent), MockPipe(CurrencyPipe)]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    toggleFavSpy = jasmine.createSpy();
    fixture = MockRender(ItemComponent, { item, toggleFav: toggleFavSpy });
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when click on fav button then toggleFav is called', () => {
    const appButton = fixture.debugElement.query(By.directive(FavoriteButtonComponent));
    appButton.nativeElement.click();
    expect(toggleFavSpy).toHaveBeenCalled();
    expect(toggleFavSpy).toHaveBeenCalledWith(item);
  });
});
