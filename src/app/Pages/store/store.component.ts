import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { AuthService } from 'src/services/auth.service';
import { Store } from 'src/services/Models/store.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  showModal = false;
  constructor(
    private authService: AuthService
  ) { }
  currentStore: Store = { id: 0, sucursal: '', direccion: '' };

  stores: any;
  selectedStoreId: number | undefined;
  sucursal: string = '';
  
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
    if (store.id && store.id > 0) {
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
  
  onStoreSelected(e: any) {
    const storeId = e.value;
    const store = this.stores.find((x: { idTienda: any; }) => x.idTienda == e.value);
    this.sucursal = store.sucursal;
  //this.filterByStore(storeId);
}

  async ngOnInit() {
    await this.GetData();
    if (this.stores.length > 0) {
      this.selectedStoreId = this.stores[0].idTienda;
      this.sucursal = this.stores[0].sucursal;
    }
  }

  async GetData() {
    // primero ubico la tiendas
    this.stores = await this.authService.getAllStores();
    
  }

  filterActiveStores() {
    
  }

  clearStoreFilter() {
    
  }

  newButtonStore() {
    this.showModal = true;
  }
}
