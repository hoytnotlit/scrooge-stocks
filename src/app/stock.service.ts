import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) { }

  csv = "/assets/HistoricalQuotes.csv";

  getStocks() {
    return this.http.get(this.csv, { responseType: "text" });
  }
}
