import * as fromAuth from './auth.actions';
import { Usuario } from './usuario.model';


export interface AuthState {
    usuario: Usuario;    
}


const estadoIncial: AuthState = {
    usuario: null
}

export function authReducer ( state = estadoIncial, action: fromAuth.acciones): AuthState {
    switch(action.type){

        case fromAuth.SET_USER:
            return {
                usuario: {... action.usuario}
            };
        
        
        default:
            return state
    }
}