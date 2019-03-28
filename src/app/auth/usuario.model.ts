
export class Usuario {

   
    public uid: string;
    public nombre: string;
    public correo: string;

    constructor( obj: DataObj){
        this.nombre = obj && obj.nombre || null;
        this.correo = obj && obj.correo || null;
        this.uid    = obj && obj.uid || null;
    }
}

interface DataObj {
     uid: string;
     nombre: string;
     correo: string;
}