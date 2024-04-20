import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'convertFrom24To12Format'})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const format = 'dd MMM yyyy h:mm a';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

}


