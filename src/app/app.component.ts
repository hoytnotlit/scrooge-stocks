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
  // header = new Array<string>();
  stocks = new Array<Stock>();
  stocksFilteredSorted = new Array<Stock>();
  stocksPriceChange = new Array<Stock>();
  stocksBestOpening = new Array<Stock>();
  longestUpwardDays: number;

  from: Date = new Date("1/6/2021");
  to: Date = new Date("1/8/2021");

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks()
      .subscribe(data => this.parseStocks(data))
  }

  parseStocks(data) {
    data.split("\n").forEach(e => {
      let row = e.split(",");
      // TODO skip header and empty rows
      if (e) {
        //new Stock(
        //TODO make sure order is correct
        this.stocks.push({
          date: row[0],
          closeLast: parseFloat(row[1].trim().replace("$", "")),
          volume: row[2],
          open: row[3],
          high: parseFloat(row[4].trim().replace("$", "")),
          low: parseFloat(row[5].trim().replace("$", "")),
        })
      }
    });

    this.handleDateRangeChange();
  }

  handleDateRangeChange() {
    // filter and sort data by user inputted date range
    this.stocksFilteredSorted = this.sortByDate(this.filterByDate(this.stocks))

    // handle answers for questions
    this.getLongestUpwardDays()
    this.stocksPriceChange = this.getStockPriceChange()
    this.stocksBestOpening = this.getBestOpeningPrice()
  }

  getLongestUpwardDays() {
    let maxDays = 0;

    // TODO remove repetition
    for (let i = 0; i < this.stocksFilteredSorted.length; i++) {
      let index = i + 1;
      let price = this.stocksFilteredSorted[i].closeLast; //TODO check always start price oooor?
      let days = 1;

      while (index < this.stocksFilteredSorted.length && price < this.stocksFilteredSorted[index].closeLast) {
        days++;
        index++;
      }

      maxDays = days > maxDays ? days : maxDays;
    }

    this.longestUpwardDays = maxDays
  }

  getStockPriceChange() {
    //TODO use model maybe
    let result = [];

    for (let s of this.stocksFilteredSorted) {
      //Use High and Low prices to calculate the stock price change within a day. (Stock
      // price change from 2$ to 1$ is equally significant as change from 1$ to 2$.)
      result.push({ date: s.date, volume: s.volume, priceChange: s.high - s.low });
    }

    return result;
    //List of dates, volumes and price changes.
  }

  getBestOpeningPrice() {
    //TODO
    let result = [];
    //Calculate simple moving average for day N using the average value of closing prices
    // between days N-1 to N-5.
    for (let s of this.stocksFilteredSorted) {
      // Calculate how many percentages (%) is the difference between the opening price of
      // the day and the calculated SMA 5 price of the day.
      result.push({ date: s.date, priceChangePercentage: 0.5 });
    }
    // output: List of dates and price change percentages. The list is ordered by
    // price change percentages.
    console.log(result)
    return result;
  }

  filterByDate(data: Stock[]) {
    return data.filter(s => {
      return new Date(s.date) >= new Date(this.from)
        && new Date(s.date) <= new Date(this.to)
    });
  }

  sortByDate(data: Stock[]) {
    return data.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() })
  }
}
