import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/common/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-details',
  templateUrl: './produto-details.component.html',
  styleUrls: ['./produto-details.component.css']
})
export class ProdutoDetailsComponent implements OnInit {

  produto!: Produto;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProdutoDetails();
    })
  }

  handleProdutoDetails() {

    // obter a string do parametro id e converter para um numero usando +
    const produtoId: number = +this.route.snapshot.paramMap.get('id')!;

    this.produtoService.getProduto(produtoId).subscribe(
      data => {
        this.produto = data;
      }
    )
  }

}
