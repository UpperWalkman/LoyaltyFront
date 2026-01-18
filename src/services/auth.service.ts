import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from './Models/usuario.model';
import { RegisterUser } from './Models/register.model';

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
  async logIn(dataUser: Usuario): Promise<{ isOk: boolean; data: any| null; message: string }>  {

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
    /*this._user = null;
    this.lastAuthenticatedPath = '/';
    this.router.navigate(['/login-form']);*/

  }
}

