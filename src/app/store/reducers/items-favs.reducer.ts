import { StorePagination } from './../models/pagination.d';
import { ADD_FAVS_ITEMS, REMOVE_FAVS_ITEMS, FILTER_FAVS_ITEMS } from '../actions/items.actions';
import { ItemFavsAction } from '../actions/item-favs.actions';
import { initialState, ItemState } from './items.constants';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { paginateItems, filterItems } from './items-functions';
import { Item } from '../models/item';

export function itemsFavsReducer(state = initialState, action: ItemFavsAction) {

  switch (action.type) {
    case ADD_FAVS_ITEMS: {
      const data = [...state.data, action.payload];
      const filter = state.filter;
      const filteredItems = filterItems(data, filter);
      return { ...state, data, filteredItems };
    }
    case FILTER_FAVS_ITEMS: {
      const filter = action.payload as StorePagination<Item>;
      const filteredItems = filterItems(state.data, filter);
      return { ...state, filteredItems, filter };
    }
    case REMOVE_FAVS_ITEMS: {
      const data = state.data.filter((item) => item.title !== action.payload.title);
      const filter = state.filter;
      const filteredItems = filterItems(data, filter);
      return { ...state, data, filteredItems };
    }
    default:
      return state;
  }
}


const getFavItemsState = createFeatureSelector<ItemState>('favs');
export const getFavItems = createSelector(getFavItemsState,
  ({ filteredItems, filter }: ItemState) => paginateItems(filteredItems, filter.skip, filter.top));
export const getFavItemsCount = createSelector(getFavItemsState, ({ filteredItems }) => filteredItems.length);



