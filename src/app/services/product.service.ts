import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('backend/products.json');
  }

  public getProductById(productId: number) {
    return this.http.get<Product>('backend/products.json').pipe(
      map((res: any) => {
        const product = res.find((p: Product) => p.id === productId);
        return product;
      })
    );
  }
}
