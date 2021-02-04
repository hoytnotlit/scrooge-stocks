import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less']
})
export class StockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // getLongestUpwardDays(): number {
  //   let maxDays = 0;
  //   let stocksSorted = this.sortByDateAscending(this.stocksFiltered);

  //   // TODO remove repetition
  //   for (let i = 0; i < stocksSorted.length; i++) {
  //     let nextDayIndex = i + 1;
  //     let prevDayPrice = stocksSorted[i].closeLast;
  //     let days = 1;

  //     while (nextDayIndex < stocksSorted.length && prevDayPrice < stocksSorted[nextDayIndex].closeLast) {
  //       // TODO scen. price 1st day: 12, 2nd day: 15, 3rd: 14 -> updward trend is 2 days?
  //       prevDayPrice = stocksSorted[nextDayIndex].closeLast;
  //       days++;
  //       nextDayIndex++;
  //     }

  //     maxDays = days > maxDays ? days : maxDays;
  //   }

  //   return maxDays;
  // }

  // getStockPriceChange(): Stock[] {
  //   let result = new Array<Stock>();

  //   for (let s of this.stocksFiltered) {
  //     // calculate the stock price change within a day
  //     s.priceChange = s.high - s.low;
  //     result.push(s)
  //   }

  //   // The list is ordered by
  //   // volume and price change. So if two dates have the same volume, the one with the
  //   // more significant price change should come first.

  //   // sort by volume and price change, prioritizing volume
  //   result.sort((a, b) => { return a.volume - b.volume || a.priceChange - b.priceChange; });
  //   return result;
  // }

  // getBestOpeningPrice(): Stock[] {
  //   let result = new Array<Stock>();
  //   const days = 5;

  //   for (let s of this.stocksFiltered) {
  //     let n = this.stocks.indexOf(s); // index of current day
  //     // order of stocks is descending -> get closing prices of next 5 items of current day
  //     let A = this.stocks.slice(n + 1, n + (days + 1)).map(s => s.closeLast);

  //     // calculate sma and difference between opening price and sma
  //     if (A.length == days) {
  //       let sma = A.reduce((a, b) => a + b) / days;
  //       let priceChangePercentage = (s.open - sma) / s.open;
  //       s.smaPriceChangePercentage = priceChangePercentage;
  //       result.push(s);
  //     }
  //   }

  //   // sort by price change percentage
  //   return result.sort((a, b) => { return b.smaPriceChangePercentage - a.smaPriceChangePercentage });
  // }

}
