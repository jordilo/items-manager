import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemActions, LOAD_ITEMS, GET_QUERY_ITEMS, SAVE_ITEMS, ERROR_ITEMS } from '../actions/items.actions';
import { Item } from '../models/item';


export interface ItemState {
  data: Item[];
  loaded: boolean;
  loading: boolean;
  error: string;
}


export const initialState: ItemState = {
  data: [],
  loaded: false,
  loading: false,
  error: undefined
};


export function itemsReducer(state = initialState, action: ItemActions) {
  switch (action.type) {
    case LOAD_ITEMS:
      return { ...state, loading: true };
    case GET_QUERY_ITEMS: {
      return { ...state };
    }
    case SAVE_ITEMS:
      console.log(action);
      const data = action.payload;
      return { ...state, data, loading: false, loaded: true };
    case ERROR_ITEMS:
      return { ...state, loading: false, loaded: true };
    default:
      return state;
  }
}

export const getItemsState = createFeatureSelector<ItemState>('items');
export const getItems = createSelector(getItemsState, (state: ItemState) => state.data);
export const getItemsLoaded = (state: ItemState) => state.loaded;
export const getItemsLoading = (state: ItemState) => state.loading;
export const getItemsError = (state: ItemState) => state.error;
