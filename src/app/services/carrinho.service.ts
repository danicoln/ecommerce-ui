import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../common/item-carrinho';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  itensCarrinhos: ItemCarrinho[] = [];

  precoTotal: Subject<number> = new Subject<number>();
  quantidadeTotal: Subject<number> = new Subject<number>();

  constructor() { }

  adicionarAoCarrinho(itemCarrinho: ItemCarrinho) {
    //verificar se já existe o item no carrinho
    let itemJaNoCarrinho: boolean = false;
    let itemAtualNoCarrinho: ItemCarrinho = undefined;

    if (this.itensCarrinhos.length > 0) {
      //buscar o item no carrinho de acordo com o id do item
      for (let item of this.itensCarrinhos) {
        if (item.id === itemCarrinho.id) {
          itemAtualNoCarrinho = item;
          break;
        }
      }
      // verificar se foi encontrado
      itemJaNoCarrinho = (itemAtualNoCarrinho != undefined);
    }
    if(itemJaNoCarrinho){
      itemAtualNoCarrinho.quantidade++;
    }
    else{
      this.itensCarrinhos.push(itemCarrinho);
    }
    // calcular o preco total do carrinho e o total da quantidade.
    this.calcularCarrinhoTotal();
  }

  calcularCarrinhoTotal() {
    throw new Error('Method not implemented.');
  }
}
