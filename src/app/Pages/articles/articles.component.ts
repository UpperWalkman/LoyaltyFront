import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Articles } from './Models/articles.model';
import { MenuActions } from 'src/services/Models/menuactions.model';
import { AuthService } from 'src/services/auth.service';
import notify from 'devextreme/ui/notify';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  article: any;
  formData: any = {};
  idArticulo: string = 'idArticulo';
  showModal = false;
  currentArticle: Articles = {
  idArticulo: 0,
  codigo: '',
  descripcion: '',
  precio: 0,
  imagen: [],
  stock: 0
};
  dataSource: any;
  public pageSizes: number[] = [10, 20, 30, 50, 100];

  showImageModal = false;
  currentImage: string | null = null; // Base64 o URL

  /** Abro el modal para ver la imagen */
  async openImageModal(idArticulo: number) {
    const image = await this.authService.viewImage(idArticulo);
    this.currentImage = image;
    this.showImageModal = true;
  }

  /** Cierro el modal de la imagen */
  closeImageModal() {
    this.showImageModal = false;
    this.currentImage = null;
  }

  /** Abro el modal para agregar un nuevo articulo */
  public newButtonArticle() {
    this.openModal();
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    await this.GetData();
  }

  async GetData() {

    this.dataSource = new CustomStore({
      load: async () => {
        const result: Array<Articles> = await this.authService.getArticles();
        return result;
      },
      key: this.idArticulo
    });
  }

  
  async onGridReady() {
    console.log('Grid listo');
  }

  /** Agrego el articulo al carrito */
  addToCart(article: any) {
    this.cartService.add(article);
  }

  /** Acciones del menú */
  MenuActions: Array<MenuActions> = [
    { id: 1, text: 'Ver imagen', disabled: false },
    { id: 2, text: 'Editar', disabled: false },
    { id: 3, text: 'Eliminar', disabled: false }
  ];

  /** Manejo de las acciones del menú */
  async onItemClick(e: any, data: any) { 
    switch (e.itemData.id) {
      case 1:
        // Ver imagen
        this.openImageModal(data.row.data.idArticulo);
        break;
      case 2:
        // Editar
        await this.openModal(data.row.data);
        break;
      case 3:
        // Eliminar
        this.deleteArticle(data.row.data.idArticulo);
        break;
    }
  }

  onMenuButtonClick(e: any, data: Articles) { 
    console.log(data);
    console.log(e);
  }

  async deleteArticle(idArticulo: number) { 

    const confirm = window.confirm("¿Está seguro de que desea eliminar este artículo?");
    if (!confirm) {
      return;
    }

    const result = await this.authService.deleteArticle(idArticulo);
    console.log(result);

    notify({
      message: result.message,
      type: result.isOk ? 'success' : 'error',
      displayTime: 2000,
      position: {
        at: 'bottom center',
        my: 'bottom center',
      }
    });

    if (!result.isOk) {
      return;
    }

    this.GetData();
  }

  /** Abro el modal para agregar un nuevo articulo */
  async openModal(article?: Articles) {
    
    this.currentArticle = article ? { 
      idArticulo: article.idArticulo,
      codigo: article.codigo,
      descripcion: article.descripcion,
      precio: article.precio,
      imagen: [],
      stock: article.stock
     } : {
      idArticulo: 0,
      codigo: '',
      descripcion: '',
      precio: 0,
      imagen: [],
      stock: 0
    };
    this.showModal = true;
  }

  /** Cierro el modal */
  async closeModal() {
    this.showModal = false;
  }

  /** Guardo el articulo */
  async saveArticle(article: Articles) {
    console.log(article.imagen);

    if( article.idArticulo && article.idArticulo > 0 ) {
      // Actualizo
      this.UpdateArticle(article);
    }else{ this.InsertArticle(article);}
  }

  /** Actualizo el articulo */
  async UpdateArticle(article: Articles) {
    const articleModel: Articles = article;
    const result = await this.authService.updateArticle(articleModel);
    console.log(result);

    notify({
      message: result.message,
      type: result.isOk ? 'success' : 'error',
      displayTime: 2000,
      position: {
        at: 'bottom center',
        my: 'bottom center',
      }
    });

    if (!result.isOk) {
      return;
    }
    this.GetData();
    this.closeModal();
    return;
  }


  /** Inserto el articulo */
  async InsertArticle(article: Articles) {
    const articleModel: Articles = article;
    const result = await this.authService.newArticle(articleModel);
    console.log(result);

    notify({
      message: result.message,
      type: result.isOk ? 'success' : 'error',
      displayTime: 2000,
      position: {
        at: 'bottom center',
        my: 'bottom center',
      }
    });
    
    if ( !result.isOk ) {
      return;
    }

    this.GetData();
    this.closeModal();
  }
  
}
