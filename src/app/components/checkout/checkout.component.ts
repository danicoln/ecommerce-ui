import { Pais } from './../../common/pais';
import { DanicolnShopFormService } from './../../services/danicoln-shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estado } from 'src/app/common/estado';
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
    private danicolnShopFormService: DanicolnShopFormService
  ) { }

  ngOnInit(): void {

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

  onSubmit() {
    console.log("Manipulando o botão submit");

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('cliente').value);
    console.log("O email é: " + this.checkoutFormGroup.get('cliente').value.email);

    console.log("O País do endereço de entrega é: " + this.checkoutFormGroup.get('enderecoEntrega').value.pais.name);
    console.log("O Estado do endereço de entrega é: " + this.checkoutFormGroup.get('enderecoEntrega').value.estado.name);

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
