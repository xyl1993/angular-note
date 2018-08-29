import { Pipe, PipeTransform } from '@angular/core';
declare var require: any;
const moment = require("moment"); 
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform {
  transform(value: string, exponent: string): string {
    console.log(moment(value).format(exponent));
    return value ? moment(value).format(exponent) : '';
  }
}