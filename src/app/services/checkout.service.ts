import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../common/compra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private compraUrl = 'http://localhost:8080/api/checkout/compra';

  constructor(
    private httpClient: HttpClient
  ) { }

  realizarPedido(compra: Compra): Observable<any> {
    return this.httpClient.post<Compra>(this.compraUrl, compra);
  }
}
