import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';

const DRINK_CATEGORIES = [
	{
		label: 'All',
		img: 'all.png',
	},
	{
		label: 'Beer',
		img: 'Beer.png',
	},
	{
		label: 'Wine',
		img: 'Wine-glass.png',
	},
];

@Component({
	selector: 'app-product-listing',
	templateUrl: './product-listing.component.html',
	styleUrls: ['./product-listing.component.sass'],
})
export class ProductListingComponent implements OnInit {
	public productList: Product[];
	public stockList: any;

	public isLoading: boolean;

	public drinkCategories: { label: string; img: string }[];
	public selectedCategory: { label: string; img: string };

	public searchForm: FormGroup;
	public filteredProducts: Observable<Product[]> | undefined;

	constructor(private productService: ProductService, private title: Title, private stockService: StockService) {
		this.title.setTitle('Beer Commerce - Find yours');

		this.productList = [];
		this.drinkCategories = DRINK_CATEGORIES;
		this.selectedCategory = {
			label: 'All',
			img: 'all.png',
		};

		this.searchForm = new FormGroup({
			searchControl: new FormControl(''),
		});
	}

	ngOnInit(): void {
		this.isLoading = true;

		setTimeout(() => {
			forkJoin([this.stockService.getProuctsStock(), this.productService.getProducts()]).subscribe({
				next: (res) => {
					this.isLoading = false;

					[this.stockList, this.productList] = res;

					this.filteredProducts = this.searchForm.get('searchControl')?.valueChanges.pipe(
						startWith(''),
						map((value) => this.filterProduct(value || ''))
					);
				},
			});
		}, 750);
	}

	private filterProduct(value: string): Product[] {
		const filterValue = value.toLowerCase();

		return this.productList.filter(
			(product) =>
				product.brand.toLowerCase().includes(filterValue) ||
				product.style.toLowerCase().includes(filterValue) ||
				product.substyle.toLowerCase().includes(filterValue) ||
				product.abv.toLowerCase().includes(filterValue) ||
				product.origin.toLowerCase().includes(filterValue)
		);
	}

	public changeCategory(category: { label: string; img: string }): void {
		this.selectedCategory = category;
	}

	public getStockPrice(product: Product): void {
		if (!this.stockList) return;

		console.log(this.stockList);

		const stockPrice: any[] = [];
		this.stockList;
		product.skus.forEach((sku) => {
			console.log(this.stockList[+sku]);
		});
	}
}
