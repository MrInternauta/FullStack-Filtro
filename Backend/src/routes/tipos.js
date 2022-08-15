let arrRouterMethod = [
    {
        ruta: '/tipos/',
        metodo: 'GetAllTipos',
        tipo: 'get',
        version: String(process.env.APIVERSION).split(",")

    }
];

import { Router } from 'express';
const routerModule = Router();
import { getRouter } from '../helpers/helpers';
let nameController = 'tiposController';
getRouter(routerModule, nameController, arrRouterMethod)
.catch((e)=>{
    console.error(e);
});
module.exports = routerModule;


