export class Stock {
    date: Date;
    closeLast: number; //rename?
    volume: number;
    open: number;
    high: number;
    low: number;
    priceChange?: number; // StockPriceChange
    smaPriceChangePercentage?: number;
}
