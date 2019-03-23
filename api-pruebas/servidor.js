const servidorJson = require('json-server')
const servidor = servidorJson.create()
const rutas = servidorJson.router('baseDeDatos.json')
const middlewares = servidorJson.defaults()

servidor.use(middlewares)
servidor.use(servidorJson.bodyParser)

/* servidor.post('/inicio-de-sesion', (solicitud, respuesta, siguiente) => {
    console.log(solicitud.body);
    
    if(solicitud.body.correo && solicitud.body.contrasenia){
        if(solicitud.body.correo==="yeferson.hoyos@vis.com.co" && solicitud.body.contrasenia==="Yhoyos19"){
            return respuesta.jsonp({
                nombre:"Yeferson",
                edad:24
            });
        }

        respuesta.status(401);
        return respuesta.jsonp({
            mensaje:"Usuarios no encontrado"
        });
    }

    siguiente();
}) */

servidor.use(rutas)

servidor.listen(3000, () => {
  console.log('Servidor JSON corriendo en puerto 3000')
})