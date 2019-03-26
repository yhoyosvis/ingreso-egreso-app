
export class Usuario {

   
    public uid: string;
    public nombre: string;
    public correo: string;

    constructor( uid: string, nombre: string, correo: string){
        this.nombre = nombre;
        this.correo = correo;
        this.uid = uid;
    }
}