import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListingRoutingModule } from './product-listing-routing.module';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [ProductListingComponent, ProductCardComponent],
  imports: [CommonModule, SharedModule, ProductListingRoutingModule],
})
export class ProductListingModule {}
