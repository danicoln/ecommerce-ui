import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Produto } from '../common/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = 'http://localhost:8080/api/produtos';

  constructor(private http: HttpClient) { }

  getProdutoList(): Observable<Produto[]>{
    return this.http.get<GetResponse>(this.url).pipe(
      map(response => response._embedded.produtos)
    );
  }

}

interface GetResponse{
  _embedded: {
    produtos: Produto[];
  }
}
