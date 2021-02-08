import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';

export const HomeRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'product-dashboard', component: ProductDashboardComponent }
];
