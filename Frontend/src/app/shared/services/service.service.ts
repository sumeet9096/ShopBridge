import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { IProduct } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public url = 'http://localhost:64717';
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json');
  }

  getAllList(): Observable<IProduct[]> {
    return this.http
      .get<any>(this.url + '/api/Product/GetAllList', { headers: this.headers })
      .pipe(
        tap(response => {
          return response;
        }),
      );
  }

  insertorUpdate(data: ProductData): Observable<IProduct> {
    return this.http
      .post<any>(this.url + '/api/Product/InsertorUpdate', data, { headers: this.headers })
      .pipe(
        tap(response => {
          return response;
        }),

      );
  }

  getById(id: number): Observable<IProduct> {
    return this.http
      .get<any>(this.url + '/api/Product/GetById?id=' + id, { headers: this.headers })
      .pipe(
        tap(response => {
          return response;
        }),
      );
  }

  deleteById(id: any): Observable<IProduct> {
    return this.http
      .delete<any>(this.url + '/api/Product/DeleteById?id=' + id, { headers: this.headers })
      .pipe(
        tap(response => {
          return response;
        }),
      );
  }
}

export class ProductData {
  id!: number | undefined;
  name!: string | undefined;
  image!: string | undefined;
  descriptions!: string | undefined;
  price!: number | undefined;
}
