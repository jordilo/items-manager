import * as _ from 'lodash';
import { initialState } from '../store/reducers/items.constants';
import { Item } from './../store/models/item.d';
import { StorePagination } from './../store/models/pagination.d';
import { CurrentFilterPositionPipe } from './current-filter-position.pipe';

describe('CurrentFilterPositionPipe', () => {
  let filter: StorePagination<Item>;
  let pipe: CurrentFilterPositionPipe;
  beforeEach(() => {
    filter = _.clone(initialState.filter);
    pipe = new CurrentFilterPositionPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('when pass filter then content is rendered properly', () => {
    const result = pipe.transform(filter);
    expect(result).toBe('1 - 5');
  });
  it('when pass filter as undefined then result is empty string', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });
});
