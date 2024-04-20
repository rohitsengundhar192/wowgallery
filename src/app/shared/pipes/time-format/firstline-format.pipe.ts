import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'first'})
export class firstLine implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const format = 'dd MMM yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

}


