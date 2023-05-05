import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
})
export class ProductDetailComponent implements OnInit {
  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (res: any) => {
        const identifier: string = res.productIdentifier;
        const identifierParts: any = identifier.split('-');
        const productId: number = +identifierParts[0];

        console.log(!productId && isNaN(productId));

        // if (!identifier || isNaN(productId)) {
        //   console.log('return');
        //   //this.router.navigate(['']);
        //   //return;
        // }

        // this.productService.getProductById(productId).subscribe({
        //   next: (res: Product) => (this.product = res),
        // });
      },
    });
  }
}
