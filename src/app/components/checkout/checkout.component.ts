import { Pais } from './../../common/pais';
import { DanicolnShopFormService } from './../../services/danicoln-shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Estado } from 'src/app/common/estado';

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
        nome: [''],
        sobreNome: [''],
        email: ['']
      }),
      enderecoEntrega: this.formBuilder.group({
        logradouro: [''],
        cidade: [''],
        estado: [''],
        pais: [''],
        cep: ['']
      }),
      enderecoCobranca: this.formBuilder.group({
        logradouro: [''],
        cidade: [''],
        estado: [''],
        pais: [''],
        cep: ['']
      }),
      cartaoCredito: this.formBuilder.group({
        tipoCartao: [''],
        nomeCartao: [''],
        numeroCartao: [''],
        codigoSeguranca: [''],
        mesExpiracao: [''],
        anoExpiracao: ['']
      }),
    });

    // popular cartaoCreditoMes
    const mesInicio: number = new Date().getMonth() + 1;
    console.log("Mês início: " + mesInicio);

    this.danicolnShopFormService.getCartaoCreditoMes(mesInicio).subscribe(
      data => {
        console.log("Cartão de crédito mês recuperado: " + JSON.stringify(data));
        this.cartaoCreditoMes = data;
      }
    )

    // popular cartaoCreditoAno
    this.danicolnShopFormService.getCartaoCreditoAno().subscribe(
      data => {
        console.log("Cartão de crédito ano recuperado: " + JSON.stringify(data));
        this.cartaoCreditoAno = data;
      }
    )

    //popular paises

    this.danicolnShopFormService.getPaises().subscribe(
      data => {
        console.log("País recuperado: " + JSON.stringify(data));
        this.paises = data;
      }
    );
  }

  onSubmit() {
    console.log("Manipulando o botão submit");
    console.log(this.checkoutFormGroup.get('cliente').value);
    console.log("O email é: " + this.checkoutFormGroup.get('cliente').value.email);
  }

  copiarEndereco(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['enderecoCobranca']
        .setValue(this.checkoutFormGroup.controls['enderecoEntrega'].value);
    }
    else {
      this.checkoutFormGroup.controls['enderecoCobranca'].reset();
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
    console.log(`${formGroupName} noem do País: ${paisNome}`);

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
