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

  getProdutoListPaginate(
    page: number,
    pageSize: number,
    categoriaId: number): Observable<GetResponseProdutos> {

    //precisa construir uma URL baseada no id da categoria, pagina e size.
    const searchUrl = `${this.url}/search/findByCategoriaId?id=${categoriaId}`
          + `&page=${page}&size=${pageSize}`;

    return this.http.get<GetResponseProdutos>(searchUrl);
  }


  getProdutoList(categoriaId: number): Observable<Produto[]> {

    //precisa construir uma URL baseada no id da categoria
    const searchUrl = `${this.url}/search/findByCategoriaId?id=${categoriaId}`;

    return this.getProdutos(searchUrl);
  }

  pesquisarProdutos(keyword: string): Observable<Produto[]> {
    //precisa construir uma URL baseada na palavra-chave
    const searchUrl = `${this.url}/search/findByNomeContaining?nome=${keyword}`;

    return this.getProdutos(searchUrl);

  }

  pesquisarProdutoPaginate(
    page: number,
    pageSize: number,
    palavraChave: string): Observable<GetResponseProdutos> {

    //precisa construir uma URL baseada no id da keyword, pagina e size.
    const searchUrl = `${this.url}/search/findByNomeContaining?nome=${palavraChave}`
          + `&page=${page}&size=${pageSize}`;

    return this.http.get<GetResponseProdutos>(searchUrl);
  }

  private getProdutos(searchUrl: string): Observable<Produto[]> {
    return this.http.get<GetResponseProdutos>(searchUrl).pipe(
      //tap(response => console.log(response)),
      map(response => response._embedded.produtos)
    );
  }

  getCategoriaDeProdutos(): Observable<CategoriaProduto[]> {

    return this.http.get<GetResponseCategoriaDeProduto>(this.categoriaUrl).pipe(
      tap(response => console.log(response)),
      map(response => response._embedded.categoriaProduto)
    );
  }

  getProduto(produtoId: number) : Observable<Produto>{

    // precisamos construir uma url baseada no id do produto.
    const produtoUrl = `${this.url}/${produtoId}`;

    return this.http.get<Produto>(produtoUrl);
  }


}
interface GetResponseProdutos {
  _embedded: {
    produtos: Produto[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseCategoriaDeProduto {
  _embedded: {
    categoriaProduto: CategoriaProduto[];
  }
}
