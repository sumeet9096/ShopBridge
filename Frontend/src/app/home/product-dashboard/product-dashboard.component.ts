import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../../shared/interfaces/product';
import { ServiceService } from '../../shared/services/service.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {
  itemData: IProduct[] = [];
  subscriptions: Subscription[] = [];
  proChecked: any = false;
  productId: any;
  constructor(private _services: ServiceService, public router: Router, private matsnackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscriptions.push(this._services.getAllList().subscribe((result) => {
      this.itemData = result;
    }));
  }

  add() {
    this.router.navigateByUrl("home/add-product");
  }

  view() {
    this.router.navigate(["home/add-product", { id: this.productId }]);
  }

  delete() {
    this.subscriptions.push(this._services.deleteById(this.productId).subscribe(() => {
      this.matsnackBar.open("Deleted Successfully.", "", {
        duration: 3000,
      });
      this.ngOnInit();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
  selectItem(event: any, item: any) {
    debugger
    this.proChecked = event.source._checked;
    this.productId = item.id;
  }

}
