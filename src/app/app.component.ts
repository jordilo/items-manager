import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { zip, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadItems } from '../store/actions/items.actions';
import { Item } from '../store/models/item';
import { getItemsLoaded, getItemsLoading } from '../store/reducers/items.reducers';


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

  constructor(private store: Store) { }

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
