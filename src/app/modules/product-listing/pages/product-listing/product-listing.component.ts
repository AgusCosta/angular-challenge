import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

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

  public drinkCategories: { label: string; img: string }[];
  public selectedCategory: { label: string; img: string };

  public searchForm: FormGroup;
  public filteredProducts: Observable<Product[]> | undefined;

  constructor(private productService: ProductService, private title: Title) {
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
    this.productService.getProducts().subscribe({
      next: (res: Product[]) => {
        this.productList = res;

        this.filteredProducts = this.searchForm
          .get('searchControl')
          ?.valueChanges.pipe(
            startWith(''),
            map((value) => this.filterProduct(value || ''))
          );
      },
    });
  }

  public getProductLink(product: Product): string {
    const brand: string = product.brand.toLowerCase().split(' ').join('');
    return `${product.id}-${brand}`;
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
}
