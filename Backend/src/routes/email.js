let arrRouterMethod = [
    {
        ruta: '/sendEmail/',
        metodo: 'sendEmail',
        tipo: 'post',
        version: String(process.env.APIVERSION).split(",")

    }
];

import { Router } from 'express';
const routerModule = Router();
import { getRouter } from '../helpers/helpers';
let nameController = 'emailController';
getRouter(routerModule, nameController, arrRouterMethod)
.catch((e)=>{
    console.error(e);
});
module.exports = routerModule;


