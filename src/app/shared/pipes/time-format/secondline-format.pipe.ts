import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'second'})
export class SecondLine implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const format = 'h:mm a';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

}


