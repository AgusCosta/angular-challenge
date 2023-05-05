import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ProductDetailComponent],
	imports: [CommonModule, ProductDetailRoutingModule, SharedModule],
})
export class ProductDetailModule {}
