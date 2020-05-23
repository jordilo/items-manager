import { StorePagination } from './../models/pagination.d';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { ItemActions, LOAD_ITEMS, GET_QUERY_ITEMS, SAVE_ITEMS, ERROR_ITEMS } from '../actions/items.actions';
import { Item } from '../models/item';


export interface ItemState {
  data: Item[];
  filteredItems: Item[];
  loaded: boolean;
  loading: boolean;
  error: string;
  filter: StorePagination<Item>;
}


export const initialState: ItemState = {
  data: [],
  filteredItems: [],
  loaded: false,
  loading: false,
  error: undefined,
  filter: {
    filter: '',
    sort: 'title',
    order: 'asc',
    top: 5,
    skip: 0
  }
};


export function itemsReducer(state = initialState, action: ItemActions) {
  switch (action.type) {
    case LOAD_ITEMS:
      return { ...state, loading: true };
    case GET_QUERY_ITEMS: {
      const filter = action.payload;
      const filteredItems = filterItems(state.data, filter);
      return { ...state, filteredItems, filter };
    }
    case SAVE_ITEMS: {
      const data = action.payload;
      const filteredItems = data;
      return { ...state, data, filteredItems, loading: false, loaded: true };
    }
    case ERROR_ITEMS:
      return { ...state, loading: false, loaded: true };
    default:
      return state;
  }
}

export const getItemsState = createFeatureSelector<ItemState>('items');
export const getItems = createSelector(getItemsState,
  ({ filteredItems, filter }: ItemState) => paginateItems(filteredItems, filter.skip, filter.top));
export const getItemsCount = createSelector(getItemsState, ({ filteredItems }) => filteredItems.length);
export const getItemsLoaded = createSelector(getItemsState, ({ loaded }: ItemState) => loaded);
export const getItemsLoading = createSelector(getItemsState, ({ loading }: ItemState) => loading);
export const getItemsError = createSelector(getItemsState, ({ error }: ItemState) => error);


function filterItems(items: Item[], storeFilter: StorePagination<Item>) {
  const { filter, order, sort } = storeFilter;
  const expression = new RegExp(filter, 'gi');
  return _.chain(items)
    .filter((item) => {
      return Boolean(item.title.match(expression) ||
        item.description.match(expression) ||
        item.price.match(expression) ||
        item.email.match(expression));
    })
    .orderBy([sort], [order])
    .value();
}
function paginateItems(items: Item[], skip: number, top: number) {
  return items.slice(skip, top);
}
