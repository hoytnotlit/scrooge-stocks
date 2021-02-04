import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service for getting stock data
 * 
 * NOTE: HTTP request from nasdaq api resulted in CORS error
 * In an irl scenario it would be best to set up a backend to get
 * data from api
 */
@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) { }

  csvFile = "/assets/HistoricalQuotes.csv";

  getStocks() {
    return this.http.get(this.csvFile, { responseType: "text" });
  }
}
