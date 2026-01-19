import { Component, OnInit, ViewChild } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import notify from 'devextreme/ui/notify';
import { AuthService } from 'src/services/auth.service';
import { Store } from 'src/services/Models/store.model';
import { Articles } from '../articles/Models/articles.model';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  @ViewChild('DataGridArticles', { static: false }) dataGridArticles!: DxDataGridComponent;
  showModal = false;
  dataSourceArticleInStore: any;
  checkBoxesMode: string = 'always';
  dataSourceArticles: any;
  showModalAddArticles = false;

  public pageSizes: number[] = [10, 20, 30, 50, 100];
  constructor(
    private authService: AuthService
  ) { }
  currentStore: Store = { idTienda: 0, sucursal: '', direccion: '' };

  stores: any;
  selectedStoreId: number | undefined;
  sucursal: string = '';
  direccion: string = '';
  
  onStoreItemClick(e: any) {
  switch (e.itemData.action) {
    case "filterActive":
      this.filterActiveStores();
      break;
    case "clearFilter":
      this.clearStoreFilter();
      break;
    case "addStore":
      //this.openAddStoreModal();
      break;
  }
  }

      /** Cierro el modal */
  async closeModal() {
    this.showModal = false;
  }

  /** aqui guardo las nuevas tiendas y edito */
  saveStore(store: Store) {
    if (store.idTienda && store.idTienda > 0) {
      this.updateStore(store)
    } else {
      this.InsertStore(store);
    }
    this.showModal = false;
  }

  /** actualizo los datos de la tienda */
  async updateStore(store: Store) {
    const result = await this.authService.updateStore(store)

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

  /** agregdo nueva tienda */
  async InsertStore(store: Store) {
    const result = await this.authService.newStore(store)

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
  
  async onStoreSelected(e: any) {
    const storeId = e.value;
    const store = this.stores.find((x: { idTienda: any; }) => x.idTienda == e.value);
    this.sucursal = store.sucursal;
    await this.GetDataArticlesInStore(storeId);
  //this.filterByStore(storeId);
}

  async ngOnInit() {
    await this.GetData();
    if (this.stores.length > 0) {
      this.selectedStoreId = this.stores[0].idTienda;
      this.sucursal = this.stores[0].sucursal;
      this.direccion = this.stores[0].direccion;
      await this.GetDataArticlesInStore(this.selectedStoreId);
    }
  }

  /**Extraigo solo las tiendsas */
  async GetData() {    
    this.stores = await this.authService.getAllStores();
  }

  async GetDataArticlesInStore(idStore: number = 0) {
    this.dataSourceArticleInStore = new CustomStore({
      load: async () => {
        const response = await this.authService.getArticlesInStore(idStore);
        return response.Articles;
      },
      key: 'idArticulo'
    });
  }

  filterActiveStores() {
    
  }

  clearStoreFilter() {
    
  }

  /**muestra modal para nueva tienda */
  newButtonStore() {
    this.showModal = true;
  }

  /**muestra modal para editar tienda */
  updateButtonStore() {
    this.showModal = true;
    this.currentStore.idTienda = this.selectedStoreId ? this.selectedStoreId : 0;
    this.currentStore.sucursal = this.sucursal;
    this.currentStore.direccion = this.direccion;
  }

  /** se elimina tienda */
  async deleteButtonStore() {
    const confirm = window.confirm(`¿Está seguro de que desea eliminar esta tienda: ${this.sucursal} ?`);
    if (!confirm) {
      return;
    }
    const result = await this.authService.deleteStore(this.selectedStoreId)
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
    await this.GetDataArticlesInStore(this.selectedStoreId);
  }

  async newButtonArticles() {
    await this.getAllArticles();
    this.showModalAddArticles = true;
  }

  /** cierro modal de agregar articulos */
  closeModalArticles() {
    this.showModalAddArticles = false;
  }

  /** guardo la relacion de los articulos con la tienda */
  async saveArticleInStore() {
    const dataSelected = await this.dataGridArticles.instance.getSelectedRowsData();
    const result = await this.authService.setArticlesInStore(dataSelected, this.selectedStoreId);

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
    await this.GetDataArticlesInStore(this.selectedStoreId);
    this.closeModalArticles();
  }

  async getAllArticles() {
    this.dataSourceArticles = new CustomStore({
       load: async () => {
        const response = await this.authService.getArticles();
        return response;
      },
      key: 'idArticulo'
    });
  }
}
