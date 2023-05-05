import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.sass'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	public product: Product;
	public isLoading: boolean;
	public stockList: any;
	public stockPrice: any[];
	public selectedStock: any;
	private timer: ReturnType<typeof setInterval>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService,
		private stockService: StockService,
		private title: Title
	) {
		this.stockPrice = [];
	}

	ngOnInit(): void {
		this.route.params.subscribe({
			next: (res: any) => {
				const identifier: string = res.productIdentifier;
				const identifierParts: any = identifier.split('-');
				const productId: number = +identifierParts[0];

				if (!productId || isNaN(productId) || !identifierParts[1]) {
					this.router.navigate(['']);
					return;
				}

				this.isLoading = true;

				setTimeout(() => {
					this.productService.getProductById(productId).subscribe({
						next: (res) => {
							this.product = res;

							if (!this.product) {
								this.router.navigate(['']);
								return;
							}

							this.title.setTitle('Beer Commerce - ' + this.product.brand);

							const getSkusStock = this.product.skus.map((sku) =>
								this.stockService.getProuctsStockAndPriceBySku(+sku.code)
							);

							forkJoin(getSkusStock).subscribe({
								next: (res) => {
									this.stockList = res;
									this.setStockPrice();
									this.selectedStock = this.stockPrice[0];
									this.isLoading = false;

									this.timer = setInterval(() => {
										forkJoin(getSkusStock).subscribe({
											next: (res) => {
												this.stockList = res;
												this.setStockPrice();
											},
										});
									}, 5000);
								},
							});
						},
					});
				}, 750);
			},
		});
	}

	ngOnDestroy(): void {
		clearInterval(this.timer);
	}

	private setStockPrice(): void {
		this.stockPrice = this.product.skus.map((sku: any) => {
			const stock = this.stockList.find((stock: any) => stock.code === +sku.code);
			return { sku: sku, stock: stock.stock };
		});
	}

	public selectStock(stock: any): void {
		this.selectedStock = stock;
	}
}
