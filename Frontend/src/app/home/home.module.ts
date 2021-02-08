import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeRoutes } from './home.routing';
import { ChartistModule } from 'ng-chartist';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    FileUploadModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent, AddProductComponent, ProductDashboardComponent]
})
export class HomeModule {}
