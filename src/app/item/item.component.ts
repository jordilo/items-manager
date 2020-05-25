import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Item } from '../store/models/item';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() public item: Item;

  @Output() public toggleFav = new EventEmitter<Item>();
}
