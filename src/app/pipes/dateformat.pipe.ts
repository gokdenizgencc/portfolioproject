import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat',
  standalone: true
})
export class DateformatPipe implements PipeTransform {

  transform(value: string): any {
    if (!value) return null;
    const dateParts = value.split('.');
    return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`; // mm.dd.yyyy -> yyyy-mm-dd
  }

}
