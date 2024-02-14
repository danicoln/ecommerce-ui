import { Cliente } from "./cliente";
import { Endereco } from "./endereco";
import { ItemPedido } from "./item-pedido";
import { Pedido } from "./pedido";

export class Compra {

  cliente: Cliente;
  enderecoEntrega: Endereco;
  enderecoCobranca: Endereco;
  pedido: Pedido;
  itemPedidos: ItemPedido[];
}
