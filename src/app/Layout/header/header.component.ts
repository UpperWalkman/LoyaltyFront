import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Pages/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuOpen = false;
  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  get count() {
  return this.cartService.getCount();
}


  ngOnInit(): void {
  }

  /**Me dirijo a mi carrito */
  Cart() {
    this.router.navigate(['/cart']);
  }

  goTo(route: string) {
    this.menuOpen = false
    this.router.navigate([route]);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
