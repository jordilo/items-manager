
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState, itemsReducer, getItems } from './items.reducers';


export interface AppState {
  items: ItemState;
}

export const reducers = {
  items: itemsReducer
};

export const getState = (state) => state;
export const getItemsState = createFeatureSelector<ItemState>('items');
export const getItemsData = createSelector(getItemsState, getItems);
