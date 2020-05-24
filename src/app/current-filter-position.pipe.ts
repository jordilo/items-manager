import { StorePagination } from './store/models/pagination.d';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentFilterPosition'
})
export class CurrentFilterPositionPipe implements PipeTransform {

  public transform(value: StorePagination<any>): string {
    return `${value.skip + 1} - ${value.top}`;
  }

}
