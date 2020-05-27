import { itemsFavsReducer } from './items-favs.reducer';
import { ItemState } from './items.constants';
import { itemsReducer } from './items.reducers';


export interface AppState {
  items: ItemState;
  favs: ItemState;
}

export const reducers = {
  items: itemsReducer,
  favs: itemsFavsReducer
};

