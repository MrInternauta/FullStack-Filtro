import { Sequelize } from "sequelize";
import Request from "request";
import { SEQUELIZE_CONFIG } from "../config/database";

/**
 * 
 * @version 0.0.1
 * @function execute
 * @description Ejectuta una sentencia de SQL
 * @param {string} sql Consulta
 * @param {any} remplace objeto con parametros de busqueda si aplica
 * @returns {Promise<any>} Retorna la promesa de la consulta
 */

export async function execute(sql, remplace) {
    return SEQUELIZE_CONFIG.query(sql, {
        replacements: remplace,
        type: Sequelize.QueryTypes.SELECT,
    });
}


/**
 * 
 * @version 0.0.1
 * @function enviarEmail
 * @description Envia correo electronico
 * @param {opcionesEmail} opcionesEmail Información de la consulta
 */
export async function enviarEmail(opcionesEmail) {
    try {
        const urlToSend = `${process.env.SendEmailURL}`;
        Request.post(
            {
                headers: { "content-type": "application/x-www-form-urlencoded" },
                url: urlToSend,
                form: opcionesEmail,
            },
            (error, response) => {
                if (error) {
                    return console.error(error);
                }
                if (response) {
                    console.log("Respuesta ", response);
                }
            }
        );
    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @version 0.0.1
 * @function importControllers
 * @description Trae las funciones de sockets apartir de las versiones existentes del API
 * @return {Promise<[{version, controller}]> }
 * 
 */
export async function importControllers(controller) {
    let controllers = [];
    try {
        for (const version of String(process.env.APIVERSION).split(",")) {
            let controllerModule = await import(`../controllers/${version}/${controller}`);  // jshint ignore:line
            controllers.push({ version, controller: controllerModule });
        }
    } catch (error) {
        console.error(error);
    }
    return controllers;
}

export function getRouter(router, nameController, arrRouterMethod = []) {
    return importControllers(nameController)
        .then(async (controllers) => {
            try {
                for (const controller of controllers) {
                    let versionAPI = controller.version || '';
                    for (const key in controller.controller) {
                        if (Object.hasOwnProperty.call(controller.controller, key)) {
                            const controlador = controller.controller[key];
                            for (const RouterMethod of arrRouterMethod) {
                                if (key === RouterMethod.metodo) {
                                    if (RouterMethod.version) {
                                        let isVersion = RouterMethod.version.find(versionIter => versionIter === versionAPI);
                                        if (isVersion) {
                                            let ruta = `/${versionAPI}${RouterMethod.ruta}`;
                                            router[RouterMethod.tipo](ruta, RouterMethod.middlewares || [], controlador);
                                        }

                                    }
                                }
                            }

                        }
                    }

                }
                return router;
            } catch (error) {
                console.error(error);
            }
        });
}