import { Item } from '../models/item';
import { StorePagination } from './../models/pagination.d';
import { filterItems } from './../reducers/items-functions';
import { paginateItems } from './items-functions';
import { itemsGenerator } from './items.generator.mock';


describe('Item function', () => {
  let items: Item[];
  beforeEach(() => {
    items = itemsGenerator(50);
  });
  it('when call paginateItems then list returned is sliced', () => {
    const result = paginateItems(items, 2, 5);
    expect(result[0]).toEqual(items[2]);
  });
  it('when filter some text in UPPERCASE then returns value regarding insensitive mode', () => {
    const filter: StorePagination<Item> = { filter: 'PRICE', order: 'asc', sort: 'title', skip: 0, top: 0 };
    const result = filterItems(items, filter);
    expect(result.length).toBe(50);
  });
  it('when filter is sorted by price then value parsed to number', () => {
    const filter: StorePagination<Item> = { filter: 'PRICE', order: 'asc', sort: 'price', skip: 0, top: 0 };
    const result = filterItems(items, filter);
    expect(result.length).toBe(50);
    for (let i = 0; i < 50; i++) {
      expect(result[i]).toEqual(items[i]);
    }
  });
  it('when filter is sorted by desc then result is sorted properly', () => {
    const filter: StorePagination<Item> = { filter: 'PRICE', order: 'desc', sort: 'price', skip: 0, top: 0 };
    const result = filterItems(items, filter);
    expect(result.length).toBe(50);
    for (let i = 0; i < 50; i++) {
      expect(result[i]).toEqual(items[49 - i]);
    }
  });
  it('when filter items then returns result properly', () => {
    const filter: StorePagination<Item> = { filter: '2price', order: 'asc', sort: '', skip: 0, top: 0 };
    const result = filterItems(items, filter);
    expect(result.length).toBe(5);
    const expectedItems = [1, 11, 21, 31, 41];
    expectedItems.forEach((position, index) => {
      expect(result[index]).toEqual(items[position]);
    });
  });
});
