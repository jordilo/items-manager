import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { ItemsService } from '../service/items.service';
import { LOAD_ITEMS, SaveItems, ErrorGettingItems } from '../actions/items.actions';
// import all requried services or any dependencies

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
}

