import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  addToCart(article: any) {
    this.cartService.add(article);
  }
  
}
