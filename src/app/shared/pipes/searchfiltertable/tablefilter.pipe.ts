
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipetable implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      if (typeof item === 'object' && item !== null) {
        const itemValue = (item as any).name; // Assuming 'name' property exists
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(searchText);
        }
      }
      return false;
    });
}
}
