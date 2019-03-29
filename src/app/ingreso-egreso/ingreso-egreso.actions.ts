import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';



export const SET_ITEMS = '[Ingreso egreso] set Items';
export const UNSET_ITEMES = '[Ingreso egreso] Unset Items';


export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;


    constructor(public items: IngresoEgreso[]) {

    }
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMES;

}


export type acciones = SetItemsAction| UnsetItemsAction;