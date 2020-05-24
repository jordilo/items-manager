import { Item } from '../models/item';
import { StorePagination } from '../models/pagination';
import * as _ from 'lodash';

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
    .orderBy((filteredItems) => orderByTransformation(filteredItems[sort]), [order])
    .value();
}

function orderByTransformation(value: any): string {
  if (!isNaN(value)) {
    return value;
  } else if (typeof value === 'string') {
    return value.toString().toLocaleLowerCase();
  }
  return value;
}
export function paginateItems(items: Item[], skip: number, top: number): Item[] {
  return items.slice(skip, top);
}
