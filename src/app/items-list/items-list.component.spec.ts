import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockComponent, MockDirective, MockPipe, MockService } from 'ng-mocks';
import {  BehaviorSubject, } from 'rxjs';
import { AddToFavs, RemoveFromFavs } from 'src/store/actions/item-favs.actions';
import { Item } from 'src/store/models/item';
import { StorePagination } from 'src/store/models/pagination';
import { getItemsCount, getItemsCurrentFilter } from 'src/store/reducers/items.reducers';
import { CurrentFilterPositionPipe } from '../current-filter-position.pipe';
import { ScrollDirective } from '../scroll.directive';
import { GetItems } from './../../store/actions/items.actions';
import { itemsGenerator } from './../../store/reducers/items.generator.mock';
import { getItems } from './../../store/reducers/items.reducers';
import { FilterItemsComponent } from './../filter-items/filter-items.component';
import { ItemComponent } from './../item/item.component';
import { ItemsListComponent } from './items-list.component';

const items: Item[] = [
  {
    title: 'iPhone 6S Oro',
    description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
    price: '740',
    email: 'iphonemail@wallapop.com',
    image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
    isFav: false
  },
  {
    title: 'Polaroid 635',
    description: 'Cámara clásica de fotos Polaroid, modelo 635. Las fotos son a super color. Está en perfectas condiciones y es fantástica para coleccionistas. Se necesitan carretes instax 20 para hacer fotos. Tamaño M.',
    price: '50',
    email: 'cameramail@wallapop.com',
    image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png',
    isFav: true
  }
];
describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let dispatchSpy: jasmine.Spy;
  let selectSpy: jasmine.Spy;
  let filterComponent: FilterItemsComponent;
  let scrollDirective: ScrollDirective;

  let itemsSubject: BehaviorSubject<Item[]>;
  let countSubject: BehaviorSubject<number>;
  let filterSubject: BehaviorSubject<StorePagination<Item[]>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemsListComponent,
        MockComponent(FilterItemsComponent),
        MockComponent(ItemComponent),
        MockDirective(ScrollDirective),
        MockPipe(CurrentFilterPositionPipe)
      ],
      providers: [{ provide: Store, useValue: MockService(Store) }]
    }).compileComponents();
  }));

  beforeEach(() => {

    itemsSubject = new BehaviorSubject<Item[]>(items);
    countSubject = new BehaviorSubject<number>(items.length);
    filterSubject = new BehaviorSubject<StorePagination<Item[]>>({ filter: '', order: 'asc', sort: '', skip: 0, top: 5 });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;

    const store = fixture.debugElement.injector.get(Store);
    dispatchSpy = spyOn(store, 'dispatch');
    selectSpy = spyOn(store, 'select').and.callFake((arg: any) => {
      if (arg === getItems) {
        return itemsSubject;
      } else if (arg === getItemsCount) {
        return countSubject;
      } else if (arg === getItemsCurrentFilter) {
        return filterSubject;
      }
    });

    const filterComponentDebug = fixture.debugElement.query(By.directive(FilterItemsComponent));
    filterComponent = (filterComponentDebug.componentInstance) as FilterItemsComponent;


    const scrollDirectiveDebugEl = fixture.debugElement.query(By.directive(ScrollDirective));
    scrollDirective = scrollDirectiveDebugEl.injector.get(ScrollDirective);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when filterChanges is triggered then store dispatch is called with correct action', () => {
    const filter: StorePagination<Item> = { filter: '', order: 'asc', sort: '', skip: 10, top: 15 };
    filterComponent.filterChange.emit(filter);
    expect(component.currentFilter).toEqual(filter);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(new GetItems(filter));
  });

  it('when scrollBottom is reached and there are more items to show then store dispatch is called with filter modified', fakeAsync(() => {
    itemsSubject.next(itemsGenerator(20));
    countSubject.next(20);
    const expectedFilter: StorePagination<Item> = { filter: '', order: 'asc', sort: '', skip: 1, top: 6 };
    scrollDirective.scrollBottomReached.emit();
    tick(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new GetItems(expectedFilter));
  }));
  it('when scrollBottom is reached and there are no more items to show then store dispatch is not called', fakeAsync(() => {
    itemsSubject.next(itemsGenerator(5));
    countSubject.next(5);
    scrollDirective.scrollBottomReached.emit();
    tick(1);
    expect(dispatchSpy).not.toHaveBeenCalled();
  }));
  it('when scrollTop is reached the store dispatch is called with filter modified', fakeAsync(() => {
    itemsSubject.next(itemsGenerator(5));
    countSubject.next(5);
    filterSubject.next({ filter: '', order: 'asc', sort: '', skip: 1, top: 6 });
    const expectedFilter: StorePagination<Item> = { filter: '', order: 'asc', sort: '', skip: 0, top: 5 };
    scrollDirective.scrollTopReached.emit();
    tick(1);
    expect(dispatchSpy).toHaveBeenCalledWith(new GetItems(expectedFilter));
  }));
  it('when scrollTop is reached and skip is 0 then dispath is not called', fakeAsync(() => {
    itemsSubject.next(itemsGenerator(5));
    countSubject.next(5);
    filterSubject.next({ filter: '', order: 'asc', sort: '', skip: 0, top: 6 });
    scrollDirective.scrollTopReached.emit();
    tick(1);
    expect(dispatchSpy).not.toHaveBeenCalled();
  }));

  it('when removeItem is triggered then store dispatch is called with correct action', () => {
    const filterComponentDebug = fixture.debugElement.queryAll(By.directive(ItemComponent));
    const itemComponent = (filterComponentDebug[0].componentInstance) as ItemComponent;
    itemComponent.toggleFav.emit(items[0]);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(new AddToFavs({ ...items[0] } as Item));
  });
  it('when removeItem is triggered then store dispatch is called with correct action', () => {
    const filterComponentDebug = fixture.debugElement.queryAll(By.directive(ItemComponent));
    const itemComponent = (filterComponentDebug[1].componentInstance) as ItemComponent;
    itemComponent.toggleFav.emit({ ...items[1] });
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(new RemoveFromFavs({ ...items[1] } as Item));
  });
});
