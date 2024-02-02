import { Produto } from "./produto";

export class ItemCarrinho {

  id: string;
  nome: string;
  imagemUrl: string;
  precoUnitario: number;
  quantidade: number;

  constructor(produto: Produto){
    this.id = produto.id;
    this.nome = produto.nome;
    this.imagemUrl = produto.imagemUrl;
    this.precoUnitario = produto.precoUnitario;

    this.quantidade = 1;
  }
}
