import { Pais } from './../../common/pais';
import { DanicolnShopFormService } from './../../services/danicoln-shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compra } from 'src/app/common/compra';
import { Estado } from 'src/app/common/estado';
import { ItemPedido } from 'src/app/common/item-pedido';
import { Pedido } from 'src/app/common/pedido';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { DanicolnShopValidators } from 'src/app/validators/danicoln-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  precoTotal: number = 0;
  quantidadeTotal: number = 0;

  cartaoCreditoAno: number[] = [];
  cartaoCreditoMes: number[] = [];

  paises: Pais[] = [];

  enderecoEntregaEstados: Estado[] = [];
  enderecoCobrancaEstados: Estado[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private danicolnShopFormService: DanicolnShopFormService,
    private carrinhoService: CarrinhoService,
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.revisarDetalhesDoCarrinho();

    this.checkoutFormGroup = this.formBuilder.group({
      cliente: this.formBuilder.group({
        nome: new FormControl('',
          [
            Validators.required,
            Validators.minLength(2),
            DanicolnShopValidators.campoEmBranco
          ]),
        sobreNome: new FormControl('',
          [
            Validators.required,
            Validators.minLength(2),
            DanicolnShopValidators.campoEmBranco
          ]),
        email: new FormControl('',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      enderecoEntrega: this.formBuilder.group({
        logradouro: new FormControl('',[Validators.required, Validators.minLength(2),
          DanicolnShopValidators.campoEmBranco]),
        cidade: new FormControl('',[Validators.required, Validators.minLength(2),
          DanicolnShopValidators.campoEmBranco]),
        estado: new FormControl('',[Validators.required]),
        pais: new FormControl('',[Validators.required]),
        cep: new FormControl('',[Validators.required,
          DanicolnShopValidators.campoEmBranco]),
      }),
      enderecoCobranca: this.formBuilder.group({
        logradouro: new FormControl('',[Validators.required, Validators.minLength(2),
          DanicolnShopValidators.campoEmBranco]),
        cidade: new FormControl('',[Validators.required, Validators.minLength(2),
          DanicolnShopValidators.campoEmBranco]),
        estado: new FormControl('',[Validators.required]),
        pais: new FormControl('',[Validators.required]),
        cep: new FormControl('',[Validators.required,
          DanicolnShopValidators.campoEmBranco]),
      }),
      cartaoCredito: this.formBuilder.group({
        tipoCartao: new FormControl('',[Validators.required]),
        nomeCartao: new FormControl('',[Validators.required, Validators.minLength(2),
          DanicolnShopValidators.campoEmBranco]),
        numeroCartao: new FormControl('',[Validators.required, Validators.pattern('[0-9]{16}')]), // com a expressão regular, configuramos para verificar se tem até 16 dígitos
        codigoSeguranca: new FormControl('',[Validators.required, Validators.pattern('[0-9]{3}')]),
        mesExpiracao: [''],
        anoExpiracao: ['']
      }),
    });

    // popular cartaoCreditoMes
    const mesInicio: number = new Date().getMonth() + 1;
    //console.log("Mês início: " + mesInicio);

    this.danicolnShopFormService.getCartaoCreditoMes(mesInicio).subscribe(
      data => {
        //console.log("Cartão de crédito mês recuperado: " + JSON.stringify(data));
        this.cartaoCreditoMes = data;
      }
    )

    // popular cartaoCreditoAno
    this.danicolnShopFormService.getCartaoCreditoAno().subscribe(
      data => {
        //console.log("Cartão de crédito ano recuperado: " + JSON.stringify(data));
        this.cartaoCreditoAno = data;
      }
    )

    //popular paises

    this.danicolnShopFormService.getPaises().subscribe(
      data => {
        //console.log("País recuperado: " + JSON.stringify(data));
        this.paises = data;
      }
    );
  }
  revisarDetalhesDoCarrinho() {

    //subscribe para carrinhoService.quantidadeTotal
    this.carrinhoService.quantidadeTotal.subscribe(
      qtdeTotal => this.quantidadeTotal = qtdeTotal
    );

    //subscribe para carrinhoService.precoTotal
    this.carrinhoService.precoTotal.subscribe(
      valorTotal => this.precoTotal = valorTotal
    );
  }

  onSubmit() {
    console.log("Manipulando o botão submit");

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // setar o pedido
    let pedido = new Pedido();
    pedido.precoTotal = this.precoTotal;
    pedido.quantidadeTotal = this.quantidadeTotal;

    //pegar os itens do Carrinho
    const itensDoCarrinho = this.carrinhoService.itensCarrinhos;

    //criar o itemPedido de itemCarrinho
    //obs: Existe dois caminhos para fazer isso, longo caminho e curto caminho.
    //LONGO CAMINHO:
    /*let itensPedido: ItemPedido[] = [];
    for(let i = 0; i < itensCarrinhos.length; i++) {
      itensPedido[i] = new ItemPedido(itensCarrinhos[i]);
    }*/

    //CURTO CAMINHO:
    let itensDoPedido: ItemPedido[] = itensDoCarrinho.map(item => new ItemPedido(item));

    //setar a compra
    let compra = new Compra();

    // popular a compra - cliente
    compra.cliente = this.checkoutFormGroup.controls['cliente'].value;

    //popular a compra - enderecoEntrega
    compra.enderecoEntrega = this.checkoutFormGroup.controls['enderecoEntrega'].value;
    const enderecoEstado: Estado = JSON.parse(JSON.stringify(compra.enderecoEntrega.estado));
    const enderecoPais: Pais = JSON.parse(JSON.stringify(compra.enderecoEntrega.pais));
    compra.enderecoEntrega.estado = enderecoEstado.name;
    compra.enderecoEntrega.pais = enderecoPais.name;

    //popular a compra - enderecoCobranca
    compra.enderecoCobranca = this.checkoutFormGroup.controls['enderecoCobranca'].value;
    const enderecoCobrancaEstado: Estado = JSON.parse(JSON.stringify(compra.enderecoCobranca.estado));
    const enderecoCobrancaPais: Pais = JSON.parse(JSON.stringify(compra.enderecoCobranca.pais));
    compra.enderecoCobranca.estado = enderecoCobrancaEstado.name;
    compra.enderecoCobranca.pais = enderecoCobrancaPais.name;

    //popular a compra - pedido e itemPedido
    compra.pedido = pedido;
    compra.itemPedidos = itensDoPedido;

    //chamar API REST via CheckoutService
    this.checkoutService.realizarPedido(compra).subscribe(
      {
        next: response => {
          alert(`Seu pedido foi recebido.\nNúmero de rastreio de pedido: ${response.numeroRastreio}`);

          // reiniciar o carrinho.
          this.reiniciarCarrinho();
        },
        error: erro => {
          alert(`Ocorreu um erro: ${erro.message}`);
        }
      }
    );
  }
  reiniciarCarrinho() {
    // reiniciar os dados do carrinho
    this.carrinhoService.itensCarrinhos = [];
    this.carrinhoService.precoTotal.next(0);
    this.carrinhoService.quantidadeTotal.next(0);

    // reiniciar o formulário
    this.checkoutFormGroup.reset();

    //navegar para a página de prdutos
    this.router.navigateByUrl("/produtos");
  }

  get nome() {
    return this.checkoutFormGroup.get('cliente.nome');
  }

  get sobreNome() {
    return this.checkoutFormGroup.get('cliente.sobreNome');
  }

  get email() {
    return this.checkoutFormGroup.get('cliente.email');
  }

  get enderecoEntregaLogradouro() {
    return this.checkoutFormGroup.get('enderecoEntrega.logradouro');
  }

  get enderecoEntregaCidade() {
    return this.checkoutFormGroup.get('enderecoEntrega.cidade');
  }

  get enderecoEntregaEstado() {
    return this.checkoutFormGroup.get('enderecoEntrega.estado');
  }

  get enderecoEntregaCep() {
    return this.checkoutFormGroup.get('enderecoEntrega.cep');
  }

  get enderecoEntregaPais() {
    return this.checkoutFormGroup.get('enderecoEntrega.pais');
  }

  get enderecoCobrancaLogradouro() {
    return this.checkoutFormGroup.get('enderecoCobranca.logradouro');
  }

  get enderecoCobrancaCidade() {
    return this.checkoutFormGroup.get('enderecoCobranca.cidade');
  }

  get enderecoCobrancaEstado() {
    return this.checkoutFormGroup.get('enderecoCobranca.estado');
  }

  get enderecoCobrancaCep() {
    return this.checkoutFormGroup.get('enderecoCobranca.cep');
  }

  get enderecoCobrancaPais() {
    return this.checkoutFormGroup.get('enderecoCobranca.pais');
  }

  get cartaoCreditoTipo() {
    return this.checkoutFormGroup.get('cartaoCredito.tipoCartao');
  }
  get cartaoCreditoNome() {
    return this.checkoutFormGroup.get('cartaoCredito.nomeCartao');
  }
  get cartaoCreditoNumero() {
    return this.checkoutFormGroup.get('cartaoCredito.numeroCartao');
  }
  get cartaoCreditoCodigo() {
    return this.checkoutFormGroup.get('cartaoCredito.codigoSeguranca');
  }

  copiarEndereco(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['enderecoCobranca']
        .setValue(this.checkoutFormGroup.controls['enderecoEntrega'].value);

        //correção de bug para estados
         this.enderecoCobrancaEstados = this.enderecoEntregaEstados;

    }
    else {
      this.checkoutFormGroup.controls['enderecoCobranca'].reset();

      //correção de bug para estados
      this.enderecoCobrancaEstados = [];
    }
  }

  manipularMesEAno() {

    const cartaoCreditoFormGroup = this.checkoutFormGroup.get('cartaoCredito');

    const anoAtual: number = new Date().getFullYear();
    const anoSelecionado: number = Number(cartaoCreditoFormGroup.value.anoExpiracao);

    let mesInicio: number;

    if (anoAtual === anoSelecionado) {
      mesInicio = new Date().getMonth() + 1;
    }
    else {
      mesInicio = 1;
    }

    this.danicolnShopFormService.getCartaoCreditoMes(mesInicio).subscribe(
      data => {
        console.log("Cartão de crédito mês recuperado (met: manipularMesAno): " + JSON.stringify(data));
        this.cartaoCreditoMes = data;

      }
    );
  }

  getEstados(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const paisCode = formGroup.value.pais.code;
    const paisNome = formGroup.value.pais.name;

    console.log(`${formGroupName} codigo do País: ${paisCode}`);
    console.log(`${formGroupName} nome do País: ${paisNome}`);

    this.danicolnShopFormService.getEstados(paisCode).subscribe(
      data => {

        if(formGroupName === 'enderecoEntrega'){
          this.enderecoEntregaEstados = data;
        }
        else {
          this.enderecoCobrancaEstados = data;
        }

        //seleciona o primeiro item como padrão
        formGroup.get('estado').setValue(data[0]);
      }
    )
    }

}
