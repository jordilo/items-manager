import { itemsFavsReducer } from './items-favs.reducer';
import { itemsReducer } from './items.reducers';
import { ItemState } from './items.constants';


export interface AppState {
  items: ItemState;
  favs: ItemState;
}

export const reducers = {
  items: itemsReducer,
  favs: itemsFavsReducer
};

