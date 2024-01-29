import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Produto } from '../common/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = 'http://localhost:8080/api/produtos';

  constructor(private http: HttpClient) { }

  getProdutoList(categoriaId: number): Observable<Produto[]> {

    //precisa construir uma URL baseada no id da categoria
    const searchUrl = `${this.url}/search/findByCategoriaId?id=${categoriaId}`;

    return this.http.get<GetResponse>(searchUrl).pipe(
      tap(response => console.log(response)),
      map(response => response._embedded.produtos)
    );
  }


}
export interface GetResponse {
  _embedded: {
    produtos: Produto[];
  }
}
