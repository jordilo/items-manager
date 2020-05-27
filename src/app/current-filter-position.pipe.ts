import { Pipe, PipeTransform } from '@angular/core';
import { StorePagination } from '../store/models/pagination';

@Pipe({
  name: 'currentFilterPosition'
})
export class CurrentFilterPositionPipe implements PipeTransform {

  public transform(value: StorePagination<any>): string {
    if (value) {
      return `${value.skip + 1} - ${value.top}`;
    }
    return '';
  }

}
