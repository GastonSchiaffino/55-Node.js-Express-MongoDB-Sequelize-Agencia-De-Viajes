import express from 'express'; 
import router from './routes/index.js'; 
import db from './config/db.js';

const app = express();

//Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error=> console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Crear middleware propio. Obtener el año actual
app.use((req, res, next)=>{
    const year = new Date();
    res.locals.currentYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();//salta a la ejecucion del siguiente middleware. Se puedo forzar poniendole un return
});

//Definir la carpeta pública
app.use(express.static('public'));//Para tener acceso a los estilos y las imagenes

//Agregar Router
app.use('/', router);

app.listen( port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})