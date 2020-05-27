import { getFavItems, getFavItemsCount } from '../../store/reducers/items-favs.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Item } from '../../store/models/item';
import { FilterItemsFavs, RemoveFromFavs } from '../../store/actions/item-favs.actions';
import { StorePagination } from '../../store/models/pagination';
import { ListItems } from '../list-items';
import { SortItems } from '../../store/models/sort-items';

@Component({
  selector: 'app-favs-modal',
  templateUrl: './favs-modal.component.html',
  styleUrls: ['./favs-modal.component.scss']
})
export class FavsModalComponent extends ListItems implements OnInit {

  public filterBy = [
    { value: SortItems.NAME_ASC, text: 'title asc' },
    { value: SortItems.NAME_DESC, text: 'title desc' },
  ];
  constructor(private modalRef: BsModalRef, private store: Store) {
    super();
  }

  public ngOnInit() {
    this.items$ = this.store.select(getFavItems);
    this.count$ = this.store.select(getFavItemsCount);
    this.store.dispatch(new FilterItemsFavs({ filter: '' } as any));
  }
  public removeItem(item: Item) {
    if (confirm('Are you sure to remove ' + item.title + ' from your favorite list')) {
      this.store.dispatch(new RemoveFromFavs(item));
    }
  }
  public filterChange(filter: StorePagination<Item>) {
    this.currentFilter = filter;
    this.store.dispatch(new FilterItemsFavs(filter));
  }

  public close() {
    this.modalRef.hide();
  }

  public trackByFn(index: number, item: Item) {
    return item.title;
  }

}
