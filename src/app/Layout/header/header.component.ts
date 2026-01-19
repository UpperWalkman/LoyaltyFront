import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Pages/cart/cart.service';
import { AuthService } from 'src/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuOpen = false;
  user: string ='';
  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  get count() {
  return this.cartService.getCount();
}


  async ngOnInit() {
    this.getUserName();
  }

  /**Me dirijo a mi carrito */
  Cart() {
    this.router.navigate(['home/cart']);
  }

  goTo(route: string) {
    this.menuOpen = false
    this.router.navigate([`home/${route}`]);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  async getUserName() {
    const nombre = Number(localStorage.getItem('User'));
    const result = await this.authService.getClientName(nombre);

    this.user = result[0].nombre;
  }

  /**Salgo al login */
  exit() {
    localStorage.removeItem('token');
    localStorage.removeItem('User');

    this.router.navigate(['/login-form']);
  }
}
