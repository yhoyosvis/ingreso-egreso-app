import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Usuario} from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

  httpOptions = {
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

  }
}
