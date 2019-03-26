import { Component, OnInit } from '@angular/core';
import {UsuariosService } from '../usuarios.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public usuariosService: UsuariosService) { }

  ngOnInit() {
  }

  iniciarSesion(data: any) {
    console.log(data);
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
