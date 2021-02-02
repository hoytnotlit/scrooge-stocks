import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStocks() {
    // let headers = new HttpHeaders();

    // const options: {
    //     headers?: HttpHeaders;
    //     observe?: 'body';
    //     params?: HttpParams;
    //     reportProgress?: boolean;
    //     responseType: 'arraybuffer';
    //     withCredentials?: boolean;
    // } = {
    //     responseType: 'arraybuffer'
    // };

    // return this.http
    //     .get('/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20', options)
    //     .subscribe((data: any) => {console.log(data)});
    // return this.http.get("https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20")
    // https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20
  }
}
