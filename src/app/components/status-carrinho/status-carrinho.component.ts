import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from './../../services/carrinho.service';

@Component({
  selector: 'app-status-carrinho',
  templateUrl: './status-carrinho.component.html',
  styleUrls: ['./status-carrinho.component.css']
})
export class StatusCarrinhoComponent implements OnInit {

  precoTotal: number = 0.00;
  quantidadeTotal: number = 0;

  constructor(
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.atualizarStatusCarrinho();
  }

  atualizarStatusCarrinho() {

    //inscrever o preço total do carrinho
    this.carrinhoService.precoTotal.subscribe(
      dados => this.precoTotal = dados
    );

    //inscrever a quantidade total do carrinho
    this.carrinhoService.quantidadeTotal.subscribe(
      dados => this.quantidadeTotal = dados
    );
  }

}
