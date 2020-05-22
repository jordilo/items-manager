import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadItems } from './store/actions/items.actions';
import { Observable } from 'rxjs';
import { Item } from './store/models/item';
import { getItems } from './store/reducers/items.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'item-manager';

  public items$: Observable<Item[]>;
  constructor(private store: Store) {

  }

  public ngOnInit() {

    this.store.dispatch(new LoadItems());

    this.items$ = this.store.select(getItems);
  }

  public trackByItem(index: number, item: Item) {
    return item.title;
  }
}
