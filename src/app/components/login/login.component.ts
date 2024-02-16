import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn, { WidgetOptions } from '@okta/okta-signin-widget';
import meuAppConfig from 'src/app/config/meu-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;
  opt: WidgetOptions;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: meuAppConfig.openIdConnect.issuer.split('/oauth2')[0],
      clientId: meuAppConfig.openIdConnect.clientId,
      redirectUri: meuAppConfig.openIdConnect.redirectUri,
      authParams: {
        /**PCKE: chave de prova para troca de código.
        Uso de segredos dinâmicos para passar as info entre o cliente e
        o servidor de autorização*/
        pkce: true,
        issuer: meuAppConfig.openIdConnect.issuer,
        scopes: meuAppConfig.openIdConnect.scopes
      }
    });
   }

  ngOnInit(): void {
  }

}
