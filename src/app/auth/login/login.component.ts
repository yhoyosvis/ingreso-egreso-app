import { Component, OnInit, OnDestroy } from '@angular/core';
import {UsuariosService } from '../usuarios.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando: boolean;

  subscription: Subscription;

  constructor(public usuariosService: UsuariosService,
              private store: Store<AppState>) { }

  ngOnInit() {
   this.subscription = this.store.select('ui')
    .subscribe(ui => this.cargando = ui.isLoading); // suscribimos el loading dependiendo del cargando
  }

  ngOnDestroy() {
   this.subscription.unsubscribe(); // cancela la suscripcion del ngOnInit
  }

  iniciarSesion(data: any) {
    this.usuariosService.iniciarSesion(data.correo, data.contrasenia);
    
  }

  /*   iniciarSesion() {
      if (this.usuario.correo && this.usuario.contrasenia) {
        this.usuariosService.iniciarSesion(this.usuario).subscribe(resultado => {
          if (resultado.length != 0) {
            this.rutas.navigate(['/'])
          } else {
            alert('Ingrese su correo y contraseña correctos');
          }
        })

      }
    } */

}
