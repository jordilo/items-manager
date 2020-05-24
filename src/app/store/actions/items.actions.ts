import { Action } from '@ngrx/store';
import { StorePagination } from '../models/pagination';
import { Item } from '../models/item';

export const LOAD_ITEMS = '[ITEMS] Load all';
export const SAVE_ITEMS = '[ITEMS] Save on store';
export const ERROR_ITEMS = '[ITEMS] Error on get';
export const GET_QUERY_ITEMS = '[ITEMS] Get pagination';
export const ADD_FAVS_ITEMS = '[ITEMS FAVS] Add item';
export const REMOVE_FAVS_ITEMS = '[ITEMS FAVS] Remove item';
export const FILTER_FAVS_ITEMS = '[ITEMS FAVS] Filter items';

export class LoadItems implements Action {
  public readonly type = LOAD_ITEMS;
}
export class SaveItems implements Action {
  public readonly type = SAVE_ITEMS;
  constructor(public payload: Item[]) { }
}
export class ErrorGettingItems implements Action {
  public readonly type = ERROR_ITEMS;
  constructor(public payload: any) { }
}
export class GetItems implements Action {
  public readonly type = GET_QUERY_ITEMS;
  constructor(public payload: StorePagination<Item>) { }
}

export type ItemActions = LoadItems | GetItems | SaveItems | ErrorGettingItems;



