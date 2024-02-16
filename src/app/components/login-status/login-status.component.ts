import { OktaAuth } from '@okta/okta-auth-js';
import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAutenticado: boolean = false;
  nomeCompleto: string = '';

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
    ) { }

  ngOnInit(): void {

    //(Subscribe) Assinar o estado de autenticação para alterações de estados neste serviço OktaService
    this.oktaAuthService.authState$.subscribe(
      (resultado) => {
        this.isAutenticado = resultado.isAuthenticated!;
        this.getDetalhesDoUsuario();
      }
    )
  }
  getDetalhesDoUsuario() {
    if(this.isAutenticado) {

      //
      //
      this.oktaAuth.getUser().then(
        (resultado) => {
          this.nomeCompleto = resultado.name as string;
        }
      )
    }
  }

  logout(){
    //Encerrar a sessão com Okta e remover tokens atuais;
    this.oktaAuth.signOut();
  }

}
