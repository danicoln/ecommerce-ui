export class Produto {

  constructor(
    public sku: string,
    public nome: string,
    public descricao: string,
    public precoUnitario: number,
    public imagemUrl: string,
    public ativo: boolean,
    public emEstoque: number,
    public dataCriacao: Date,
    public dataAtualizacao: Date
  ){}
}
