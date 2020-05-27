import {
  ErrorGettingItems,
  ERROR_ITEMS,
  GetItems,
  GET_QUERY_ITEMS,
  LoadItems,
  LOAD_ITEMS,
  SaveItems,
  SetItem,
  SAVE_ITEMS,
  SET_ITEM_FAV
} from '.';
import { Item } from '../models/item';
import { initialState } from './../reducers/items.constants';

describe('Items actions', () => {


  const item = { title: 'title' } as Item;

  it('when create LoadItems then type and payload are set properly', () => {
    const action = new LoadItems();
    expect(action.type).toBe(LOAD_ITEMS);
  });
  it('when create SaveItems then type and payload are set properly', () => {
    const action = new SaveItems([item]);
    expect(action.type).toBe(SAVE_ITEMS);
    expect(action.payload).toEqual([item]);
  });
  it('when create SetItem then type and payload are set properly', () => {
    const action = new SetItem(item);
    expect(action.type).toBe(SET_ITEM_FAV);
    expect(action.payload).toEqual(item);
  });
  it('when create ErrorGettingItems then type and payload are set properly', () => {
    const action = new ErrorGettingItems(null);
    expect(action.type).toBe(ERROR_ITEMS);
    expect(action.payload).toEqual(null);
  });
  it('when create GetItems then type and payload are set properly', () => {
    const action = new GetItems(initialState.filter);
    expect(action.type).toBe(GET_QUERY_ITEMS);
    expect(action.payload).toEqual(initialState.filter);
  });
});
