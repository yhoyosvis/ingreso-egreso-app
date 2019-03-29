import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscripcion : Subscription = new Subscription();

  constructor(private store: Store<fromIngresoEgreso.AppState>,
              public IngresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscripcion = this.store.select('ingresoEgreso')
    .subscribe( IngresoEgreso => {;
       this.items = IngresoEgreso.items;
    })
  }
  
  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.IngresoEgresoService.borrarIngresoEgreso(item.uid)
    .then( () => {
      Swal.fire('Se elimino correctamente', item.uid, 'success')
    })
  }


}
