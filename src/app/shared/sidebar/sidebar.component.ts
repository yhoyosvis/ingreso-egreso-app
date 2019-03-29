import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from 'src/app/auth/usuarios.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: string;
  subscripcion : Subscription = new Subscription();
  constructor(  private usuariosService: UsuariosService,
                public IngresoEgresoService: IngresoEgresoService,
                 private store:Store<AppState>) {}


  cerrarSesion() {
     this.usuariosService.cerrarSesion(); 
     this.IngresoEgresoService.cancelarSubscriptions();
  }

  ngOnInit() {

    this.subscripcion = this.store.select('auth')
    .pipe(
      filter(auth => auth.usuario != null)
    )
    .subscribe( auth => this.nombre = auth.usuario.nombre)

  }


  ngOnDestroy() {
    this.subscripcion.unsubscribe();

  }
}
