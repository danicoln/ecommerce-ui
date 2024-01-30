import { Component, OnInit } from '@angular/core';
import { CategoriaProduto } from 'src/app/common/categoria-produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-categoria-produto-menu',
  templateUrl: './categoria-produto-menu.component.html',
  styleUrls: ['./categoria-produto-menu.component.css']
})
export class CategoriaProdutoMenuComponent implements OnInit {

  categoriaProduto: CategoriaProduto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {

    this.listaDeCategoriaDeProdutos();
  }

  listaDeCategoriaDeProdutos(){
    this.produtoService.getCategoriaDeProdutos().subscribe(
      dados => {
        console.log('Categoria de Produto=' + JSON.stringify(dados));
        this.categoriaProduto = dados;
      }
    );
  }

}
