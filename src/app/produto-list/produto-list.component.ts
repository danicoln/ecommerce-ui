import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../common/produto';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list-table.component.html',
  //templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  produtos: Produto[];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.getProdutoList().subscribe(
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
