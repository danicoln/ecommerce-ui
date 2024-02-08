import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pais } from '../common/pais';
import { Estado } from '../common/estado';

@Injectable({
  providedIn: 'root'
})
export class DanicolnShopFormService {

  private paisesUrl = 'http://localhost:8080/api/paises';
  private estadosUrl = 'http://localhost:8080/api/estados';

  constructor(private httpClient: HttpClient) { }

  getPaises(): Observable<Pais[]> {

    return this.httpClient.get<GetResponsePaises>(this.paisesUrl).pipe(
      map(response => response._embedded.paises)
    );
  }

  getEstados(codePais: string): Observable<Estado[]> {

    //busca url
    const searchEstadosUrl = `${this.estadosUrl}/search/findByPaisCode?code=${codePais}`;

    return this.httpClient.get<GetResponseEstados>(searchEstadosUrl).pipe(
      map(response => response._embedded.estados)
    );

  }



  getCartaoCreditoMes(mesInicio: number): Observable<number[]> {

    let data: number[] = [];

    for (let mes = mesInicio; mes <= 12; mes++) {
      data.push(mes);
    }

    /** ver obs de observável */
    return of(data);
  }

  getCartaoCreditoAno(): Observable<number[]> {

    let data: number[] = [];

    const anoInicio: number = new Date().getFullYear(); //Obteremos o ano atual na qual o usuario está.
    const anoFim: number = anoInicio + 10;

    for (let ano = anoInicio; ano <= anoFim; ano++) {
      data.push(ano);
    }

    /** ver obs de observável */
    return of(data);
  }

}

interface GetResponsePaises {
  _embedded: {
    paises: Pais[];
  }
}

interface GetResponseEstados {
  _embedded: {
    estados: Estado[];
  }
}

/** =========================================================================== */

/** Observação de observável
 *
 * Estamos usando Observable, porque o componente vai se inscrever (subscribe) para este método
 * para receber os dados assícronos.
*/
