import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/models/product';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent implements OnInit {
  @Input() public product: Product;
  @Input() public animationDelay: number;
  public stockList: any;
  public stockPrice: any[];

  constructor(private stockService: StockService) {
    this.stockPrice = [];
    this.stockList = [];
  }

  ngOnInit(): void {
    const getSkusStockInfo = this.product.skus.map((sku) =>
      this.stockService.getProuctsStockAndPriceBySku(+sku.code)
    );

    forkJoin(getSkusStockInfo).subscribe({
      next: (res) => {
        this.stockList = res;
        this.setStockPrice();
      },
    });
  }

  public getProductLink(product: Product): string {
    const brand: string = product.brand.toLowerCase().split(' ').join('');
    return `${product.id}-${brand}`;
  }

  private setStockPrice(): void {
    this.stockPrice = this.product.skus.map((sku: any) => {
      const stock = this.stockList.find(
        (stock: any) => stock.code === +sku.code
      );
      return { sku: sku, stock: stock.stock };
    });
  }
}
