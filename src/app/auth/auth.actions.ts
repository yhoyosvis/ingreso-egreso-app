import { Action } from '@ngrx/store';
import { Usuario } from './usuario.model';


export const SET_USER = '[Auth] Set user';


export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor (public usuario: Usuario){

    }
}

export type acciones = SetUserAction;