import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../common/produto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list-grid.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  produtos: Produto[] = [];
  categoriaIdAtual: number = 1;
  categoriaIdAnterior: number = 1;
  categoriaAtual: string = ""; //Referente ao FAQ

  modoPesquisar: boolean = false;

  //novas propriedades para paginação
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listarProdutos();
    });
  }

  listarProdutos() {
    this.modoPesquisar = this.route.snapshot.paramMap.has('keyword');

    if(this.modoPesquisar){
      this.handlePesquisarProdutos();
    }
    else {
      this.handleProdutoList();
    }
  }
  handlePesquisarProdutos() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //pesquisar produtos usando a palavra-chave (keyword)
    this.produtoService.pesquisarProdutos(keyword).subscribe(
      dados => {
        this.produtos = dados;
      }
    )
  }

    handleProdutoList(){

      //verificar se o id é valido
      const existeCategoriaId: boolean = this.route.snapshot.paramMap.has('id');
      //obs: no this.route, Usamos o ActivateRoute, em seguida o estado da rota neste exato momento, paramMap mapeia os parâmetros da rota e com o "has", lemos o parâmetro

      if (existeCategoriaId) {
        //pega o id string e conver em numero, usando "+"
        this.categoriaIdAtual = +this.route.snapshot.paramMap.get('id')!;

        this.categoriaAtual = this.route.snapshot.paramMap.get('nome')!;
      }
      else {
        this.categoriaIdAtual = 1;
        this.categoriaAtual = 'Books';
      }

      //verificar se tem uma categoria diferente

      if(this.categoriaIdAnterior != this.categoriaIdAtual){
        this.pageNumber = 1;
      }

      this.categoriaIdAnterior = this.categoriaIdAtual;

      console.log(`categoriaIdAtual=${this.categoriaIdAtual}, pageNumber=${this.pageNumber}`);

      // agora obtemos o produto dado o id da categoria

      this.produtoService.getProdutoListPaginate(
          this.pageNumber - 1,
          this.pageSize,
          this.categoriaIdAtual)
          .subscribe(
            data => {
              this.produtos = data._embedded.produtos;
              this.pageNumber = data.page.number + 1;
              this.pageSize = data.page.size;
              this.totalElements = data.page.totalElements;
            }
          );
    }

}
