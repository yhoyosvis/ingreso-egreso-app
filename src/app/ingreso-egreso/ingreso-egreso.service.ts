import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { UsuariosService } from '../auth/usuarios.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription()

  constructor(private afDB: AngularFirestore,
    public usuarioService: UsuariosService,
    private store: Store<AppState>) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.usuario != null)
      )
      .subscribe(auth => this.ingresoEgreoItems(auth.usuario.uid));
  }

  private ingresoEgreoItems(uid: string) {
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      )
      .subscribe((coleccion: any[]) => {
        this.store.dispatch(new SetItemsAction(coleccion));
      })
  }


  cancelarSubscriptions() {
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();

    this.store.dispatch( new UnsetItemsAction() );
  }

  //Metdo para agregar un ingreso-egreso a firebase
  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const usuario = this.usuarioService.getUsuario();

    return this.afDB.doc(`${usuario.uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso });


  }

  borrarIngresoEgreso(uid: string) {
    const usuario = this.usuarioService.getUsuario();
    return this.afDB.doc(`${usuario.uid}/ingresos-egresos/items/${uid}`)
      .delete();
  }

}
