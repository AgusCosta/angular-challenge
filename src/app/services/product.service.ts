import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../constants/api-endpoints';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private http: HttpClient) {}

	public getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(API_URLS.PRODUCTS.BASE_URL);
	}

	public getProductById(productId: number) {
		return this.http.get<Product>(API_URLS.PRODUCTS.BASE_URL).pipe(
			map((res: any) => {
				const product = res.find((p: Product) => p.id === productId);
				return product;
			})
		);
	}
}
