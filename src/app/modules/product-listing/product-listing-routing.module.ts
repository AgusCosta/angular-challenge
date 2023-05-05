import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListingRoutingModule {}
