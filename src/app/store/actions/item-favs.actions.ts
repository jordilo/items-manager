import { Action } from '@ngrx/store';
import { StorePagination } from '../models/pagination';
import { Item } from '../models/item';
import { ADD_FAVS_ITEMS, REMOVE_FAVS_ITEMS, FILTER_FAVS_ITEMS } from './items.actions';
export class AddToFavs implements Action {
  public readonly type = ADD_FAVS_ITEMS;
  constructor(public payload: Item) { }
}
export class RemoveFromFavs implements Action {
  public readonly type = REMOVE_FAVS_ITEMS;
  constructor(public payload: Item) { }
}
export class FilterItemsFavs implements Action {
  public readonly type = FILTER_FAVS_ITEMS;
  constructor(public payload: StorePagination<Item>) { }
}
export type ItemFavsAction = AddToFavs | RemoveFromFavs | FilterItemsFavs;
