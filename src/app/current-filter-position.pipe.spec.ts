import { initialState } from '../store/reducers/items.constants';
import { CurrentFilterPositionPipe } from './current-filter-position.pipe';

describe('CurrentFilterPositionPipe', () => {
  const filter = initialState.filter;
  let pipe: CurrentFilterPositionPipe;
  beforeEach(() => {
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
