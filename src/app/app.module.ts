import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxButtonModule, DxDataGridModule, DxDropDownButtonModule, DxFileUploaderModule, DxFormModule, DxLoadIndicatorModule, DxLoadPanelModule, DxNumberBoxModule, DxPopupModule, DxRangeSliderModule, DxScrollViewModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule, DxToolbarModule, DxValidatorModule } from 'devextreme-angular';
import { LoginFormComponent } from './Pages/login-form/login-form.component';
import { AuthService } from 'src/services';
import { HttpClientModule } from '@angular/common/http';
import { RegisterClientComponent } from './Pages/register-client/register-client.component';
import { HeaderComponent } from './Layout/header/header.component';
import { HomeComponent } from './Pages/home/home.component';
import { CartComponent } from './Pages/cart/cart.component';
import { ArticlesComponent } from './Pages/articles/articles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreComponent } from './Pages/store/store.component';
import { HomeStoreComponent } from './Pages/home-store/home-store.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterClientComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    ArticlesComponent,
    StoreComponent,
    HomeStoreComponent,
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
    DxLoadPanelModule,
    DxToolbarModule,
    DxFileUploaderModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxDropDownButtonModule,
    DxScrollViewModule,
    DxTemplateModule,
    DxRangeSliderModule,
    DxSelectBoxModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }  
