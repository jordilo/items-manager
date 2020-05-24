import { getFavItems } from './../store/reducers/items-favs.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Item } from '../store/models/item';
import { Observable } from 'rxjs';
import { FilterItemsFavs, RemoveFromFavs } from '../store/actions/item-favs.actions';

@Component({
  selector: 'app-favs-modal',
  templateUrl: './favs-modal.component.html',
  styleUrls: ['./favs-modal.component.scss']
})
export class FavsModalComponent implements OnInit {

  public items$: Observable<Item[]>;
  constructor(private modalRef: BsModalRef, private store: Store) { }

  public ngOnInit() {
    this.items$ = this.store.select(getFavItems);
    this.store.dispatch(new FilterItemsFavs({ filter: '' } as any));
  }
  public removeItem(item: Item) {
    this.store.dispatch(new RemoveFromFavs(item));
  }

  public close() {
    this.modalRef.hide();
  }

  public trackByFn(index: number, item: Item) {
    return item.title;
  }

}
