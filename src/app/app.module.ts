import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxLoadIndicatorModule, DxLoadPanelModule, DxValidatorModule } from 'devextreme-angular';
import { LoginFormComponent } from './Pages/login-form/login-form.component';
import { AuthService } from 'src/services';
import { HttpClientModule } from '@angular/common/http';
import { RegisterClientComponent } from './Pages/register-client/register-client.component';
import { HeaderComponent } from './Layout/header/header.component';
import { HomeComponent } from './Pages/home/home.component';
import { CartComponent } from './Pages/cart/cart.component';
import { ArticlesComponent } from './Pages/articles/articles.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterClientComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxFormModule,
    DxDataGridModule,
    DxLoadIndicatorModule,
    DxButtonModule,
    DxValidatorModule,
    DxLoadPanelModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }  
