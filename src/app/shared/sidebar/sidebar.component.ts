import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/auth/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(  private usuariosService: UsuariosService) {}


  cerrarSesion() {
     this.usuariosService.cerrarSesion(); 
  }

  ngOnInit() {

  }

}
