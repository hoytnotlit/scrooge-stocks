import { Injectable } from '@angular/core';
import { Stock } from '../models/stock.model';

/**
 * Service for helpers that can be generealized
 */
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor() { }

  // filter by given date range
  filterByDate(data: Stock[], from: Date, to: Date): Stock[] {
    return data.filter(s => {
      return s.date >= from && s.date <= to;
    });
  }

  // convert price from string to float
  getPrice(price: string): number {
    return parseFloat(price.trim().replace('$', ''));
  }

  // get date string in yyyy-MM-dd format
  getDateString(date: Date): string {
    let smonth = (date.getMonth() + 1).toString();
    if (date.getMonth() < 9) { smonth = '0' + smonth; }
    let sdate = date.getDate().toString();
    if (date.getDate() < 10) { sdate = '0' + sdate; }

    return date.getFullYear() + '-' + smonth + '-' + sdate;
  }
}
