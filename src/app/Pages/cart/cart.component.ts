import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { CartService } from './cart.service';
import { CartModel } from 'src/services/Models/cart.model';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  total = 0;
  items: CartModel[] = [];
  constructor(

    private authService: AuthService,
        private cartService: CartService
  ) { }

  async ngOnInit() {
    this.refreshItemsInCart();
  }

  /**aqui dibujo los articulos en el carrito */
  refreshItemsInCart() {
    this.items = this.cartService.getItems();
    this.total = 0;
    if (this.items.length) {
      const itemsFiltered: CartModel[] = [];
      this.items.forEach((item: CartModel) => {
        const exist = itemsFiltered.find((iteme: any) => iteme.articulo === item.articulo && iteme.tienda == item.tienda);
        
        if (!exist) {
          itemsFiltered.push({ ... item, cantidad: 1, idCliente: Number(localStorage.getItem('User'))});
        } else {
          exist.cantidad++;
        }

        this.total = this.total + item.precio;
      });

      this.items = itemsFiltered;
    }
  }

  /**aqui quito articulo del carrito por el id */
  async remove(id: number) {
    await this.clear();
    this.items = this.items.filter((item: CartModel) => item.idArticulo !== id);
    for (let i = 0; i < this.items.length; i++){
      this.cartService.add(this.items[i]);
    }
    this.refreshItemsInCart();
  }

  /** aqui limpio mi carrito */
  async clear() {
    this.cartService.clear();
  }

  /**aqui guardo los articulos al cliente */
  async saveArticlesInClient() {
    const result = await this.authService.saveArticleInClient(this.items);

    notify({
      message: result.message ,
      type: result.isOk ? 'success'  : 'error',
      displayTime: 2000,
      position: {
        at: 'bottom center',
        my: 'bottom center',
      }
    });

    await this.clear();
    this.refreshItemsInCart();
  }

}
