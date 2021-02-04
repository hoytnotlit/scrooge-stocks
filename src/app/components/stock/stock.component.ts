import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock.model';

/**
 * Component for stock statistics
 */
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less']
})
export class StockComponent implements OnChanges {
  @Input() stocks: Stock[];
  @Input() stocksFiltered: Stock[];
  stocksPriceChange = new Array<Stock>();
  stocksBestOpening = new Array<Stock>();
  longestUpwardDays: number;

  constructor() { }

  ngOnChanges() {
    this.longestUpwardDays = this.getLongestUpwardDays();
    this.stocksPriceChange = this.getStockPriceChange();
    this.stocksBestOpening = this.getBestOpeningPrice();
  }

  getLongestUpwardDays(): number {
    let maxDays = 0;
    const stocksReversed = this.stocksFiltered.reverse();

    for (let i = 0; i < stocksReversed.length; i++) {
      let nextDayIndex = i + 1;
      let prevDayPrice = stocksReversed[i].closeLast;
      let days = 1;

      // get count of how many days stock price was going up
      while (nextDayIndex < stocksReversed.length && prevDayPrice < stocksReversed[nextDayIndex].closeLast) {
        prevDayPrice = stocksReversed[nextDayIndex].closeLast; // compare price to previous day
        days++;
        nextDayIndex++;
      }

      maxDays = days > maxDays ? days : maxDays;
    }

    return maxDays;
  }

  getStockPriceChange(): Stock[] {
    const result = new Array<Stock>();

    for (const s of this.stocksFiltered) {
      // calculate the stock price change within a day
      s.priceChange = s.high - s.low;
      result.push(s);
    }

    // sort by volume and price change
    result.sort((a, b) => b.volume - a.volume || b.priceChange - a.priceChange);
    return result;
  }

  getBestOpeningPrice(): Stock[] {
    const result = new Array<Stock>();
    const days = 5;

    for (const s of this.stocksFiltered) {
      const n = this.stocks.indexOf(s); // index of current day
      // order of stocks is descending -> get closing prices of next 5 items of current day
      const A = this.stocks.slice(n + 1, n + (days + 1)).map(st => st.closeLast);

      // calculate sma and difference between opening price and sma
      if (A.length === days) {
        const sma = A.reduce((a, b) => a + b) / days;
        const priceChangePercentage = (s.open - sma) / s.open;
        s.smaPriceChangePercentage = priceChangePercentage;
        result.push(s);
      }
    }

    // sort by price change percentage
    return result.sort((a, b) => b.smaPriceChangePercentage - a.smaPriceChangePercentage);
  }

}
