import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso.egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tipo = 'ingreso';
  cargandoSubscripcion : Subscription = new Subscription;
  cargando: boolean;

  constructor(public ingresoEgresoService: IngresoEgresoService,
              private store : Store <AppState>) { }

  ngOnInit() {
    this.cargandoSubscripcion = this.store.select('ui')
    .subscribe(ui => this.cargando = ui.isLoading);


    this.form = new FormGroup({
      'descripcion': new FormControl('',Validators.required),
      'monto': new FormControl ('', Validators.min(0))
    });
  }

  ngOnDestroy() { 
    this.cargandoSubscripcion.unsubscribe();
  }

  crearIngresoEgreso(){
    this.store.dispatch( new ActivarLoadingAction() );
    const ingresoEgreso = new IngresoEgreso({...this.form.value, tipo: this.tipo}); 
      this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.store.dispatch( new DesactivarLoadingAction() );
        Swal.fire("Creado", ingresoEgreso.descripcion, 'success');
        this.form.reset({monto:0});

      });

      
  }

}
