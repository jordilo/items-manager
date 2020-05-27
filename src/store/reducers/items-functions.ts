import * as _ from 'lodash';
import { Item } from '../models/item';
import { StorePagination } from '../models/pagination';

export function filterItems(items: Item[], storeFilter: StorePagination<Item>): Item[] {
  const { filter, order, sort } = storeFilter;
  const expression = new RegExp(filter, 'gi');
  return _.chain(items)
    .filter((item) => {
      return Boolean(item.title.match(expression) ||
        item.description.match(expression) ||
        item.price.toString().match(expression) ||
        item.email.match(expression));
    })
    .orderBy((filteredItems) => orderByTransformation(filteredItems[sort], sort), [order])
    .value();
}

function orderByTransformation(value: any, sort: keyof Item | ''): string | number {
  if (sort === 'price') {
    return Number(value);
  } else if (typeof value === 'string') {
    return value.toString().toLocaleLowerCase();
  }
  return value;
}
export function paginateItems(items: Item[], skip: number, top: number): Item[] {
  return items.slice(skip, top);
}
