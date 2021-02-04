import { Injectable } from '@angular/core';
import { Stock } from '../models/stock.model';

/**
 * Service for helpers that can be generealized
 * such as sorting, parsing and filtering
 */
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  // filter by given date range
  filterByDate(data: Stock[], from, to): Stock[] {
    //TODO these times are +1 when selected from the datepicker
    // console.log(new Date(this.from))
    // console.log(new Date(this.to))
    return data.filter(s => {
      return new Date(s.date) >= new Date(from)
        && new Date(s.date) <= new Date(to)
    });
  }

  sortByDateAscending(data: Stock[]): Stock[] {
    return data.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }

  // convert price from string to float
  getPrice(price: string): number {
    return parseFloat(price.trim().replace("$", ""));
  }
}
