import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable, map, startWith } from 'rxjs';
import { DRINK_CATEGORIES } from 'src/app/constants/drink-categories';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.sass'],
})
export class ProductListingComponent implements OnInit {
  public productList: Product[];
  public stockList: Object;

  public isLoading: boolean;

  public drinkCategories: Category[];
  public selectedCategory: Category;

  public searchForm: FormGroup;
  public filteredProducts: Observable<Product[]> | undefined;

  constructor(private productService: ProductService, private title: Title) {
    this.title.setTitle('Beer Commerce - Find yours');

    this.productList = [];
    this.drinkCategories = DRINK_CATEGORIES;
    this.selectedCategory = this.drinkCategories[0];

    this.searchForm = new FormGroup({
      searchControl: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.productService.getProducts().subscribe({
        next: (res) => {
          this.isLoading = false;
          this.productList = res;
          this.filteredProducts = this.searchForm
            .get('searchControl')
            ?.valueChanges.pipe(
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

  public changeCategory(category: Category): void {
    this.selectedCategory = category;
  }
}
