import { StorePagination } from '../store/models/pagination';
import { tap, debounceTime, map } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoadItems, GetItems } from '../store/actions/items.actions';
import { Observable, zip } from 'rxjs';
import { Item } from '../store/models/item';
import { getItems, getItemsCount, getItemsLoading, getItemsLoaded } from '../store/reducers/items.reducers';
import { SortItems } from '../store/models/sort-items';

const initialValues: StorePagination<Item> = {
  filter: '',
  sort: '',
  order: 'asc',
  top: 5,
  skip: 0
};

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'item-manager';

  public items$: Observable<Item[]>;
  public count$: Observable<number>;
  public loading$: Observable<boolean>;

  public form: FormGroup;


  constructor(private store: Store, private fb: FormBuilder) { }

  public ngOnInit() {
    this.store.dispatch(new LoadItems());


    this.loading$ = zip(
      this.store.select(getItemsLoading),
      this.store.select(getItemsLoaded)
    ).pipe(
      map(([loading, loaded]) => !loading && loaded)
    );
  }
}
