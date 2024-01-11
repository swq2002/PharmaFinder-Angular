import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMap'
})
export class FilterMapPipe implements PipeTransform {


  transform(pharmacyList: any[], searchValue: string): any[] {
    if (!pharmacyList || !searchValue) {
      return pharmacyList;
    }

    const searchTerm = searchValue.toLowerCase();

    return pharmacyList.filter(pharmacy => {
      return pharmacy.pharmacyname.toLowerCase().includes(searchTerm);
    });
  }
}
