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

  adicionarAoCarrinho(oItemDoCarrinho: ItemCarrinho) {
    //verificar se já existe o item no carrinho
    let itemNoCarrinho: boolean = false;
    let itemExistenteNoCarrinho: ItemCarrinho = undefined;

    if (this.itensCarrinhos.length > 0) {
      //buscar o item no carrinho de acordo com o id do item

      itemExistenteNoCarrinho = this.itensCarrinhos.find(item => item.id === oItemDoCarrinho.id)
    }
    // verificar se foi encontrado
    itemNoCarrinho = (itemExistenteNoCarrinho != undefined);

    if (itemNoCarrinho) {
      itemExistenteNoCarrinho.quantidade++;
    }
    else {
      this.itensCarrinhos.push(oItemDoCarrinho);
    }
    // calcular o preco total do carrinho e o total da quantidade.
    this.calcularCarrinhoTotal();
  }

  calcularCarrinhoTotal() {
    let valorPrecoTotal: number = 0;
    let valorQuantidadeTotal: number = 0;

    for (let itemCarrinhoAtual of this.itensCarrinhos) {
      valorPrecoTotal += itemCarrinhoAtual.quantidade * itemCarrinhoAtual.precoUnitario;
      valorQuantidadeTotal += itemCarrinhoAtual.quantidade;
    }
    // publicar os novos valores... todos subscribes precisam recebem os novos dados
    this.precoTotal.next(valorPrecoTotal);
    this.quantidadeTotal.next(valorQuantidadeTotal);

    // log para depuração
    this.logCartData(valorPrecoTotal, valorQuantidadeTotal);
  }

  logCartData(precoTotal: number, qtdTotal: number) {

    //console.log('Conteudo do carrinho');
    for (let item of this.itensCarrinhos) {
      const subtotal = item.quantidade * item.precoUnitario;
      console.log(`Nome: ${item.nome}, quantidade: ${item.quantidade}, Total: ${subtotal}`);
    }
    console.log(`Preço Total: ${precoTotal.toFixed(2)}, Quantidade Total: ${qtdTotal}`);
    console.log('-------------')
  }

  decrementarQuantidade(item: ItemCarrinho) {
    item.quantidade--;

    if(item.quantidade === 0){
      this.remove(item);
    }
    else{
      this.calcularCarrinhoTotal();
    }
  }

  remove(item: ItemCarrinho){
    //pegar o indice do item no array
    const indice = this.itensCarrinhos.findIndex(itemDoCarrinho => itemDoCarrinho.id === item.id);

    //se encontrar, remover o item do array passando o indice.
    if(indice > -1) {
      this.itensCarrinhos.splice(indice, 1);

      this.calcularCarrinhoTotal();
    }
  }

}
