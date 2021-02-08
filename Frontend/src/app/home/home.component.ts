import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ServiceService } from '../shared/services/service.service';
import { IProduct } from '../shared/interfaces/product';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
  selectItem(event:any,item:any) {
    debugger
    this.proChecked = event.source._checked;
    this.productId = item.id;
  }
}
