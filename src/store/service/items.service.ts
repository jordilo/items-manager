import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Item, ItemResults } from '../models/item';
import * as itemsResults from './items.mock.json';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public getItems(): Observable<Item[]> {

    return of((itemsResults as any).default as ItemResults)
      .pipe(delay(1500))
      .pipe(map(({ items }) => this.convertItems(items))
      );
  }


  private convertItems(items: Item[]) {
    return items.map((item) => {
      item.price = Number(item.price) as any;
      return item;
    });
  }
}
