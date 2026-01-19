import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { CartService } from '../cart/cart.service';
import { HomeStore } from 'src/services/Models/homestore.model';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-home-store',
  templateUrl: './home-store.component.html',
  styleUrls: ['./home-store.component.scss']
})
export class HomeStoreComponent implements OnInit {

  articles: HomeStore[] = []
  constructor(
    private authService: AuthService,
    private cardService: CartService

  ) { }

  async ngOnInit() {
    await this.GetData();
  }

  /**aqui extraigo los articulos y tienda */
  async GetData() {
    const result = await this.authService.getArticlesStore();
    var dd = result.Articles;
    this.articles = result.Articles ;

  }

  /**aqui agrego al carrito y cuento las veces que se agrego */
  addCart(item: any) {
    var dd = item;
    this.cardService.add(item);
    this.cardService.getCount();


    notify({
      message: `Agregaste ${item.articulo} al carrito` ,
      type: 'success' ,
      displayTime: 2000,
      position: {
        at: 'bottom center',
        my: 'bottom center',
      }
    });
  }
}
