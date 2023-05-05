import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent implements OnInit, OnChanges {
	@Input() public product: Product;
	@Input() public animationDelay: number;
	@Input() public stockList: any;

	public stockPrice: any[];

	constructor() {
		this.stockPrice = [];
	}

	ngOnInit(): void {
		this.setStockPrice();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes['stockList'].firstChange) this.setStockPrice();
	}

	public getProductLink(product: Product): string {
		const brand: string = product.brand.toLowerCase().split(' ').join('');
		return `${product.id}-${brand}`;
	}

	private setStockPrice(): void {
		const price: any[] = [];
		this.product.skus.forEach((sku: any) => price.push({ sku: sku, stock: this.stockList[sku.code] }));
		this.stockPrice = [...price];
	}
}
