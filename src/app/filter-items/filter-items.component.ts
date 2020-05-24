import { initialState } from './../store/reducers/items.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SortItems } from '../store/models/sort-items';
import { debounceTime, map, tap } from 'rxjs/operators';
import { StorePagination } from '../store/models/pagination';
import { Item } from '../store/models/item';

const initialValues = initialState.filter;

@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.component.html',
  styleUrls: ['./filter-items.component.scss']
})
export class FilterItemsComponent implements OnInit {

  @Input() public filter: StorePagination<Item>;
  @Input() public orderFields = [
    { value: SortItems.EMAIL_ASC, text: 'email asc' },
    { value: SortItems.EMAIL_DESC, text: 'email desc' },
    { value: SortItems.PRICE_ASC, text: 'price asc' },
    { value: SortItems.PRICE_DESC, text: 'price desc' },
    { value: SortItems.NAME_ASC, text: 'title asc' },
    { value: SortItems.NAME_DESC, text: 'title desc' },
    { value: SortItems.DESCRIPTION_ASC, text: 'description asc' },
    { value: SortItems.DESCRIPTION_DESC, text: 'description desc' }];
  @Output() public filterChange = new EventEmitter<StorePagination<Item>>();
  public form: FormGroup;
  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this.fb.group(this.filter || initialValues);
    this.form.valueChanges.
      pipe(
        debounceTime(400),
        map((value: StorePagination<Item>) => this.handleFormChanges(value))
      ).subscribe((value: StorePagination<Item>) => this.filterChange.emit(value));
  }

  private handleFormChanges(value: StorePagination<Item>) {
    if (value.order) {
      const splittedOrder = value.order.split(' ');
      value.sort = splittedOrder[0] as keyof Item;
      value.order = splittedOrder[1] as 'asc' | 'desc';
    }
    return value;
  }

}
