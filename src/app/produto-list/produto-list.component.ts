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

    //verificar se o id é valido
    const existeCategoriaId: boolean = this.route.snapshot.paramMap.has('id');
    //obs: no this.route, Usamos o ActivateRoute, em seguida o estado da rota neste exato momento, paramMap mapeia os parâmetros da rota e com o "has", lemos o parâmetro

    if(existeCategoriaId){
      //pega o id string e conver em numero, usando "+"
      this.categoriaAtualId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.categoriaAtualId = 1;
    }


    this.produtoService.getProdutoList(this.categoriaAtualId).subscribe(
      data => {
        if(data){
          this.produtos = data;
        } else{

          console.error('Resposta do servidor vazia', data);
        }
      }
    )
  }
}
