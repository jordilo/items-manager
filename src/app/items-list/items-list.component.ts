import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, combineLatest, merge, pipe } from 'rxjs';
import { Item } from '../store/models/item';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, tap, filter, switchMap, mapTo } from 'rxjs/operators';
import { StorePagination } from '../store/models/pagination';
import { GetItems } from '../store/actions';
import { getItems, getItemsCount } from '../store/reducers/items.reducers';
import { SortItems } from '../store/models/sort-items';
import { ScrollDirective } from '../scroll.directive';

const initialValues: StorePagination<Item> = {
  filter: '',
  sort: '',
  order: 'asc',
  top: 5,
  skip: 0
};

interface StorePaginationScroll extends StorePagination<Item> {
  isBottom: boolean;
  changeValue: number;
}

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  @ViewChild(ScrollDirective, { static: true }) public scroll: ScrollDirective;
  public items$: Observable<Item[]>;
  public count$: Observable<number>;

  public areLoadingItemsBottom: boolean;
  public form: FormGroup;

  public orderFields = [
    { value: SortItems.EMAIL_ASC, text: 'email asc' },
    { value: SortItems.EMAIL_DESC, text: 'email desc' },
    { value: SortItems.PRICE_ASC, text: 'price asc' },
    { value: SortItems.PRICE_DESC, text: 'price desc' },
    { value: SortItems.NAME_ASC, text: 'title asc' },
    { value: SortItems.NAME_DESC, text: 'title desc' },
    { value: SortItems.DESCRIPTION_ASC, text: 'description asc' },
    { value: SortItems.DESCRIPTION_DESC, text: 'description desc' },
    { value: SortItems.NO_SORT, text: 'None' }];
  constructor(private store: Store, private fb: FormBuilder) { }

  public ngOnInit(): void {

    this.form = this.fb.group(initialValues);
    this.form.valueChanges.
      pipe(
        debounceTime(400),
        map((value: StorePagination<Item>) => {
          console.log(value.skip);
          if (value.order) {
            const splittedOrder = value.order.split(' ');
            value.sort = splittedOrder[0] as keyof Item;
            value.order = splittedOrder[1] as 'asc' | 'desc';
          }
          return value;
        }),
        tap((value: StorePagination<Item>) => {
          this.store.dispatch(new GetItems(value));
        })).subscribe();


    this.items$ = this.store.select(getItems).pipe(tap((d) => this.areLoadingItemsBottom = false));
    this.count$ = this.store.select(getItemsCount);
    const scrollBotton$ = this.scroll.scrollBottomReached.pipe(mapTo(true));
    const scrollTop$ = this.scroll.scrollTopReached.pipe(mapTo(false));
    const changeValue = 1;
    merge(scrollBotton$, scrollTop$)
      .pipe(
        map((isBottom) => ({ ...this.form.value, isBottom, changeValue })),
        filter((value: StorePaginationScroll) => this.isScrollMovementValid(value)),
        map((value) => this.setPaginationValues(value)),
        tap(({ top, skip }) => this.form.patchValue({ top, skip })),
        tap(() => this.areLoadingItemsBottom = true),
      ).subscribe();
  }

  public trackByItem(index: number, item: Item) {
    return item.title;
  }

  private isScrollMovementValid(filterScroll: StorePaginationScroll) {
    if (this.areLoadingItemsBottom) {
      return false;
    }
    if (filterScroll.isBottom && filterScroll.top < 20 || !filterScroll.isBottom && filterScroll.skip > 0) {
      return true;
    }

    return false;
  }

  private setPaginationValues({ top, skip, isBottom, changeValue }: StorePaginationScroll) {
    const value = isBottom ? changeValue : changeValue * -1;
    if (isBottom) {
      if (top + value > 20) {
        top = 20;
      } else {
        top += value;
      }
      skip = top - 5;
    } else {
      if (skip + value >= 0) {
        skip += value;
      } else {
        skip = 0;
      }
      top = skip + 5;
    }
    console.log(top, skip, value);
    return { top, skip };
  }
}
