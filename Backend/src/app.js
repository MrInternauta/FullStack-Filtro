
import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import 'babel-polyfill';
import { } from './model/Relations';

//Iniciar express
const app = express();
//Permitir cualquier ruta
app.use(cors({
    origin: '*'
}));

//usar publica
const PUBLIC_PATH = path.resolve(__dirname, './public');
app.use(express.static(PUBLIC_PATH));

//Midelwares
app.use(morgan('dev')); //Ver peticiones en desarrollo
app.use(json()); //Entender los JSON

module.exports = {
    app
};
