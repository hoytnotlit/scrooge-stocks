export class Stock {
    date: Date;
    closeLast: number;
    volume: number;
    open: number;
    high: number;
    low: number;
    priceChange?: number;
    smaPriceChangePercentage?: number;
}
