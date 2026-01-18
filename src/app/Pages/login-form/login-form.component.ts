import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { AuthService } from 'src/services';
import { Usuario } from 'src/services/Models/usuario.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

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

  async onSubmit(e: Event) {  

    if (!this.Form.instance.validate()?.isValid ?? false) {
      return;
    }
    const dataUser: Usuario = this.formData;
    this.loading = true;

    const result = await this.authService.logIn(dataUser);
    this.loading = false;
    if (!result.isOk) {
      
      notify({
        message: result.message,
        type: 'error',
        displayTime: 2000,
        position: {
          at: 'bottom center',
          my: 'bottom center',
        }
      });

      return;
    }

    this.router.navigate(['/home']);
  }

}
