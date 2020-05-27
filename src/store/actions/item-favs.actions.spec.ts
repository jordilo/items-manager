import { Item } from '../models/item';
import { initialState } from '../reducers/items.constants';
import { AddToFavs, ADD_FAVS_ITEMS, FilterItemsFavs, FILTER_FAVS_ITEMS, RemoveFromFavs, REMOVE_FAVS_ITEMS } from './item-favs.actions';

describe('Items fav actions', () => {


  it('when create AddToFavs then type and payload are correct', () => {
    const action = new AddToFavs({ title: 'title' } as Item);
    expect(action.type).toEqual(ADD_FAVS_ITEMS);
    expect(action.payload).toEqual({ title: 'title' } as Item);

  });
  it('when create RemoveFromFavs then action and payload are correct', () => {
    const action = new RemoveFromFavs({ title: 'title' } as Item);
    expect(action.type).toEqual(REMOVE_FAVS_ITEMS);
    expect(action.payload).toEqual({ title: 'title' } as Item);
  });
  it('when create FilterItemsFavs then action and payload are correct', () => {
    const action = new FilterItemsFavs(initialState.filter);
    expect(action.type).toEqual(FILTER_FAVS_ITEMS);
  });

});
