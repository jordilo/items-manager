import { Action } from '@ngrx/store';
import { Item } from '../models/item';
import { StorePagination } from '../models/pagination';

export const LOAD_ITEMS = '[ITEMS] Load all';
export const SAVE_ITEMS = '[ITEMS] Save on store';
export const GET_QUERY_ITEMS = '[ITEMS] Get pagination';
export const SET_ITEM_FAV = '[ITEMS] Set fav status';

export class LoadItems implements Action {
  public readonly type = LOAD_ITEMS;
}
export class SaveItems implements Action {
  public readonly type = SAVE_ITEMS;
  constructor(public payload: Item[]) { }
}
export class SetItem implements Action {
  public readonly type = SET_ITEM_FAV;
  constructor(public payload: Item) { }
}
export class GetItems implements Action {
  public readonly type = GET_QUERY_ITEMS;
  constructor(public payload: StorePagination<Item>) { }
}

export type ItemActions = LoadItems | GetItems | SaveItems | SetItem;



