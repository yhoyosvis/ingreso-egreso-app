import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, CanLoad } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(public usuariosService: UsuariosService) { }

  canActivate() {
    return this.usuariosService.estaAutenticado();
  }

  canLoad() {
    return this.usuariosService.estaAutenticado() 
      .pipe(
        take(1)
      );

  }
}
