import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs';
import { ProductData, ServiceService } from '../../shared/services/service.service';

const URL = '';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productModel: ProductData = new ProductData();
  id: any;
  image: any;
  public productForm!: FormGroup;  
  uploader: FileUploader = new FileUploader({ url: URL });
  subscriptions: Subscription[] = [];

  constructor(public route: ActivatedRoute, private _location: Location, private matsnackBar: MatSnackBar, private _services: ServiceService, private formBuilder: FormBuilder) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.id = params['id'];
    }));
  }

  ngOnInit(): void {
    if (this.id) {
      this.subscriptions.push(this._services.getById(this.id).subscribe((result:any) => {
        this.productForm.setValue({ name: result.name, descriptions: result.descriptions, price: result.price });
        this.image = result.image;
      }));
    }
    
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      descriptions: new FormControl('', [Validators.required, Validators.maxLength(270)]),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  back() {
    this._location.back();
  }

  submit(product: ProductData) {
    product.image = this.image;
    this.subscriptions.push(this._services.insertorUpdate(product).subscribe((result:any) => {
      this.matsnackBar.open("Save Successfully.", "", {
        duration: 3000,
      });
      this.back();
    }));
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }

  uploadImage(event: { target: { files: string | any[]; }; }) {
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files && event.target.files[i]) {
        var reader = new FileReader();
        let file = event.target.files[i];
        reader.onload = (event: any) => {
          this.image = event.target.result.split(",")[1];
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
