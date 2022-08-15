let arrRouterMethod = [
    {
        ruta: '/anuncio/',
        metodo: 'GetAllAnuncio',
        tipo: 'post',
        version: String(process.env.APIVERSION).split(",")

    }
];

import { Router } from 'express';
const routerModule = Router();
import { getRouter } from '../helpers/helpers';
let nameController = 'anuncioController';
getRouter(routerModule, nameController, arrRouterMethod)
.catch((e)=>{
    console.error(e);
});
module.exports = routerModule;


