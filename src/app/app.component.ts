import { Component } from '@angular/core';
import { Stock } from './models/stock.model';
import { HelperService } from './services/helper.service';
import { StockService } from './services/stock.service';

/**
 * Main component, handles retrieval of data and date range changes
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  stocks = new Array<Stock>();
  stocksFiltered = new Array<Stock>();
  from: Date;
  to: Date;
  fromDisplay: string;
  toDisplay: string;

  constructor(private stockService: StockService, private helperService: HelperService) { }

  ngOnInit() {
    this.stockService.getStocks()
      .subscribe(data => this.initData(data))
  }

  initData(data: string): void {
    // parse stock data from csv string
    data.split("\n").forEach((e, i) => {
      let row = e.split(",");

      // skip header and empty row
      if (e && i !== 0) {
        this.stocks.push({
          date: new Date(row[0]),
          closeLast: this.helperService.getPrice(row[1]),
          volume: parseInt(row[2]),
          open: this.helperService.getPrice(row[3]),
          high: this.helperService.getPrice(row[4]),
          low: this.helperService.getPrice(row[5]),
        })
      }
    });

    // initialize date range to last 30 days
    this.from = new Date();
    this.to = new Date();
    this.from.setDate(this.from.getDate() - 30);

    // set date string to display in input
    this.fromDisplay = this.helperService.getDateString(this.from);
    this.toDisplay = this.helperService.getDateString(this.to);

    // filter data on initial date range
    this.handleDateRangeChange();
  }

  handleDateRangeChange(): void {
    // datepicker creates strings, ensure dates are not strings
    this.from = new Date(this.fromDisplay);
    this.to = new Date(this.toDisplay);

    // set hours to midnight
    this.from.setHours(0, 0, 0, 0);
    this.to.setHours(0, 0, 0, 0);

    // filter data by user inputted date range
    this.stocksFiltered = this.helperService.filterByDate(this.stocks, this.from, this.to);
  }
}
