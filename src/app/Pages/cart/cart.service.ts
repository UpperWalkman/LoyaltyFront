import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {

    private items: any[] = [];

    /**aqui agrego al carrito */
    add(article: any) {
        this.items.push(article);
    }

    /**aqui obtengo los articulos del carrito */
    getItems() {
        return this.items;
    }

    /**aqui limpio el carrito */
    clear() {
        this.items = [];
    }
    
    getCount() {
        return this.items.length;
    }

}
