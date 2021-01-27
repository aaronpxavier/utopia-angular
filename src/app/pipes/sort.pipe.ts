/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {

  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') {
      if (order === 'asc') { return value.sort(); }
      else { return value.sort().reverse(); }
    }
    return value.sort((a: any, b: any) => {
      if (a[column] < b[column]) {
        return order === 'asc' ? -1 : 1;
      } else if (a[column] > b[column]) {
        return order === 'asc' ? 1 : -1;
      } else {
        return 0;
      }

    });
  }
}
