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
      })
    });
  }

  onSubmit(){
    console.log("Manipulando o botão submit");
    console.log(this.checkoutFormGroup.get('cliente').value);
    console.log("O email é: " + this.checkoutFormGroup.get('cliente').value.email);
  }

}
