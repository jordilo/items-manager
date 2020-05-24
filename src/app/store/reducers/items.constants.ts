import { Item } from '../models/item';
import { StorePagination } from '../models/pagination';

export interface ItemState {
  data: Item[];
  filteredItems: Item[];
  loaded: boolean;
  loading: boolean;
  error: string;
  filter: StorePagination<Item>;
}


export const initialState: ItemState = {
  data: [],
  filteredItems: [],
  loaded: false,
  loading: false,
  error: undefined,
  filter: {
    filter: '',
    sort: '',
    order: '',
    top: 5,
    skip: 0
  }
};
