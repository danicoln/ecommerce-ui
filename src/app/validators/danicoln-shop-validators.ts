import { FormControl, ValidationErrors } from "@angular/forms";

export class DanicolnShopValidators {

  //espaço em branco

  static campoEmBranco(control: FormControl): ValidationErrors {

    //vericiar se a string tem apenas espaços em brancos
    if((control.value != null) && (control.value.trim().length === 0)) {

      //invalido, retornar o erro do objeto
      return {'campoEmBranco' : true };
    }
    else{
      //valido, retorna null;
      return null;
    }
  }
}
