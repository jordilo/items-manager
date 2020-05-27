import { StorePagination } from '../store/models/pagination';
import { Item } from '../store/models/item';
import { initialState } from '../store/reducers/items.constants';
import { Observable } from 'rxjs';

export abstract class ListItems {
  public items$: Observable<Item[]>;

  public count$: Observable<number>;
  public currentFilter: StorePagination<Item> = initialState.filter;

  public abstract filterChange(filter: StorePagination<Item>);
}
