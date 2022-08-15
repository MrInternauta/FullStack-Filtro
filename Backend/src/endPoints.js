import { app } from './app';
import http_ from 'http';
import rutas from './routes/index';
//Creando el servidor de rutas
app.use('/api', rutas);
//Creando el servidor http
let http = http_.Server(app);
module.exports = {
    http
};

