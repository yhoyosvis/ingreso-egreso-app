import {Action } from '@ngrx/store';
export const ACTIVAR_LOADING = '[UI loafing] Cargando...';
export const DESACTVIAR_LOADING = '[UI loafing] Fin de carga...';


export class ActivarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action {
    readonly type = DESACTVIAR_LOADING;
}


export type  acciones = ActivarLoadingAction|
                        DesactivarLoadingAction