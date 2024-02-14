import { ItemCarrinho } from "./item-carrinho";

export class ItemPedido {

  imageUrl: string;
  precoUnitario: number;
  quantidade: number;
  produtoId: string;

  constructor(itemCarrinho: ItemCarrinho){
    this.imageUrl = itemCarrinho.imageUrl;
    this.quantidade = itemCarrinho.quantidade;
    this.precoUnitario = itemCarrinho.precoUnitario;
    this.produtoId = itemCarrinho.id
  }
}
