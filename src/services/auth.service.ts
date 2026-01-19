import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from './Models/usuario.model';
import { RegisterUser } from './Models/register.model';
import { Articles } from 'src/app/Pages/articles/Models/articles.model';
import { Store } from './Models/store.model';
import { ArticlesInStore } from './Models/articlesinstore.model';
import { CartModel } from './Models/cart.model';

export interface IUser {
  email: string;
  avatarUrl?: string
}

const defaultPath = '/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient) { }

  private baseUrl: string = environment.urlApi;


  /**Aqui se maneja la autenticación de usuarios */
  async logIn(dataUser: Usuario): Promise<{ isOk: boolean; data: any | null; message: string }> {

    try {
      
      if (!dataUser.email || !dataUser.contrasenia) {
        return {
          isOk: false,
          data: null,
          message: 'Complete todos los campos.'
        }
      }

      const result = await this.http.post<any>(`${this.baseUrl}/api/usuarios/GetAuthUser`, dataUser).toPromise();

      if (result) {

        localStorage.setItem('User', result.usuarios)
        return {
          isOk: true,
          data: result,
          message: 'Usuario autenticado correctamente.'
        }
      }
      
      return {
        isOk: false,
        data: [],
        message: 'Usuario no válido.'
      };
    }
    catch {
      return {
        isOk: false,
        message: "Autenticidad no es posible.",
        data: null
      };
    }
  }

  /**obtengo el nombre del usuario */
  async getClientName(user: number = 0) {
    
    return await this.http.get<any>(`${this.baseUrl}/api/clientes/GetById/${user}`).toPromise();
  }

  /** aqui guardo la relacion de los articulos al cliente */
  async saveArticleInClient(cart: CartModel[]): Promise<{ isOk: boolean; message: string }> {
    try {

      const result = await this.http.post<any>(`${this.baseUrl}/api/clientearticulo/NewClienteArticulo`, cart).toPromise();

      return {
        isOk: result,
        message: result ? 'Articulos comprados' : 'Nose realizo la compra de los articulos',
      }
    } catch (ex) {
      console.log(ex);
      return {
        isOk: false,
        message: 'No se pudo realizar la compra'
      }
      
    }
  }

  //#region tienda

  async setArticlesInStore(dataSelected: any, idStore: number = 0) {

    const payload: ArticlesInStore[] = dataSelected.map((x: any) => ({
      ...x,
      idTienda: idStore
    }));
    const result = await this.http.post<any>(`${this.baseUrl}/api/articulotienda/NewArticuloTienda`, payload).toPromise();
    return {
      Articles: result || [],
      isOk: result,
      message: result ? 'Artículos agregados a la tienda.' : 'No se agregaron los articulos a la tienda.'
    };
    
  }
  /** Obtiene todas las tiendas */
  async getAllStores(): Promise<Store[]> {
    try {
      const result = await this.http.get<Store[]>(`${this.baseUrl}/api/tienda/GetAllTiendas`).toPromise();
      return result || [];
    } catch (error) {
      console.error('Error fetching stores:', error);
      return [];
    }
  }

  /**Obtengo los articulos dentro de la tienda */
  async getArticlesInStore(idStore: number): Promise<{
    Articles: any; isOk: boolean; message: string }> {
    if (!idStore) {
      return {
        Articles: [],
        isOk: false,
        message: ''
      };
    }

    const result = await this.http.get<any>(`${this.baseUrl}/api/articulotienda/GetAllArticlesInStore/${idStore}`).toPromise();
    return {
      Articles: result || [],
      isOk: true,
      message: 'Artículos obtenidos con éxito.'
    };
  }

  /**aqui obtengo todas tiendas y los articulos */
  async getArticlesStore(): Promise<{
    Articles: any; isOk: boolean; message: string }> {

    const result = await this.http.get<any>(`${this.baseUrl}/api/articulotienda/GetAllArticulosTiendas`).toPromise();
    return {
      Articles: result || [],
      isOk: true,
      message: 'Artículos obtenidos con éxito.'
    };
  }

  /**Agrego nueva tienda */
  async newStore(store: Store): Promise<{ isOk: boolean; message: string }> {
    try {
      if (!store.sucursal || !store.direccion) {
        return { isOk: false, message: "Complete todos los campos." };
      }

      const result = await this.http.post<any>(`${this.baseUrl}/api/tienda/NewTienda`, store).toPromise(); 

      return {
        isOk: true,
        message: "Tienda agregada con éxito."
      };
      
    } catch (ex) {
      console.error(ex);
      return {
        isOk: false,
        message: "No se pudo agregar la tienda"
      };
    }
  }

  /**aqui actualizo datos de la tienda */
  async updateStore(store: Store): Promise<{ isOk: boolean; message: string }> {
    try {

      const result = await this.http.post<any>(`${this.baseUrl}/api/tienda/UpdateTienda`, store).toPromise();

      return {
        isOk: true,
        message: "Tienda editada con éxito."
      };
      
    } catch (ex) {
      console.error(ex);
      return {
        isOk: false,
        message: "No se pudo agregar la tienda"
      };
    }
  }

  async deleteStore(idTienda: number = 0): Promise<{ isOk: boolean; message: string }>{
    try {
      
      const result = await await this.http
        .delete<any>(`${this.baseUrl}/api/tienda/DeleteTienda/${idTienda}`)
        .toPromise();
      return {
        isOk: result,
        message: result ? 'Tienda eliminada.' : 'No se elimino la tienda.'
      };
    } catch (ex) {
      console.log(ex);
      return {
        isOk: false,
        message: 'No se pudo eliminar la tienda'
      }
    }
  }
  //#endregion


  /** Registro de cliente en la base de datos */
  async registerClient(registerUser: RegisterUser): Promise<{ isOk: boolean; message: string }> {
    try {
      // Send request
      let isOK = false;
      if (!registerUser.email || !registerUser.contrasenia || !registerUser.nombre || !registerUser.apellidos) {
        return { message: "Complete todos los campos.", isOk: false };
      }
      console.log(registerUser.email, registerUser.contrasenia, registerUser.nombre, registerUser.apellidos);

      const result = await this.http.post<any>(`${this.baseUrl}/api/usuarios/RegisterUser`, registerUser).toPromise();

      if (result) {
        isOK = true;
      }

      return {
        message: isOK ? "Cliente registrado con éxito." : "No se pudo registrar el cliente.",
        isOk: isOK
      };
    }
    catch (ex) {
      console.log(ex);
      return {
        isOk: false, 
        message: "No se pudo registrar el cliente"
      };
    }
  }

  /**aqui se visualiza la imagen del articulo */
  async viewImage(idArticulo: number): Promise<string | null> {
    try {
      const result = await this.http.get<any>(`${this.baseUrl}/api/articulo/ViewImage/${idArticulo}`).toPromise();
      return result?.imagenBase64 || null;
    } catch (error) {
      console.error('imagen error', error);
      return null;
    }
  }

  /** Obtiene todos los artículos */
  async getArticles(): Promise<Articles[]> {
    try {
      const result = await this.http.get<Articles[]>(`${this.baseUrl}/api/articulo/getAllArticulos`).toPromise();
      return result || [];
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  /** Elimino el articulo */
  async deleteArticle(idArticulo: number): Promise<{ isOk: boolean; message: string }> {
    try {
      const result = await this.http
        .delete<any>(`${this.baseUrl}/api/articulo/DeleteArticulo/${idArticulo}`)
        .toPromise();
      return {
        isOk: result,
        message: "Artículo eliminado con éxito."
      };
    }
    catch (ex) {
      console.error(ex);
      return {
        isOk: false,
        message: "No se pudo eliminar el artículo"
      };
    }
  }

  /** Actualizo el articulo */
  async updateArticle(article: Articles): Promise<{ isOk: boolean; message: string }> {
    try {
      const hasFile = article.imagen && article.imagen.length > 0;
      
      let payload: any = {
        IdArticulo: article.idArticulo,
        Codigo: article.codigo,
        Descripcion: article.descripcion,
        Precio: article.precio,
        Stock: article.stock,
        Imagen: null,
        File: null
      };

      if (hasFile) {
        const file = article.imagen[0];
        payload.Imagen = file.name;
        payload.File = await this.readFileAsBase64(file);
      }

      const params = payload;

      const result = await this.http
        .post<any>(`${this.baseUrl}/api/articulo/UpdateArticulo`, params)
        .toPromise();
      
      return {
        isOk: result,
        message: "Artículo actualizado con éxito."
      };
    } catch (ex) {
      console.error(ex);
      return {
        isOk: false,
        message: "No se pudo actualizar el artículo"
      };
    }
  }

  /** Agrego un nuevo articulo */
  async newArticle(article: Articles): Promise<{ isOk: boolean; message: string }> {
  try {

    if (!article.imagen || article.imagen.length === 0 ||
        !article.precio || !article.stock) {
      return { isOk: false, message: "Complete todos los campos." };
    }

    const file = article.imagen[0];
    
    const base64 = await this.readFileAsBase64(file);

    const payload = {
      Codigo: article.codigo,
      Descripcion: article.descripcion,
      Precio: article.precio,
      Stock: article.stock,
      Imagen: file.name,
      File: base64
    };

    const result = await this.http
      .post<any>(`${this.baseUrl}/api/articulo/NewArticulo`, payload)
      .toPromise();

    return {
      isOk: true,
      message: "Artículo agregado con éxito."
    };

  } catch (ex) {
    console.error(ex);
    return {
      isOk: false,
      message: "No se pudo agregar el artículo"
    };
  }
}


  private readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };

    reader.onerror = error => reject(error);

    reader.readAsDataURL(file);
  });
}

  async createAccount(email: string, password: string) {
    try {
      // Send request
      let isOK = false;
      if (!email || !password) {
        return { message: "Complete todos los campos.", isOk: false };
      }
      console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        message: isOK ? "Cuenta agregada con éxito." : "",
        isOk: isOK
      };
    }
    catch {
      return {
        isOk: false,
        message: "No se pudo crear la cuenta"
      };
    }
  }

  async resetPassword(email: string, password: string) {
    try {

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "No se realizó la petición de cambio contraseña"
      };
    }
  }


  logOut() {

    
    sessionStorage.clear();
    window.location.reload();


  }
}

