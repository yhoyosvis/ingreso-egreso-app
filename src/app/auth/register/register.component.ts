import { Component, OnInit } from '@angular/core';
import {UsuariosService } from '../usuarios.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
 
  constructor(private usuariosService: UsuariosService , private rutas: Router ) { }


  ngOnInit() {

  }

  crearUsuario(data: any) {
    console.log(data);
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


