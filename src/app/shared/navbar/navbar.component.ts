import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit,  OnDestroy {
  nombre: string;
  subscripcion : Subscription = new Subscription();
  constructor( private store:Store<AppState>) { }

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
