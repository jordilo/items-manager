import * as _ from 'lodash';
import { AddToFavs } from '../actions/item-favs.actions';
import { FilterItemsFavs, RemoveFromFavs } from './../actions/item-favs.actions';
import { Item } from './../models/item.d';
import { StorePagination } from './../models/pagination.d';
import { getFavItems, getFavItemsCount, itemsFavsReducer } from './items-favs.reducer';
import { initialState, ItemState } from './items.constants';
import { itemsGenerator } from './items.generator.mock';

describe('Item favs reducer', () => {

  let state: ItemState;

  beforeEach(() => {
    state = _.clone({ ...initialState });
  });
  it('when itemsFavsReducer without state then gets default state ', () => {
    const newState = itemsFavsReducer(undefined, { type: 'no type', payload: undefined } as any);
    expect(newState).toEqual(state);
  });
  it('when itemsFavsReducer with an unknown action then return state ', () => {
    const newState = itemsFavsReducer(state, { type: 'no type', payload: undefined } as any);
    expect(newState).toEqual(state);
  });
  it('when itemsFavsReducer with Add Fav items action then state returnes should be different than passed ', () => {
    const item = { title: 'test item' } as Item;
    const newState = itemsFavsReducer(state, new AddToFavs(item));
    expect(newState).not.toEqual(state);
  });
  it('when itemsFavsReducer with Add Fav items action then state is updated ', () => {
    const item = { title: 'test item' } as Item;
    const newState = itemsFavsReducer(state, new AddToFavs(item));
    expect(newState.data).toEqual([item]);
    expect(newState.filteredItems).toEqual([item]);
  });
  it('when itemsFavsReducer with FiletrItems items action then state is updated ', () => {
    const item = { title: 'test item 2', description: '', email: '', price: '' } as Item;
    const item2 = { title: 'test item', description: '', email: '', price: '' } as Item;
    state = itemsFavsReducer(state, new AddToFavs(item));
    state = itemsFavsReducer(state, new AddToFavs(item2));
    const filter = { filter: '2', sort: '', order: 'asc', skip: 0, top: 5 } as StorePagination<Item>;
    const newState = itemsFavsReducer(state, new FilterItemsFavs(filter));
    expect(newState.data).toEqual([item, item2]);
    expect(newState.filteredItems).toEqual([item]);
    expect(newState.filter).toEqual(filter);
  });
  it('when itemsFavsReducer with FilterItemsFavs action then state returnes should be different than passed ', () => {
    const filter = { filter: '2', sort: '', order: 'asc', skip: 0, top: 5 } as StorePagination<Item>;
    const newState = itemsFavsReducer(state, new FilterItemsFavs(filter));
    expect(newState).not.toEqual(state);
  });
  it('when itemsFavsReducer with remove favs items action then state is updated ', () => {
    const item = { title: 'test item 2' } as Item;
    const item2 = { title: 'test item' } as Item;
    state = itemsFavsReducer(state, new AddToFavs(item));
    state = itemsFavsReducer(state, new AddToFavs(item2));
    const newState = itemsFavsReducer(state, new RemoveFromFavs(item));
    expect(newState.data).toEqual([item2]);
    expect(newState.filteredItems).toEqual([item2]);
  });
  it('when itemsFavsReducer with RemoveFromFavs action then state returnes should be different than passed ', () => {
    const item = { title: 'test item 2' } as Item;
    state = itemsFavsReducer(state, new AddToFavs(item));
    const newState = itemsFavsReducer(state, new RemoveFromFavs(item));
    expect(newState).not.toEqual(state);
  });
  describe('getItems Selector', () => {
    let getItemsState;
    beforeEach(() => {
      const filteredItems = itemsGenerator(20);
      getItemsState = _.clone({ ...initialState, data: filteredItems, filteredItems });

    });
    it('when skip and top then return the correct positions', () => {
      const result = getFavItems({ favs: getItemsState });
      expect(result.length).toBe(5);
    });
  });
  describe('getFavItemsCount Selector', () => {
    let getItemsState;
    beforeEach(() => {
      const filteredItems = itemsGenerator(20);
      getItemsState = _.clone({ ...initialState, data: filteredItems, filteredItems });

    });
    it('when skip and top then return the correct positions', () => {
      const result = getFavItemsCount({ favs: getItemsState });
      expect(result).toBe(20);
    });
  });
});
