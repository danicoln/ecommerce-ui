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

  produtos: Produto[];
  categoriaAtualId: number = 1;
  categoriaAtual: string = ""; //Referente ao FAQ

  modoPesquisar: boolean = false;

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
        this.categoriaAtualId = +this.route.snapshot.paramMap.get('id')!;

        this.categoriaAtual = this.route.snapshot.paramMap.get('nome')!;
      }
      else {
        this.categoriaAtualId = 1;
        this.categoriaAtual = 'Books';
      }


      this.produtoService.getProdutoList(this.categoriaAtualId).subscribe(
        data => {
          if (data) {
            this.produtos = data;
          } else {

            console.error('Resposta do servidor vazia', data);
          }
        }
      )
    }

}
