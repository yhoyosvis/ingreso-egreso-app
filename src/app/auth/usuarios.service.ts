import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

import Swal from 'sweetalert2'
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  /*  apiUrl = 'http://localhost:3000'; */

  constructor(private rutas: Router, private afAuth: AngularFireAuth, private afDB: AngularFirestore) { }


  crearUsuario(correo: string, nombre: string, contrasenia: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(correo, contrasenia)
      .then(resp => {
        const usuario: Usuario = {
         uid: resp.user.uid,
         nombre: nombre,
         correo: resp.user.email
        };
        this.afDB.doc(`${ usuario.uid }/usuario`)
        .set(usuario)
        .then(() =>{
          
          this.rutas.navigate(['/']);
        });
      })
      .catch(error => {
        console.log(error);
        Swal.fire('Error al registrar, intentelo nuevamente', error.message, 'error');
      });

  }
    estadoUsuario() {
      this.afAuth.authState.subscribe(fbUsuario => {
        console.log(fbUsuario);
      });
    }

  iniciarSesion(correo: string, contrasenia: string) {
    this.afAuth.auth.signInWithEmailAndPassword(correo, contrasenia)
      .then(resp => {
        console.log(resp);
        this.rutas.navigate([''])
      })
      .catch(error => {
        Swal.fire('Error al iniciar sesión', error.message, 'error');
      });
  }

  cerrarSesion() {
    this.rutas.navigate(['/login']);
    this.afAuth.auth.signOut()
  }

  estaAutenticado(){
    return this.afAuth.authState
    .pipe(
      map(fbUsuario => {

          if(fbUsuario == null){
            this.rutas.navigate(['/login'])
          }
       return fbUsuario != null
      })
    )
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
