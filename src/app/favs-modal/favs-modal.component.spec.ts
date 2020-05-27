import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockComponent, MockModule, MockService } from 'ng-mocks';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { FilterItemsFavs, RemoveFromFavs } from '../../store/actions/item-favs.actions';
import { Item } from '../../store/models/item';
import { StorePagination } from '../../store/models/pagination';
import { getFavItems, getFavItemsCount } from '../../store/reducers/items-favs.reducer';
import { FilterItemsComponent } from '../filter-items/filter-items.component';
import { FavoriteButtonComponent } from './../favorite-button/favorite-button.component';
import { FavsModalComponent } from './favs-modal.component';


const items: Item[] = [
  {
    title: 'iPhone 6S Oro',
    description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
    price: '740',
    email: 'iphonemail@wallapop.com',
    image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
    isFav: true
  },
  {
    title: 'Polaroid 635',
    description: 'Cámara clásica de fotos Polaroid, modelo 635. Las fotos son a super color. Está en perfectas condiciones y es fantástica para coleccionistas. Se necesitan carretes instax 20 para hacer fotos. Tamaño M.',
    price: '50',
    email: 'cameramail@wallapop.com',
    image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png',
    isFav: false
  }
];

describe('FavsModalComponent', () => {
  let component: FavsModalComponent;
  let fixture: ComponentFixture<FavsModalComponent>;
  let dispatchSpy: jasmine.Spy;
  let selectSpy: jasmine.Spy;
  let confirmSpy: jasmine.Spy;
  let closeSpy: jasmine.Spy;

  beforeEach(async(() => {
    confirmSpy = spyOn(window, 'confirm');
    TestBed.configureTestingModule({
      declarations: [
        FavsModalComponent,
        MockComponent(FilterItemsComponent),
        MockComponent(FavoriteButtonComponent)],
      imports: [MockModule(ModalModule)],
      providers: [
        { provide: BsModalRef, useValue: MockService(BsModalRef) },
        { provide: Store, useValue: MockService(Store) }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavsModalComponent);
    component = fixture.componentInstance;
    const modal = fixture.debugElement.injector.get(BsModalRef);
    modal.hide = () => { };
    closeSpy = spyOn(modal, 'hide');
    const store = fixture.debugElement.injector.get(Store);
    dispatchSpy = spyOn(store, 'dispatch');
    selectSpy = spyOn(store, 'select').and.callFake((arg: any) => {
      if (arg === getFavItems) {
        return of(items);
      } else if (arg === getFavItemsCount) {
        return of(0);
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when filterChanges is triggered then store dispatch is called with correct action', () => {
    const filter: StorePagination<Item> = { filter: '12', order: 'asc', sort: 'image', skip: 10, top: 15 };
    const filterComponentDebug = fixture.debugElement.query(By.directive(FilterItemsComponent));
    const filterComponent = (filterComponentDebug.componentInstance) as FilterItemsComponent;
    filterComponent.filterChange.emit(filter);
    expect(component.currentFilter).toEqual(filter);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(new FilterItemsFavs(filter));
  });
  it('when removeItem is triggered then store dispatch is called with correct action', () => {
    dispatchSpy.calls.reset();
    confirmSpy.and.returnValue(true);
    const favoriteButtonComponentDebug = fixture.debugElement.queryAll(By.directive(FavoriteButtonComponent));
    (favoriteButtonComponentDebug[0].nativeElement as HTMLButtonElement).click();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(new RemoveFromFavs(items[0] as Item));
  });
  it('when removeItem is triggered then store dispatch is called with correct action', () => {
    dispatchSpy.calls.reset();
    confirmSpy.and.returnValue(false);
    const favoriteButtonComponentDebug = fixture.debugElement.queryAll(By.directive(FavoriteButtonComponent));
    (favoriteButtonComponentDebug[0].nativeElement as HTMLButtonElement).click();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
  it('when click on close modal then activeModal close is called', () => {
    const closeBtn = fixture.nativeElement.querySelector('.t-close-modal-button') as HTMLButtonElement;
    closeBtn.click();
    expect(closeSpy).toHaveBeenCalled();
  });
});
