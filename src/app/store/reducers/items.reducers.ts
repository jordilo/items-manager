import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { ItemActions, LOAD_ITEMS, GET_QUERY_ITEMS, SAVE_ITEMS, ERROR_ITEMS } from '../actions/items.actions';
import { paginateItems, filterItems } from './items-functions';
import { initialState, ItemState } from './items.constants';

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
