import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
        codSeguranca: [''],
        mesExpiracao: [''],
        anoExpiracao: ['']
      }),
    });
  }

  onSubmit(){
    console.log("Manipulando o botão submit");
    console.log(this.checkoutFormGroup.get('cliente').value);
    console.log("O email é: " + this.checkoutFormGroup.get('cliente').value.email);
  }

  copiarEndereco(event){

    if(event.target.checked){
      this.checkoutFormGroup.controls['enderecoCobranca']
        .setValue(this.checkoutFormGroup.controls['enderecoEntrega'].value);
    }
    else{
      this.checkoutFormGroup.controls['enderecoCobranca'].reset();
    }
  }
}
