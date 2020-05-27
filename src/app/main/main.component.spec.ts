import { async, TestBed } from '@angular/core/testing';
import { MockedComponentFixture, MockComponent, MockRender } from 'ng-mocks';
import { HeaderComponent } from './../header/header.component';
import { ItemsListComponent } from './../items-list/items-list.component';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: MockedComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, MockComponent(ItemsListComponent), MockComponent(HeaderComponent)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = MockRender(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
