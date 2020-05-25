import { Action } from '@ngrx/store';
import { StorePagination } from '../models/pagination';
import { Item } from '../models/item';

export const ADD_FAVS_ITEMS = '[ITEMS FAVS] Add item';
export const REMOVE_FAVS_ITEMS = '[ITEMS FAVS] Remove item';
export const FILTER_FAVS_ITEMS = '[ITEMS FAVS] Filter items';
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
