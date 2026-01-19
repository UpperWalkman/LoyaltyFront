import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './Pages/login-form/login-form.component';
import { DxMenuModule } from 'devextreme-angular';
import { RegisterClientComponent } from './Pages/register-client/register-client.component';
import { HomeComponent } from './Pages/home/home.component';
import { CartComponent } from './Pages/cart/cart.component';
import { ArticlesComponent } from './Pages/articles/articles.component';
import { StoreComponent } from './Pages/store/store.component';
import { HomeStoreComponent } from './Pages/home-store/home-store.component';

const routes: Routes = [{
  path: 'login-form',
  component: LoginFormComponent,
}, {
    path: '',
    component: LoginFormComponent,
  }, {
    path: 'register-client',
    component: RegisterClientComponent,
  }, {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'homestore',
        component: HomeStoreComponent
      },
      {
        path: 'articles',
        component: ArticlesComponent
      },
      {
        path: 'store',
        component: StoreComponent
      }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
