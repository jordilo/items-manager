import { async, discardPeriodicTasks, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockedComponentFixture, MockRender } from 'ng-mocks';
import { Item } from '../../store/models/item';
import { StorePagination } from '../../store/models/pagination';
import { FilterItemsComponent } from './filter-items.component';

describe('FilterItemsComponent', () => {
  let component: FilterItemsComponent;
  let fixture: MockedComponentFixture<FilterItemsComponent, { filter: StorePagination<Item>, filterChange: (value) => {} }>;
  const filterChangeSpy = jasmine.createSpy();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterItemsComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = MockRender(FilterItemsComponent, { filter: undefined, filterChange: filterChangeSpy });
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    filterChangeSpy.calls.reset();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when some value has changed after 400 ms then filerChange is called', fakeAsync(() => {
    const expectedFilter = {
      filter: 'text',
      sort: 'asc',
      order: undefined,
      top: 5,
      skip: 0
    };
    component.form.patchValue({ filter: 'text' });
    tick(400);
    expect(filterChangeSpy).toHaveBeenCalled();
    expect(filterChangeSpy).toHaveBeenCalledWith(expectedFilter);
  }));
  it('when some value has changed before 400 ms then filerChange is not called', fakeAsync(() => {
    component.form.patchValue({ filter: 'text' });
    tick(350);
    expect(filterChangeSpy).not.toHaveBeenCalled();
    discardPeriodicTasks();
  }));
  it('when some value has and before 400ms there are other change, then after 400ms filerChange is not called', fakeAsync(() => {
    component.form.patchValue({ filter: 'text' });
    tick(200);
    component.form.patchValue({ filter: 'text 2' });
    tick(450);
    expect(filterChangeSpy).toHaveBeenCalled();
    expect(filterChangeSpy).toHaveBeenCalledTimes(1);
  }));
  it('when change value order then value is splitted and  put in sort and order valued', fakeAsync(() => {
    const expectedFilter = {
      filter: '',
      sort: 'title',
      order: 'desc',
      top: 5,
      skip: 0
    };
    component.form.patchValue({ order: 'title desc' });
    tick(450);
    expect(filterChangeSpy).toHaveBeenCalled();
    expect(filterChangeSpy).toHaveBeenCalledWith(expectedFilter);
  }));
});
