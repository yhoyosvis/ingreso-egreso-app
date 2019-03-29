import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

import Swal from 'sweetalert2';
import { Usuario } from './usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, unsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarioSuscrpition: Subscription = new Subscription();
  private usuario: Usuario;

  /*  apiUrl = 'http://localhost:3000'; */

  constructor(private rutas: Router, private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }


  crearUsuario(correo: string, nombre: string, contrasenia: string) {

    this.store.dispatch(new ActivarLoadingAction()); // se activa loading cuando se va crear el usuario

    this.afAuth.auth.createUserWithEmailAndPassword(correo, contrasenia)
      .then(resp => {
        const usuario: Usuario = {
          uid: resp.user.uid,
          nombre: nombre,
          correo: resp.user.email
        };
        this.afDB.doc(`${usuario.uid}/usuario`)
          .set(usuario)
          .then(() => {

            this.rutas.navigate(['/']);
            this.store.dispatch(new DesactivarLoadingAction()); // Se desactiva el loading si se crea el usuario
          });
      })
      .catch(error => {
        console.log(error);

        this.store.dispatch(new DesactivarLoadingAction()); // Se desactiva el loading si ocurre algun error
        Swal.fire('Error al registrar, intentelo nuevamente', error.message, 'error');
      });

  }


  iniciarSesion(correo: string, contrasenia: string) {
    this.store.dispatch(new ActivarLoadingAction()); // Se activa  cuando se va iniciar sesion
    this.afAuth.auth.signInWithEmailAndPassword(correo, contrasenia)
      .then(resp => {
        console.log(resp);
        this.store.dispatch(new DesactivarLoadingAction()); // Se desactiva el loading si inicia sesion
        this.rutas.navigate([''])
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoadingAction()); // Se desactiva el loading si ocurre un error
        Swal.fire('Error al iniciar sesión', error.message, 'error');
      });
  }
    // metodo para estar en escucha del usuario que esta logueado actualmente
  estadoUsuario() {

    this.afAuth.authState.subscribe((fbUsuario:firebase.User) => {
      if (fbUsuario) {
        this.usuarioSuscrpition = this.afDB.doc(`${fbUsuario.uid}/usuario`).valueChanges()
          .subscribe((usuarioObj: any) => {

            const newUsuario = new Usuario(usuarioObj);
             this.store.dispatch(new SetUserAction(newUsuario)); 
             this.usuario = newUsuario;

            console.log(newUsuario);

          });

      } else {
          this.usuario = null;
          this.usuarioSuscrpition.unsubscribe(); // cancela la subscripcion cuando el usuario no esta autenticado
      }

    });
  }

  cerrarSesion() {
    this.rutas.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch( new unsetUserAction());
  }

  estaAutenticado() {
    return this.afAuth.authState
      .pipe(
        map(fbUsuario => {

          if (fbUsuario == null) {
            this.rutas.navigate(['/login'])
          }
          return fbUsuario != null
        })
      )
  }

  getUsuario() {
    return {...this.usuario}
  }

  /*   httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }  
  
    getUsuarios(): Observable<Usuario> {
      return this.http.get<Usuario>(this.apiUrl + '/usuarios')
    }
  
    iniciarSesion(usuario: Usuario): Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.apiUrl + '/usuarios?correo='+usuario.correo+"&contrasenia="+usuario.contrasenia);
    }
  
    crearUsuario(Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl + '/usuarios', JSON.stringify(Usuario), this.httpOptions)
    }
  
    cerrarSesion(){
  
    } */
}
