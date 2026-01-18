import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { AuthService } from 'src/services';
import { RegisterUser } from 'src/services/Models/register.model';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {

  loading = false;
    formData: any = {};
    @ViewChild('FormData')
    Form!: DxFormComponent;
  constructor(
    private authService: AuthService,
        private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onRegister(e: Event) {  
    if (!this.Form.instance.validate()?.isValid ?? false) {
      return;
    }
    const { nombre, apellidos, direccion = '', email, contrasenia } = this.formData;

    this.loading = true;
    const registerUser: RegisterUser = { nombre, apellidos, direccion, email, contrasenia };

    const result = await this.authService.registerClient(registerUser);
    
    if (!result.isOk) {
      this.loading = false;
      notify({
        message: result.message,
        type: 'success',
        displayTime: 2000,
        position: {
          at: 'bottom center',
          my: 'bottom center',
        }
      });
      // Mostrar notificación de error
      return;
    }

    // Registro exitoso, redirigir o mostrar mensaje
    this.router.navigate(['/']);


  }

}
