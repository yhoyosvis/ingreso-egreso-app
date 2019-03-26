import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './auth/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'IngresoEgresoApp';

  constructor(public usuariosService: UsuariosService) {}

  ngOnInit() {
    this.usuariosService.estadoUsuario();
  }
}
