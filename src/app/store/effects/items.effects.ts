import { Item } from './../models/item.d';
import { REMOVE_FAVS_ITEMS, ADD_FAVS_ITEMS, AddToFavs, RemoveFromFavs } from './../actions/item-favs.actions';
import { SetItem, SAVE_ITEMS } from './../actions/items.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { catchError, map, switchMap, tap, concatMap, concatAll } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { ItemsService } from '../service/items.service';
import { LOAD_ITEMS, SaveItems, ErrorGettingItems } from '../actions/items.actions';
// import all requried services or any dependencies

const FAVS_STORAGE_KEY = 'favs-storage';

@Injectable()
export class ItemEffects {
  constructor(private action$: Actions, private itemsService: ItemsService) { }

  @Effect()
  public loadItems$: Observable<Action> = this.action$.pipe(
    ofType(LOAD_ITEMS),
    switchMap(() => this.itemsService.getItems().pipe(
      map((response) => new SaveItems(response)),
      catchError(error => of(new ErrorGettingItems(error)))
    )));

  @Effect()
  public onSaveItems$: Observable<Action> = this.action$.pipe(
    ofType(SAVE_ITEMS),
    map(() => this.getStored()),
    concatAll(),
    map((item) => new SetItem(item)));
  @Effect()
  public onSetItems$: Observable<Action> = this.action$.pipe(
    ofType(SAVE_ITEMS),
    map(() => this.getStored()),
    concatAll(),
    map((item) => new AddToFavs(item)));


  @Effect()
  public addToFav$: Observable<Action> = this.action$.pipe(
    ofType(ADD_FAVS_ITEMS),
    map(({ payload: item }: AddToFavs) => {
      const newItem = Object.assign({}, item, { isFav: true });
      this.saveItemOnLocalStorage(newItem);
      return new SetItem(newItem);
    }));
  @Effect()
  public removeFromFav$: Observable<Action> = this.action$.pipe(
    ofType(REMOVE_FAVS_ITEMS),
    map(({ payload: item }: RemoveFromFavs) => {
      const newItem = Object.assign({}, item, { isFav: false });
      this.removeItemOnLocalStorage(newItem);
      return new SetItem(newItem);
    }));

  private removeItemOnLocalStorage(item: Item) {
    let stored = this.getStored();
    stored = stored.filter((it) => it.title !== item.title);
    this.saveStored(stored);
  }
  private saveItemOnLocalStorage(item: Item) {
    const stored = this.getStored();
    stored.push(item);
    this.saveStored(stored);
  }

  private getStored(): Item[] {
    return JSON.parse(localStorage.getItem(FAVS_STORAGE_KEY)) || [];
  }
  private saveStored(items: Item[]): void {
    localStorage.setItem(FAVS_STORAGE_KEY, JSON.stringify(items));
  }
}

