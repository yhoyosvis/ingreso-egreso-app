import { Action } from '@ngrx/store';
import { Usuario } from './usuario.model';


export const SET_USER = '[Auth] Set user';
export const UNSET_USER = '[Auth] Unset user';


export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor (public usuario: Usuario){

    }
}

export class unsetUserAction implements Action {
    readonly type = UNSET_USER;

}

export type acciones = SetUserAction | unsetUserAction;