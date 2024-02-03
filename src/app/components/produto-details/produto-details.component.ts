import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCarrinho } from 'src/app/common/item-carrinho';
import { Produto } from 'src/app/common/produto';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-details',
  templateUrl: './produto-details.component.html',
  styleUrls: ['./produto-details.component.css']
})
export class ProdutoDetailsComponent implements OnInit {

  produto!: Produto; //= new Produto() ------ Se der alguma erro, pode ser isso.

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProdutoDetails();
    })
  }

  handleProdutoDetails() {

    // obter a string do parametro id e converter para um numero usando +
    const produtoId: number = +this.route.snapshot.paramMap.get('id')!;

    this.produtoService.getProduto(produtoId).subscribe(
      data => {
        this.produto = data;
      }
    )
  }

  adicionarAoCarrinho(){
    console.log(`Adicionando ao carrinho: ${this.produto.nome}, ${this.produto.precoUnitario}`);

    const oItemDoCarrinho = new ItemCarrinho(this.produto);
    this.carrinhoService.adicionarAoCarrinho(oItemDoCarrinho);
  }

}
