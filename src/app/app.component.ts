import { Component } from '@angular/core';
import { Stock } from './stock.model';
import { StockService } from './stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'scrooge-stocks';

  stocks = new Array<Stock>();
  stocksFiltered = new Array<Stock>();
  stocksPriceChange = new Array<Stock>();
  stocksBestOpening = new Array<Stock>();
  longestUpwardDays: number;

  from: Date;
  to: Date;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks()
      .subscribe(data => this.initData(data))
  }

  initData(data: string): void {
    // parse stock data from csv string
    data.split("\n").forEach(e => {
      let row = e.split(",");
      // TODO skip header and empty rows
      if (e) {
        //new Stock(
        //TODO make sure order is correct
        this.stocks.push({
          date: new Date(row[0]),
          closeLast: this.getPrice(row[1]),
          volume: parseInt(row[2]),
          open: this.getPrice(row[3]),
          high: this.getPrice(row[4]),
          low: this.getPrice(row[5]),
        })
      }
    });

    // initialize date range to last 30 days
    // this.from = new Date("1/6/2021");
    // this.to = new Date("1/8/2021");
    this.from = new Date();
    this.to = new Date();
    this.from.setDate(this.from.getDate() - 30)

    // set data on initial date range
    this.handleDateRangeChange();
  }

  handleDateRangeChange(): void {
    // filter and sort data by user inputted date range
    this.stocksFiltered = this.filterByDate(this.stocks);

    // get answers for questions
    this.longestUpwardDays = this.getLongestUpwardDays();
    this.stocksPriceChange = this.getStockPriceChange();
    this.stocksBestOpening = this.getBestOpeningPrice();
  }

  getLongestUpwardDays(): number {
    let maxDays = 0;
    let stocksSorted = this.sortByDateAscending(this.stocksFiltered);

    // TODO remove repetition
    for (let i = 0; i < stocksSorted.length; i++) {
      let nextDayIndex = i + 1;
      let prevDayPrice = stocksSorted[i].closeLast;
      let days = 1;

      while (nextDayIndex < stocksSorted.length && prevDayPrice < stocksSorted[nextDayIndex].closeLast) {
        // TODO scen. price 1st day: 12, 2nd day: 15, 3rd: 14 -> updward trend is 2 days?
        prevDayPrice = stocksSorted[nextDayIndex].closeLast;
        days++;
        nextDayIndex++;
      }

      maxDays = days > maxDays ? days : maxDays;
    }

    return maxDays;
  }

  getStockPriceChange(): Stock[] {
    let result = new Array<Stock>();

    for (let s of this.stocksFiltered) {
      // calculate the stock price change within a day
      s.priceChange = s.high - s.low;
      result.push(s)
    }

    // The list is ordered by
    // volume and price change. So if two dates have the same volume, the one with the
    // more significant price change should come first.

    //TODO sort
    return result;
  }

  getBestOpeningPrice(): Stock[] {
    let result = new Array<Stock>();
    const days = 5;

    for (let s of this.stocksFiltered) {
      let n = this.stocks.indexOf(s); // index of current day
      // order of stocks is descending -> get closing prices of next 5 items of current day
      let A = this.stocks.slice(n + 1, n + (days + 1)).map(s => s.closeLast);

      // calculate sma and difference between opening price and sma
      if (A.length == days) {
        let sma = A.reduce((a, b) => a + b) / days;
        let priceChangePercentage = (s.open - sma) / s.open;
        s.smaPriceChangePercentage = priceChangePercentage;
        result.push(s);
      }
    }

    // sort by price change percentage
    return result.sort((a, b) => { return b.smaPriceChangePercentage - a.smaPriceChangePercentage });
  }


  // TODO helper service
  
  // filter by given date range
  filterByDate(data: Stock[]): Stock[] {
    //TODO these times are +1 when selected from the datepicker
    // console.log(new Date(this.from))
    // console.log(new Date(this.to))
    return data.filter(s => {
      return new Date(s.date) >= new Date(this.from)
        && new Date(s.date) <= new Date(this.to)
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
