import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { merge, Observable } from 'rxjs';
import { debounceTime, filter, map, mapTo, share, tap } from 'rxjs/operators';
import { AddToFavs, RemoveFromFavs } from '../../store/actions/item-favs.actions';
import { GetItems } from '../../store/actions/items.actions';
import { Item } from '../../store/models/item';
import { StorePagination } from '../../store/models/pagination';
import { getItemsCurrentFilter } from '../../store/reducers/items.reducers';
import { getItems, getItemsCount } from '../../store/reducers/items.reducers';
import { ListItems } from '../list-items';
import { ScrollDirective } from '../scroll.directive';



interface StorePaginationScroll extends StorePagination<Item> {
  isBottom: boolean;
  changeValue: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent extends ListItems implements OnInit {

  @ViewChild(ScrollDirective, { static: true }) public scroll: ScrollDirective;

  public filter$: Observable<StorePagination<Item>>;

  private itemsLength = 0;
  constructor(private store: Store) {
    super();
  }

  public ngOnInit(): void {
    this.items$ = this.store.select(getItems);
    this.filter$ = this.store.select(getItemsCurrentFilter).pipe(
      share(),
      tap((newFilter) => this.currentFilter = newFilter));
    this.count$ = this.store.select(getItemsCount).pipe(tap((total) => this.itemsLength = total));
    this.handleScrollMovements();
  }


  public filterChange(value: StorePagination<Item>) {
    this.currentFilter.filter = value.filter;
    this.currentFilter.order = value.order;
    this.currentFilter.sort = value.sort;
    this.currentFilter.skip = value.skip;
    this.currentFilter.top = value.top;
    this.store.dispatch(new GetItems(this.currentFilter));
  }
  public toggleFav(item: Item) {
    if (item.isFav) {
      this.store.dispatch(new RemoveFromFavs(item));
    } else {
      this.store.dispatch(new AddToFavs(item));
    }
  }

  public trackByItem(item: Item) {
    return item.title;
  }


  private isScrollMovementValid(filterScroll: StorePaginationScroll) {
    if ((filterScroll.isBottom && filterScroll.top < this.itemsLength) || (!filterScroll.isBottom && filterScroll.skip > 0)) {
      return true;
    }

    return false;
  }

  private setPaginationValues(filterValue: StorePaginationScroll) {
    const { isBottom, changeValue } = filterValue;
    let { top, skip } = filterValue;
    const value = isBottom ? changeValue : changeValue * -1;
    if (isBottom) {
      top += value;
      skip = top - 5;
    } else {
      skip += value;
      top = skip + 5;
    }
    return { ...filterValue, top, skip };
  }

  private handleScrollMovements() {
    const scrollBotton$ = this.scroll.scrollBottomReached.pipe(mapTo(true));
    const scrollTop$ = this.scroll.scrollTopReached.pipe(mapTo(false));
    const changeValue = 1;
    merge(scrollBotton$, scrollTop$)
      .pipe(
        debounceTime(1),
        map((isBottom) => ({ ...this.currentFilter, isBottom, changeValue })),
        tap((d) => {

          console.log(d);
        }),
        filter((value: StorePaginationScroll) => this.isScrollMovementValid(value)),
        map((filterValue) => this.setPaginationValues(filterValue)))
      .subscribe((filterValue) => this.filterChange(filterValue));
  }
}
