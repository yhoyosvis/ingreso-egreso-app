export class IniciarSesionObject {
    public correo: string;
    public contrasenia: string;

    constructor(objetc: any){
        this.correo = (objetc.correo) ? objetc.correo: null;
        this.contrasenia = (objetc.contrasenia) ? objetc.contrasenia: null;
    }
}