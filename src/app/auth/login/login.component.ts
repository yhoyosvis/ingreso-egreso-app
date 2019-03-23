import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import {UsuariosService } from '../usuarios.service';
import { Router } from "@angular/router";
import { Usuario } from '../usuario.model';
import { log } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  constructor(private usuariosService: UsuariosService , private rutas: Router ) { }

  ngOnInit() {
  }

  iniciarSesion() {
    if (this.usuario.correo && this.usuario.contrasenia) {
      this.usuariosService.iniciarSesion(this.usuario).subscribe(resultado => {
        if (resultado.length != 0) {
          this.rutas.navigate(['/'])
        } else {
          alert('Ingrese su correo y contraseña correctos');
        }
      })

    }
  }

}
