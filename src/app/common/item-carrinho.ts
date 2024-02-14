import { Produto } from "./produto";

export class ItemCarrinho {

  id: string;
  nome: string;
  imageUrl: string;
  precoUnitario: number;
  quantidade: number;

  constructor(produto: Produto){
    this.id = produto.id;
    this.nome = produto.nome;
    this.imageUrl = produto.imagemUrl;
    this.precoUnitario = produto.precoUnitario;

    this.quantidade = 1;
  }
}
