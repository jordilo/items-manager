import { initialState } from './../store/reducers/items.constants';
import { GetItems } from './../store/actions/items.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { Item } from '../store/models/item';
import { Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { map, tap, filter, mapTo } from 'rxjs/operators';
import { StorePagination } from '../store/models/pagination';
import { getItems, getItemsCount } from '../store/reducers/items.reducers';
import { ScrollDirective } from '../scroll.directive';
import { AddToFavs } from '../store/actions/item-favs.actions';



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
  public areLoadingItemsTop: boolean;

  public currentFilter: StorePagination<Item> = initialState.filter;

  private itemsLength = 0;
  constructor(private store: Store) { }

  public ngOnInit(): void {


    this.items$ = this.store.select(getItems)
      .pipe(tap(() => this.setLoaders(false, false)));

    this.count$ = this.store.select(getItemsCount).pipe(tap((total) => this.itemsLength = total));


    const scrollBotton$ = this.scroll.scrollBottomReached.pipe(mapTo(true));
    const scrollTop$ = this.scroll.scrollTopReached.pipe(mapTo(false));
    const changeValue = 1;
    merge(scrollBotton$, scrollTop$)
      .pipe(
        map((isBottom) => ({ ...this.currentFilter, isBottom, changeValue })),
        filter((value: StorePaginationScroll) => this.isScrollMovementValid(value)),
        tap(({ isBottom }) => this.setLoaders(!isBottom, isBottom)),
        map((filterValue) => this.setPaginationValues(filterValue)),
      ).subscribe((filterValue) => this.filterChange(filterValue));
  }
  public filterChange(value: StorePagination<Item>) {
    this.currentFilter = value;
    this.store.dispatch(new GetItems(value));
  }
  public addToFav(item: Item) {
    this.store.dispatch(new AddToFavs(item));
  }

  public trackByItem(index: number, item: Item) {
    return item.title;
  }


  private isScrollMovementValid(filterScroll: StorePaginationScroll) {
    if (this.areLoadingItemsBottom || this.areLoadingItemsTop) {
      return false;
    }
    if (filterScroll.isBottom && filterScroll.top < this.itemsLength || !filterScroll.isBottom && filterScroll.skip > 0) {
      return true;
    }

    return false;
  }

  private setPaginationValues(filterValue: StorePaginationScroll) {
    const { isBottom, changeValue } = filterValue;
    let { top, skip } = filterValue;
    const value = isBottom ? changeValue : changeValue * -1;
    if (isBottom) {
      if (top + value > this.itemsLength) {
        top = this.itemsLength;
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
    return { ...filterValue, top, skip };
  }

  private setLoaders(top: boolean, bottom: boolean) {
    this.areLoadingItemsTop = top;
    this.areLoadingItemsBottom = bottom;
  }
}
