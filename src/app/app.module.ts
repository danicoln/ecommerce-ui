import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoService } from './services/produto.service';
import { CategoriaProdutoMenuComponent } from './components/categoria-produto-menu/categoria-produto-menu.component';
import { PesquisarComponent } from './components/pesquisar/pesquisar.component';
import { ProdutoDetailsComponent } from './components/produto-details/produto-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusCarrinhoComponent } from './components/status-carrinho/status-carrinho.component';
import { CarrinhoDetailsComponent } from './components/carrinho-details/carrinho-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import meuAppConfig from './config/meu-app-config';

const oktaConfig = meuAppConfig.openIdConnect;
const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [

  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},

  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CarrinhoDetailsComponent},
  {path: 'produtos/:id', component: ProdutoDetailsComponent},
  {path: 'pesquisar/:keyword', component: ProdutoListComponent},
  {path: 'categoria/:id/:nome', component: ProdutoListComponent},
  {path: 'categoria', component: ProdutoListComponent},
  {path: 'produtos', component: ProdutoListComponent},
  {path: '', redirectTo: '/produtos', pathMatch: 'full'},
  {path: '**', redirectTo: '/produtos', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProdutoListComponent,
    CategoriaProdutoMenuComponent,
    PesquisarComponent,
    ProdutoDetailsComponent,
    StatusCarrinhoComponent,
    CarrinhoDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    NgbModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProdutoService, {provide: OKTA_CONFIG, useValue:{oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
