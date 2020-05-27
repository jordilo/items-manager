import { async, TestBed } from '@angular/core/testing';
import { MockedComponentFixture, MockHelper, MockRender } from 'ng-mocks';
import { FavoriteButtonComponent } from './favorite-button.component';

describe('FavoriteButtonComponent', () => {
  let component: FavoriteButtonComponent;
  let fixture: MockedComponentFixture<FavoriteButtonComponent, { isFav: boolean }>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = MockRender(FavoriteButtonComponent, { isFav: true });
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when isFav is true then favorite icon is displayed', () => {
    const element = fixture.nativeElement;
    expect(element.querySelector('.t-no-favorite')).toBeNull();
    MockHelper.findOrFail(fixture.debugElement, '.t-favorite');
  });
  it('when isFav is false then favorite icon is not displayed', () => {
    fixture.componentInstance.isFav = false;
    fixture.detectChanges();
    const element = fixture.point.nativeElement;
    expect(element.querySelector('.t-favorite')).toBeNull();
    MockHelper.findOrFail(fixture.debugElement, '.t-no-favorite');
  });
});
