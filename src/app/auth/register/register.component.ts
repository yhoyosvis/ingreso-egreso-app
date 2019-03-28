import { Component, OnInit, OnDestroy } from '@angular/core';
import {UsuariosService } from '../usuarios.service';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  cargando: boolean;
  subscription: Subscription; 
  constructor(private usuariosService: UsuariosService, 
              private rutas: Router,
              private store: Store<AppState> ) { }


  ngOnInit() {
   this.subscription = this.store.select('ui')
    .subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  crearUsuario(data: any) {
    this.usuariosService.crearUsuario(data.correo, data.nombre, data.contrasenia);
    
  }









  /*   ngOnInit() {
    this.usuariosService.getUsuarios()
    .subscribe(hero => {
      console.log(hero[0]);
    });
  }

 crearUsuario(datosUsuario) {
    console.log("hola"+datosUsuario);
    this.usuariosService.crearUsuario(datosUsuario)
    .subscribe(usuario => {
      this.rutas.navigate(['/']);
    });
  }

  */
  
} 


