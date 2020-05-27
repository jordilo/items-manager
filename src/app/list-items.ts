import { Observable } from 'rxjs';
import { Item } from '../store/models/item';
import { StorePagination } from '../store/models/pagination';
import { initialState } from '../store/reducers/items.constants';

export abstract class ListItems {
  public items$: Observable<Item[]>;

  public count$: Observable<number>;
  public currentFilter: StorePagination<Item> = { ...initialState.filter };

  public abstract filterChange(filter: StorePagination<Item>);
}
