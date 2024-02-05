import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from 'src/app/common/item-carrinho';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho-details',
  templateUrl: './carrinho-details.component.html',
  styleUrls: ['./carrinho-details.component.css']
})
export class CarrinhoDetailsComponent implements OnInit {

  itensDoCarrinho: ItemCarrinho[] = [];
  precoTotal: number = 0;
  quantidadeTotal: number = 0;

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.listCarrinhoDetails();
  }

  listCarrinhoDetails(){
    //precisamos controlar os itens do carrinho
    this.itensDoCarrinho = this.carrinhoService.itensCarrinhos;

    //inscrever o preço total
    this.carrinhoService.precoTotal.subscribe(
      dados => this.precoTotal = dados
    );

    //inscrever a quantidade total
      this.carrinhoService.quantidadeTotal.subscribe(
        dados => this.quantidadeTotal = dados
      );
    // calcular o preço e quantidade total
    this.carrinhoService.calcularCarrinhoTotal();
  }

}
