import * as _ from 'lodash';
import { GetItems, LoadItems } from '../actions';
import { Item } from '../models/item';
import { StorePagination } from '../models/pagination';
import { SaveItems, SetItem } from './../actions/items.actions';
import { filterItems } from './items-functions';
import { initialState, ItemState } from './items.constants';
import { itemsGenerator } from './items.generator.mock';
import { getItems, getItemsCount, getItemsCurrentFilter, getItemsLoaded, getItemsLoading, getItemsState, itemsReducer } from './items.reducers';

describe('Items reducers', () => {
  let state: ItemState;

  beforeEach(() => {
    state = _.clone({ ...initialState });
  });

  describe('items reducer', () => {
    it('when itemsReducer without state then gets default state ', () => {
      const newState = itemsReducer(undefined, { type: 'no type', payload: undefined } as any);
      expect(newState).toEqual(state);
    });
    it('when itemsReducer with an unknown action then return state ', () => {
      const newState = itemsReducer(state, { type: 'no type', payload: undefined } as any);
      expect(newState).toEqual(state);
    });
    it('when itemsReducer with an unknown action then return state ', () => {
      const newState = itemsReducer(state, new LoadItems());
      expect(newState.loading).toEqual(true);
    });
    it('when itemsReducer with an unknown action then return state ', () => {
      const items = itemsGenerator(10);
      const newState = itemsReducer(state, new SaveItems(items));
      expect(newState.data).toEqual(items);
      expect(newState.filteredItems).toEqual(items);
    });
    it('when itemsReducer with an unknown action then return state ', () => {
      const items = itemsGenerator(1);
      state = itemsReducer(state, new SaveItems(items));
      const newState = itemsReducer(state, new SetItem({ ...items[0], isFav: true }));
      expect(newState.data[0].isFav).toEqual(true);
      expect(newState.filteredItems[0].isFav).toEqual(true);
    });
    it('when GetItems then values are filtered', () => {
      const items = itemsGenerator(10);
      state = itemsReducer(state, new SaveItems(items));
      const filter = { filter: '2', sort: '', order: 'asc', skip: 0, top: 5 } as StorePagination<Item>;
      const newState = itemsReducer(state, new GetItems(filter));
      expect(newState.filteredItems.length).toEqual(1);
    });
  });
  describe('items selectors', () => {
    let itemsState;
    beforeEach(() => {
      const data = itemsGenerator(20);
      itemsState = _.clone({ ...initialState, data, filteredItems: data });

    });
    it('when skip and top then return the correct positions', () => {
      const result = getItemsState({ items: itemsState });
      expect(result).toBe(itemsState);
    });
    it('when getItems  then return data length', () => {
      const result = getItems({ items: itemsState });
      expect(result.length).toBe(5);
    });
    it('when getItemsCount then return filteredItems length', () => {
      const result = getItemsCount({ items: itemsState });
      expect(result).toBe(20);
    });
    it('when getItemsLoading then return state loaded', () => {
      const result = getItemsLoaded({ items: { ...itemsState, loaded: false } as ItemState });
      expect(result).toBe(false);
    });
    it('when getItemsLoading then return state loaded', () => {
      const result = getItemsLoaded({ items: { ...itemsState, loaded: true } as ItemState });
      expect(result).toBe(true);
    });
    it('when getItemsLoading then return state loading', () => {
      const result = getItemsLoading({ items: { ...itemsState, loading: true } as ItemState });
      expect(result).toBe(true);
    });
    it('when getItemsLoading then return state loading', () => {
      const result = getItemsLoading({ items: { ...itemsState, loading: false } as ItemState });
      expect(result).toBe(false);
    });
    it('when getItemsCurrentFilter then return tstate filter', () => {
      const result = getItemsCurrentFilter({ items: { ...itemsState } });
      expect(result).toBe(itemsState.filter);
    });
  });
});
