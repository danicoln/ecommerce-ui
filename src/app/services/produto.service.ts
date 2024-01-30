import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Produto } from '../common/produto';
import { CategoriaProduto } from '../common/categoria-produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = 'http://localhost:8080/api/produtos';

  private categoriaUrl = 'http://localhost:8080/api/categoria-produto';

  constructor(private http: HttpClient) { }

  getProdutoList(categoriaId: number): Observable<Produto[]> {

    //precisa construir uma URL baseada no id da categoria
    const searchUrl = `${this.url}/search/findByCategoriaId?id=${categoriaId}`;

    return this.http.get<GetResponseProdutos>(searchUrl).pipe(
      tap(response => console.log(response)),
      map(response => response._embedded.produtos)
    );
  }

  getCategoriaDeProdutos(): Observable<CategoriaProduto[]> {

    return this.http.get<GetResponseCategoriaDeProduto>(this.categoriaUrl).pipe(
      map(response => response._embedded.categoriasDeProduto)
    );
  }


}
interface GetResponseProdutos {
  _embedded: {
    produtos: Produto[];
  }
}

interface GetResponseCategoriaDeProduto {
  _embedded: {
    categoriasDeProduto: CategoriaProduto[];
  }
}
