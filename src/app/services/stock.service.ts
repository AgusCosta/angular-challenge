import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URLS } from '../constants/api-endpoints';

@Injectable({
	providedIn: 'root',
})
export class StockService {
	constructor(private http: HttpClient) {}

	public getProuctsStockAndPriceBySku(skuCode: number): Observable<any> {
		return this.http.get<any>(API_URLS.STOCK.BASE_URL, { params: { code: skuCode } }).pipe(
			map((res) => {
				return { code: skuCode, stock: res[skuCode] };
			})
		);
	}

	public getProuctsStock(): Observable<any> {
		return this.http.get<any>(API_URLS.STOCK.BASE_URL);
	}
}
