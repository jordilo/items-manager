import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemResults } from '../models/item';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import * as itemsResults from './items.mock.json';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public getItems(): Observable<Item[]> {

    return of((itemsResults as any).default as ItemResults)
      .pipe(delay(1500))
      .pipe(map(({ items }) => items));
  }
}
