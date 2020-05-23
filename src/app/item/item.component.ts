import { Component, Input } from '@angular/core';
import { Item } from '../store/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() public item: Item;

}
